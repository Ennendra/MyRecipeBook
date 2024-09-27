import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecipe } from '../../hooks/common';
import './Styles.css';

export const ViewRecipe = () => {
  const { id } = useParams();
  const recipe = useRecipe(id);
  return (
    <div>
      <h1 className="page-title"> View recipe page </h1>
      <p className="textStyle">{recipe ? recipe.recipeName : 'Recipe not found.'}</p>
      <p className="textStyle">{recipe ? recipe.recipeDescription : ''}</p>
    </div>
  );
};
