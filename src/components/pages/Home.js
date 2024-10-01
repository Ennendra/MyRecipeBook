import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { chooseRandomRecipes, useRecipes } from '../../hooks/common';
import { RecipeCards } from '../pages-content/RecipeCards';
import { SearchBar } from '../pages-content/SearchBar';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();
  const { searchPattern } = useParams();
  const recipeList = useRecipes(searchPattern);

  return (
    <div>
      <h1 className="page-title"> MyRecipeBook</h1>
      <SearchBar
        onSearch={searchString => navigate(`/home/${searchString}`)}
        searchPattern={searchPattern}
      />

      <div className="add-button-bar">
        <button className="add-button" onClick={() => navigate('/addNewRecipe')}>
          + Add recipe
        </button>
      </div>

      {recipeList ? (
        //Display recipe cards after the recipes have been successfully fetched from the JSON files
        <RecipeCards recipes={!searchPattern ? chooseRandomRecipes(recipeList, 3) : recipeList} />
      ) : (
        //Show a loading tag until data is fetched
        <p>Fetching recipe data...</p>
      )}
    </div>
  );
};
