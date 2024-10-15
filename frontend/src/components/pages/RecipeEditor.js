import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageUpload } from '../pages-content/ImageUpload';
import { IngredientsTable } from '../pages-content/IngredientsTable';
import { StepsList } from '../pages-content/StepsList';
import { useHttpClient } from '../../hooks/HttpHooks';
import './RecipeEditor.css';

const reader = new FileReader();

export const RecipeEditor = () => {
  const [ingredients, setIngredients] = useState([{ amount: '', measurement: '', item: '' }]);
  const [cookingSteps, setCookingSteps] = useState(['']);
  const [imageSrc, setImageSrc] = useState('/images/noImageIcon.png');
  const navigate = useNavigate();

  //Define the backend API connection 
  const {sendAPIRequest} = useHttpClient();

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

  async function addNewRecipe(event) {
    event.preventDefault();
    const { target } = event;
    //Get the form information
    const recipeName = target.recipeName.value;
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

    //Attempt to add the new form to the database
    let responseData
    try {
      
      responseData = await sendAPIRequest(
        `addNewRecipe`, 
        'POST', 
        JSON.stringify(newRecipe), 
        {'Content-Type': 'application/json'}
      );
      console.log(responseData);
    } catch(error) {
      console.log("Add New Recipe Error: "+error);
    }
    //After the post request is sent, we shall attempt to navigate to the new page
    try{
      const newRecipeID = responseData._id
      navigate(`/viewRecipe/${newRecipeID}`);
      alert('Successfully added new recipe');
    }catch(error) {
      console.log("Add New Recipe Error (post-API): "+error);
      navigate(`/home`);
    }
  }

  return (
    <form onSubmit={addNewRecipe}>
      <h1 className="page-title">Add recipe</h1>
      <ImageUpload name="recipeImage" image={imageSrc} onImageUpload={handleImageUpload} />

      <label className="recipe-name-title">Name of recipe (*)</label>
      <textarea
        type="text"
        name="recipeName"
        className="textarea-name"
        placeholder="Name of recipe"
        rows={'1'}
        required
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
        <input name="recipeServes" className="number-input" type="number" min={0} max={99} />
        <span className="title-big-margin">{'persons'} </span>

        <span className="title-bold">{' 🕒 Prep. time: '} </span>
        <input name="recipePrepTimeHours" className="number-input" type="number" min={0} max={99} />
        <span className="title">{'h'} </span>
        <input name="recipePrepTimeMins" className="number-input" type="number" min={0} max={99} />
        <span className="title-big-margin">{'min'} </span>

        <span className="title-bold">{' Cook time: '} </span>
        <input name="recipeCookTimeHours" className="number-input" type="number" min={0} max={99} />
        <span className="title">{'h'} </span>
        <input name="recipeCookTimeMins" className="number-input" type="number" min={0} max={99} />
        <span className="title-big-margin">{'min'} </span>
      </div>

      <hr className="hr-separator" />

      <label className="title-style">Ingredients(*)</label>
      <IngredientsTable ingredients={ingredients} onIngredientsUpdate={setIngredients} />

      <label className="title-style">Instructions(*)</label>
      <StepsList steps={cookingSteps} onStepsUpdate={setCookingSteps} />

      <hr className="hr-separator" />

      <div className="cancel-submit-button-container">
        <button className="cancel-button" type="cancel">
          Cancel
        </button>

        <button className="submit-button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
