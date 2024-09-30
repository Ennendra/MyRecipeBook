import { React } from "react";

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
    const ingredientItems = ingredientList.map((ingredient, index) => <li key={`ingredientItem${index}`}>{ingredient.amount + ' ' + ingredient.measurement + ' --- ' + ingredient.item}</li>);
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
//Checks the recipe list for a recipe with a matching ID and returns that recipe as an object
//Throws an error if failed
function GetRecipeFromID(recipeList, recipeID) {
    var recipeResult;
    
    recipeList.forEach((recipe) => {
        if (recipe.recipeIDNumber === recipeID) {
            recipeResult = recipe;
        }
    });
    return recipeResult;
}



export function ViewRecipe({recipeList,recipeID}) {
    
    var recipeView = GetRecipeFromID(recipeList,recipeID);

    console.log(recipeView.imageSrc);

    const imageStyle = {
        width: "250px",
        height: "250px",
        objectFit: "contain"
    }
    return (
        <div className="ViewRecipe">
            
            <img
            style={imageStyle}
            src={recipeView.imageSrc === '' ? 'images/noImageIcon.png' : recipeView.imageSrc}
            alt={recipeView.recipeName}
            className="recipe-image"
            />
            <h2>{recipeView.recipeName}</h2>
            <p>{recipeView.recipeDescription}</p>
            <hr />
            <p>
                { '🕒 Preparation Time: ' + (ConvertMinutesToHoursAndMinutes(recipeView.prepDurationMinutes)) +
                ' --- Cooking Time: '  + (ConvertMinutesToHoursAndMinutes(recipeView.cookDurationMinutes)) }
                <br />
                {'🍴 Serves: ' + recipeView.recipeServings + ' portion(s)'}
            </p>
            <hr />
            <h3>Ingredients:</h3>
            <div>
                {ExpandIngredientsList(recipeView.ingredients)}
            </div>
            <hr />
            <h3>Steps:</h3>
            <div>
                {ExpandStepsList(recipeView.cookingSteps)}
            </div>
        </div>
    );
}