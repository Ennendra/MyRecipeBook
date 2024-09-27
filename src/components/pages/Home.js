import React from 'react';
import { useNavigate } from 'react-router-dom';
import { chooseRandomRecipes, useRecipes } from '../../hooks/common';
import { RecipeCards } from '../pages-content/RecipeCards';
import { SearchBar } from '../pages-content/SearchBar';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();
  const recipeList = useRecipes();

  return (
    <div>
      <h1 className="page-title"> MyRecipeBook</h1>
      <SearchBar />

      <div className="add-button-bar">
        <button className="add-button" onClick={() => navigate('/addNewRecipe')}>
          + Add recipe
        </button>
      </div>

      {recipeList ? (
        //Display recipe cards after the recipes have been successfully fetched from the JSON files
        <RecipeCards recipes={chooseRandomRecipes(recipeList, 3)} />
      ) : (
        //Show a loading tag until data is fetched
        <p>Fetching recipe data...</p>
      )}
    </div>
  );
};
