import React from "react";
import "./RecipeCards.css";

export const RecipeCards = ({ recipes }) => {
  return (
    <div className="recipe-cards">
      {recipes.map((recipe, i) => (
        <div key={i} className="recipe-card">
          <img
            src={recipe.resipeImage}
            alt={recipe.recipeName}
            className="recipe-image"
          />
          <div className="recipe-info">
            <h2 className="recipe-title"> {recipe.recipeName} </h2>
            <p className="recipe-description">
              {recipe.cookDurationMinutes +
                ", " +
                recipe.portions +
                " portions."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
