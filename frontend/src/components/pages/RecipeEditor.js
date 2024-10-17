import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { default as React, useEffect, useRef, useState } from 'react';
import { useBlocker, useNavigate } from 'react-router-dom';
import { useHttpClient } from '../../hooks/HttpHooks';
import { ConfirmLeaveModal } from '../pages-content/ConfirmLeaveModal';
import { ImageUpload } from '../pages-content/ImageUpload';
import { IngredientsTable } from '../pages-content/IngredientsTable';
import { NumericInput } from '../pages-content/NumericInput';
import { StepsList } from '../pages-content/StepsList';
import './RecipeEditor.css';

const reader = new FileReader();

const RECIPE_NAME_ERROR = 'Recipe name is required.';
const VALIDATION_FORM_ERROR = '* Your recipe has some mistakes. Please, fix them.';
const SPECIAL_RECIPE_KEYS = ['_id', 'imageSrc', 'ingredients', 'cookingSteps'];

// Checks current recipe for changes done by the user
const recipeHasChanges = recipe => {
  const keys = Object.keys(recipe);
  let hasChanges = keys.some(key => !SPECIAL_RECIPE_KEYS.includes(key) && recipe[key]);
  if (!hasChanges) {
    hasChanges = recipe?.imageSrc !== '/images/noImageIcon.png';
  }
  if (!hasChanges) {
    hasChanges = recipe?.ingredients.some(
      ingredient => ingredient.amount || ingredient.measurement !== 'items' || ingredient.item
    );
  }
  if (!hasChanges) {
    hasChanges = recipe?.cookingSteps.some(step => step);
  }
  return hasChanges;
};

