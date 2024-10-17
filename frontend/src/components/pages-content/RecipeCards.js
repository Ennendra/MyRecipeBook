import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeCards.css';

const serverPath = 'http://localhost:5000/';

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
          onClick={() => navigate(`/viewRecipe/${recipe._id}`)}
        >
          <img
            src={(recipe.imageSrc === '') ? `${serverPath}uploads/images/noImageIcon.png` : `${serverPath}${recipe.imageSrc}`}
            onError={(e)=>{e.target.onError = null; e.target.src = `${serverPath}uploads/images/noImageIcon.png`}}
            alt={recipe.recipeName}
            className="recipe-image"
          />
          <div className="recipe-info">
            <div className="recipe-title"> {recipe.recipeName} </div>
            <p className="recipe-description">
              <span className="bold">{'🕒 Total time: '}</span>
              {convertMinutesToHours(recipe.prepDurationMinutes + recipe.cookDurationMinutes)}
              <br />
              <span className="bold">{'🍴 Serves: ' + recipe.recipeServings} </span>
              {recipe.recipeServings > 1 ? ' portions' : ' portion'}
            </p>
            <button className="read-more-button"> Read more → </button>
          </div>
        </div>
      ))}
    </div>
  );
};
