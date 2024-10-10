import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmLeaveModal } from '../pages-content/ConfirmLeaveModal';
import { ImageUpload } from '../pages-content/ImageUpload';
import { IngredientsTable } from '../pages-content/IngredientsTable';
import { StepsList } from '../pages-content/StepsList';

import { NumericInput } from '../pages-content/NumericInput';
import './RecipeEditor.css';

const reader = new FileReader();

export const RecipeEditor = () => {
  const [ingredients, setIngredients] = useState([{ amount: '', measurement: '', item: '' }]);
  const [cookingSteps, setCookingSteps] = useState(['']);
  const [imageSrc, setImageSrc] = useState('/images/noImageIcon.png');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  function addNewRecipe(event) {
    event.preventDefault();
    const { target } = event;
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

    // Temporal solution to store new recipes since we can't edit JSON file.
    const storageLocalRecipes = localStorage.getItem('localRecipes');
    const localRecipes = storageLocalRecipes ? JSON.parse(storageLocalRecipes) : [];
    localStorage.setItem('localRecipes', JSON.stringify([...localRecipes, newRecipe]));

    navigate(`/viewRecipe/${newRecipe.recipeIDNumber}`);
  }

  // Function to open the modal
  const handleCancelClick = event => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = event => {
    event.preventDefault();
    setIsModalOpen(false);
  };

  // Function to handle leaving the page
  const handleLeavePage = event => {
    event.preventDefault();
    setIsModalOpen(false);
    navigate(`/home`);
  };

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
        <button className="cancel-button" onClick={handleCancelClick} type="cancel">
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
