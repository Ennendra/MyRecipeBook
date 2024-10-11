import React, { useEffect, useRef, useState } from 'react';
import { useBlocker, useNavigate } from 'react-router-dom';
import { ConfirmLeaveModal } from '../pages-content/ConfirmLeaveModal';
import { ImageUpload } from '../pages-content/ImageUpload';
import { IngredientsTable } from '../pages-content/IngredientsTable';
import { NumericInput } from '../pages-content/NumericInput';
import { StepsList } from '../pages-content/StepsList';
import './RecipeEditor.css';

const reader = new FileReader();

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
      ingredient => ingredient.amount || ingredient.measurement || ingredient.item
    );
  }
  if (!hasChanges) {
    hasChanges = recipe?.cookingSteps.some(step => step);
  }
  return hasChanges;
};

export const RecipeEditor = () => {
  const [ingredients, setIngredients] = useState([{ amount: '', measurement: '', item: '' }]);
  const [cookingSteps, setCookingSteps] = useState(['']);
  const [imageSrc, setImageSrc] = useState('/images/noImageIcon.png');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef(null);

  // Block navigation elsewhere when there are unsaved changes
  let blocker = useBlocker(({ currentLocation, nextLocation }) => {
    const currentRecipe = getRecipeData();
    const hasChanges = recipeHasChanges(currentRecipe);
    return hasChanges && currentLocation.pathname !== nextLocation.pathname;
  });

  useEffect(() => {
    setIsModalOpen(blocker.state === 'blocked');
  }, [blocker]);

  // Handler when the image is uploaded
  const handleImageUpload = e => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      reader.onloadend = function () {
        setImageSrc(reader.result); // Set base64 image to image src
      };
      reader.readAsDataURL(file); // Read file
    }
  };

  const getRecipeData = () => {
    const target = formRef.current;
    if (target === null) {
      return {};
    }
    const recipeName = target.recipeName.value;
    const recipeIDNumber = Date.now();
    const recipeDescription = target.recipeDescription.value;
    const prepDurationMinutes =
      Number(target.recipePrepTimeHours.value) * 60 + Number(target.recipePrepTimeMins.value);
    const cookDurationMinutes =
      Number(target.recipeCookTimeHours.value) * 60 + Number(target.recipeCookTimeMins.value);
    const recipeServings = target.recipeServes.value;

    const newRecipe = {
      recipeName,
      _id: recipeIDNumber,
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

  function addNewRecipe(event) {
    event.preventDefault();

    const newRecipe = getRecipeData();
    // Temporal solution to store new recipes since we can't edit JSON file.
    const storageLocalRecipes = localStorage.getItem('localRecipes');
    const localRecipes = storageLocalRecipes ? JSON.parse(storageLocalRecipes) : [];
    localStorage.setItem('localRecipes', JSON.stringify([...localRecipes, newRecipe]));

    navigate(`/viewRecipe/${newRecipe._id}`);
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
      <textarea
        type="text"
        name="recipeName"
        className="textarea-name"
        placeholder="Name of recipe"
        rows={'1'}
      />

      <label className="title-style">Description</label>
      <textarea
        type="text"
        name="recipeDescription"
        className="textarea-name"
        placeholder="Tell the story behind this recipe"
        rows={'4'}
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

      <hr className="hr-separator" />

      <label className="title-style">Ingredients(*)</label>
      <IngredientsTable ingredients={ingredients} onIngredientsUpdate={setIngredients} />

      <label className="title-style">Instructions(*)</label>
      <StepsList steps={cookingSteps} onStepsUpdate={setCookingSteps} />

      <hr className="hr-separator" />

      <div className="cancel-submit-button-container">
        {/* Cancel button that triggers the modal */}
        <button className="cancel-button" onClick={handleCancelClick} type="button">
          Cancel
        </button>
        <ConfirmLeaveModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onLeave={handleLeavePage}
        />

        <button className="submit-button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