export const RecipeEditor = () => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([{ amount: '', measurement: 'items', item: '' }]);
  const [cookingSteps, setCookingSteps] = useState(['']);
  const [imageSrc, setImageSrc] = useState('/images/noImageIcon.png');
  const [imageFile, setImageFile] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSubmitRef = useRef(false);
  const wasSubmitCalledRef = useRef(false);
  const [invalidIngredients, setInvalidIngredients] = useState([]); // Store invalid ingredient rows
  const [invalidSteps, setInvalidSteps] = useState([]); // Store invalid steps
  const formRef = useRef(null);

  // Block navigation elsewhere when there are unsaved changes
  let blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (isSubmitRef.current) {
      return false;
    }
    const currentRecipe = getRecipeData();
    const hasChanges = recipeHasChanges(currentRecipe);
    return hasChanges && currentLocation.pathname !== nextLocation.pathname;
  });

  useEffect(() => {
    setIsModalOpen(blocker.state === 'blocked');
  }, [blocker]);

  useEffect(() => {
    validateRecipe();
  }, [recipeName, ingredients, cookingSteps]);

  //Define the backend API connection
  const { sendAPIRequest } = useHttpClient();

  // Handler when the image is uploaded
  const handleImageUpload = e => {
    const file = e.target.files[0]; // Get the selected file

    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 1) {
        alert('This file is too big. Maximum File size 1 Mb.');
      } else {
        reader.onloadend = function () {
          setImageSrc(reader.result); // Set base64 image to image src
          setImageFile(file);
        };
        reader.readAsDataURL(file); // Read file
      }
    }
  };

  const getRecipeData = () => {
    const target = formRef.current;
    if (target === null) {
      return {};
    }
    const recipeDescription = target.recipeDescription.value;
    const prepDurationMinutes =
      Number(target.recipePrepTimeHours.value) * 60 + Number(target.recipePrepTimeMins.value);
    const cookDurationMinutes =
      Number(target.recipeCookTimeHours.value) * 60 + Number(target.recipeCookTimeMins.value);
    const recipeServings = target.recipeServes.value;

    //Assemble the form into a JSON object
    const newRecipe = {
      recipeName,
      recipeDescription,
      prepDurationMinutes,
      cookDurationMinutes,
      recipeServings,
      ingredients,
      imageSrc,
      cookingSteps,
    };
    return newRecipe;
  };

  // Function to validate required fields
  const validateRecipe = () => {
    if (!wasSubmitCalledRef.current) {
      return;
    }
    const recipe = getRecipeData();
    // Validate ingredients
    const invalidIngredientIndices = recipe.ingredients
      .map((ingredient, index) => {
        if (!ingredient.amount || !ingredient.measurement || !ingredient.item) {
          return index; // Mark the index of invalid ingredients
        }
        return null;
      })
      .filter(index => index !== null); // Filter out valid ingredients

    setInvalidIngredients(invalidIngredientIndices); // Store invalid ingredient indices

    // Validate cooking steps
    const invalidStepIndices = recipe.cookingSteps
      .map((step, index) => {
        if (!step) {
          return index; // Mark empty or invalid steps
        }
        return null;
      })
      .filter(index => index !== null);

    setInvalidSteps(invalidStepIndices); // Store invalid step indices

    if (
      !recipe.recipeName ||
      invalidIngredientIndices.length > 0 ||
      invalidStepIndices.length > 0
    ) {
      setErrorMessage(VALIDATION_FORM_ERROR);
      return false;
    }

    setErrorMessage(''); // Clear the error message if everything is valid
    setInvalidIngredients([]); // Clear the invalid ingredient state
    setInvalidSteps([]); // Clear the invalid steps state
    return true;
  };

  async function addNewRecipe(event) {
    event.preventDefault();
    wasSubmitCalledRef.current = true;

    // Validate required fields before submitting
    if (!validateRecipe()) {
      return; // Prevent form submission if validation fails
    }

    const newRecipe = getRecipeData();

    isSubmitRef.current = true;

    //assemble the data for the http request as separate form data (this allows the image upload to be a part of this request)
    const recipeFormData = new FormData();
    recipeFormData.append('recipeName',newRecipe.recipeName);
    recipeFormData.append('recipeDescription',newRecipe.recipeDescription);
    recipeFormData.append('prepDurationMinutes',newRecipe.prepDurationMinutes);
    recipeFormData.append('cookDurationMinutes',newRecipe.cookDurationMinutes);
    recipeFormData.append('recipeServings',newRecipe.recipeServings);
    //Split the ingredients into 3 separate arrays within the form data (which are then reassembled as a JSON object within the backend controller)
    newRecipe.ingredients.map((ingredient) => {
      recipeFormData.append(`ingredientsAmount[]`, ingredient.amount);
      recipeFormData.append(`ingredientsMeasurement[]`, ingredient.measurement);
      recipeFormData.append(`ingredientsItem[]`, ingredient.item);
    });
    recipeFormData.append('imageSrc',newRecipe.imageSrc);
    newRecipe.cookingSteps.map((step) => {
      recipeFormData.append('cookingSteps[]',step);
    });
    //Add the image file itself to the form data if available
    if (imageFile) {
      recipeFormData.append('imageFile',imageFile);
    }

    console.log(recipeFormData);

    //Attempt to add the new form to the database
    let responseData;
    try {
      responseData = await sendAPIRequest(`addNewRecipe`, 'POST', recipeFormData);
      console.log(responseData);
    } catch (error) {
      console.log('Add New Recipe Error: ' + error);
    }
    //After the post request is sent, we shall attempt to navigate to the new page
    try {
      const newRecipeID = responseData._id;
      navigate(`/viewRecipe/${newRecipeID}`);
      alert('Successfully added new recipe');
    } catch (error) {
      console.log('Add New Recipe Error (post-API): ' + error);
      alert('Something went wrong, please try again later.');
      //navigate(`/home`);
    }
  }

  // Function to open the modal
  const handleCancelClick = event => {
    event.preventDefault();
    navigate(`/home`); // Navigate without showing modal if no changes
  };

  // Function to close the modal
  const handleCloseModal = event => {
    event.preventDefault();
    setIsModalOpen(false);
    blocker.reset(); // Reset the blocker to allow navigation again
  };

  // Function to handle leaving the page
  const handleLeavePage = event => {
    event.preventDefault();
    blocker.proceed(); // Proceed with the navigation
  };

  return (
    <form onSubmit={addNewRecipe} ref={formRef}>
      <h1 className="page-title">Add recipe</h1>
      <ImageUpload name="recipeImage" image={imageSrc} onImageUpload={handleImageUpload} />

      <label className="recipe-name-title">Name of recipe (*)</label>
      <TextField
        hiddenLabel
        type="text"
        name="recipeName"
        className="textarea-name"
        placeholder="Name of recipe"
        variant="filled"
        value={recipeName}
        onChange={e => {
          const input = e.target;
          setRecipeName(input.value);
        }}
        {...(errorMessage === VALIDATION_FORM_ERROR && wasSubmitCalledRef.current && !recipeName
          ? {
              error: true,
              helperText: RECIPE_NAME_ERROR,
            }
          : null)}
      />

      <label className="title-style">Description</label>
      <TextField
        hiddenLabel
        type="text"
        name="recipeDescription"
        className="textarea-name"
        placeholder="Tell the story behind this recipe"
        multiline
        rows={'4'}
        variant="filled"
      />

      <div className="one-line-class">
        <span className="title-bold">{'🍴 Serves: '} </span>
        <NumericInput name="recipeServes" />
        <span className="title-big-margin">{'persons'} </span>

        <span className="title-bold">{' 🕒 Prep. time: '} </span>
        <NumericInput name="recipePrepTimeHours" />
        <span className="title">{'h'} </span>
        <NumericInput name="recipePrepTimeMins" />
        <span className="title-big-margin">{'min'} </span>

        <span className="title-bold">{' Cook time: '} </span>
        <NumericInput name="recipeCookTimeHours" />
        <span className="title">{'h'} </span>
        <NumericInput name="recipeCookTimeMins" />
        <span className="title-big-margin">{'min'} </span>
      </div>

      <hr />

      <label className="title-style">Ingredients(*)</label>
      <IngredientsTable
        ingredients={ingredients}
        onIngredientsUpdate={setIngredients}
        invalidIngredients={invalidIngredients}
      />

      <label className="title-style">Instructions(*)</label>
      <StepsList steps={cookingSteps} onStepsUpdate={setCookingSteps} invalidSteps={invalidSteps} />

      <hr />

      {/* Display error message if validation fails */}
      {errorMessage && <div className="error-message">{VALIDATION_FORM_ERROR}</div>}

      <div className="one-line-class">
        <Stack direction="row" spacing={5}>
          {/* Cancel button that triggers the modal */}
          <Button
            className="cancel-button"
            onClick={handleCancelClick}
            type="button"
            variant="contained"
            color="inherit"
          >
            Cancel
          </Button>
          <ConfirmLeaveModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onLeave={handleLeavePage}
          />
          <Button className="submit-button" type="submit" variant="contained" color="success">
            Submit
          </Button>
        </Stack>
      </div>
    </form>
  );
};
