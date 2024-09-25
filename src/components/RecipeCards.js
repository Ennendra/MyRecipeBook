import React from "react";
import "./RecipeCards.css";

export const RecipeCards = ({ recipes }) => {
  return (
    <div className="recipe-cards">
      {recipes.map((recipe, i) => (
        <div key={i} className="recipe-card">
          <img
            src={
              recipe.imageSrc === ""
                ? "images/noImageIcon.png"
                : recipe.imageSrc
            }
            alt={recipe.recipeName}
            className="recipe-image"
          />
          <div className="recipe-info">
            <h2 className="recipe-title"> {recipe.recipeName} </h2>
            <p className="recipe-description">
              {recipe.prepDurationMinutes +
                recipe.cookDurationMinutes +
                " minutes, " +
                recipe.recipeServings +
                " portions."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
