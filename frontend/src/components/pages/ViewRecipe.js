import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecipe } from '../../hooks/common';
import './Styles.css';
import { ConvertIngredientData} from '../../hooks/IngredientConversionUtilities';

//Converts a given number of minutes into a string reading '#h ##min'
export function ConvertMinutesToHoursAndMinutes(minutes) {
  var result = ``;
  var hours = Math.floor(minutes/60);
  if (hours>0) { result += `${hours}h `; }
  var convertedMinutes = minutes%60;
  if (convertedMinutes > 0) { result += `${convertedMinutes}min`; }
  return result;
}
// returns each item in the ingredients list as a list item to render
function ExpandIngredientsList(ingredientList) {
  
  //Creating a direct copy of the ingredient list array to safely convert values
  const revisedIngredientList = JSON.parse(JSON.stringify(ingredientList));

  //converting the ingredients to their preferred measurement type, and into fraction form
  revisedIngredientList.forEach(ingredient => {
    ingredient = ConvertIngredientData(ingredient);
    console.log("After conversion: " + ingredient.amount);
  });

  const ingredientItems = revisedIngredientList.map((ingredient, index) => 
    <li key={`ingredientItem${index}`}>
      {ingredient.amount + ' ' + ingredient.measurement + ' --- ' + ingredient.item}
    </li>);

  return (
      <ul>
          {ingredientItems}
      </ul>
  );
}
//Return each step in the cookingSteps as a list item to render
function ExpandStepsList(stepList) {
  const stepItems = stepList.map((step, index) => <li key={`stepItem${index}`}>{step}</li>)
  return (
      <ul>
          {stepItems}
      </ul>
  );
}

function DisplayRecipe(recipe) {
  return (
    <div className="ViewRecipe">
            
      <img
      //style={imageStyle}
      src={recipe.imageSrc === '' ? 'images/noImageIcon.png' : recipe.imageSrc}
      alt={recipe.recipeName}
      className="recipe-image"
      />
      <h2>{recipe.recipeName}</h2>
      <p>{recipe.recipeDescription}</p>
      <hr />
      <p>
          { '🕒 Preparation Time: ' + (ConvertMinutesToHoursAndMinutes(recipe.prepDurationMinutes)) +
          ' --- Cooking Time: '  + (ConvertMinutesToHoursAndMinutes(recipe.cookDurationMinutes)) }
          <br />
          {'🍴 Serves: ' + recipe.recipeServings + ' portion(s)'}
      </p>
      <hr />
      <h3>Ingredients:</h3>
      <div>
          {ExpandIngredientsList(recipe.ingredients)}
      </div>
      <hr />
      <h3>Steps:</h3>
      <div>
          {ExpandStepsList(recipe.cookingSteps)}
      </div>
    </div>
  );
}
function NoRecipeDisplay() {
  return (
    <p className="textStyle">Recipe not found.</p>
  );
}

export const ViewRecipe = () => {
  const { id } = useParams();
  const recipe = useRecipe(id);
  return (
    /*<div>
      <h1 className="page-title"> View recipe page </h1>
      <p className="textStyle">{recipe ? recipe.recipeName : 'Recipe not found.'}</p>
      <p className="textStyle">{recipe ? recipe.recipeDescription : ''}</p>
    </div>*/
    <div>
      <h1 className="page-title"> View recipe page </h1>
      {recipe ? (DisplayRecipe(recipe)) : (NoRecipeDisplay())}
    </div>
  );
};
