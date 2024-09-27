import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeCards.css';

// Function convert minutes into hours + minutes format.
function convertMinutesToHours(minutes) {
  let result = [];
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    result.push(
      <>
        <span className="bold" key="hours">
          {hours}
        </span>
        {' h '}
      </>
    );
  }

  // Add minutes, if it is not equal 0 or hours = 0
  if (remainingMinutes > 0 || hours === 0) {
    result.push(
      <>
        <span className="bold" key="minutes">
          {remainingMinutes}
        </span>
        {' min'}
      </>
    );
  }

  return result;
}

export const RecipeCards = ({ recipes }) => {
  const navigate = useNavigate();
  return (
    <div className="recipe-cards">
      {recipes.map((recipe, i) => (
        <div
          key={i}
          className="recipe-card"
          onClick={() => navigate(`/viewRecipe/${recipe.recipeIDNumber}`)}
        >
          <img
            src={recipe.imageSrc === '' ? 'images/noImageIcon.png' : recipe.imageSrc}
            alt={recipe.recipeName}
            className="recipe-image"
          />
          <div className="recipe-info">
            <h3 className="recipe-title"> {recipe.recipeName} </h3>
            <p className="recipe-description">
              <span className="time-and-potrions-title">{'🕒 Total time: '}</span>
              {convertMinutesToHours(recipe.prepDurationMinutes + recipe.cookDurationMinutes)}
              <br />
              <span className="time-and-potrions-title">
                {'🍴 Serves: ' + recipe.recipeServings}{' '}
              </span>
              {recipe.recipeServings > 1 ? ' portions' : ' portion'}
            </p>
            <button className="read-more-button"> Read more → </button>
          </div>
        </div>
      ))}
    </div>
  );
};
