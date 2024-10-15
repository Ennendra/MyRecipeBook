import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { chooseRandomRecipes, useRecipes } from '../../hooks/common';
import { RecipeCards } from '../pages-content/RecipeCards';
import { SearchBar } from '../pages-content/SearchBar';
import './Home.css';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export const Home = () => {
  const navigate = useNavigate();
  const { searchPattern } = useParams();
  const recipeList = useRecipes(searchPattern);
  console.log(recipeList);

  return (
    <div>
      <h1 className="page-title"> MyRecipeBook</h1>
      <SearchBar
        onSearch={searchString => navigate(`/home/${searchString}`)}
        searchPattern={searchPattern}
      />

      <div className="add-button-bar">
        <Button
          className="add-button"
          onClick={() => navigate('/addNewRecipe')}
          variant="contained"
          color="success"
          startIcon={<AddOutlinedIcon />}
        >
          Add recipe
        </Button>
      </div>
      {/* If users use the search function, check the results, show no results or the results for something */}
      <div>
        {!searchPattern === false &&
          (recipeList.length === 0 ? (
            <h2>
              We could not find any recipes matching your search. Please try using different
              ingredients or keywords.
            </h2>
          ) : (
            <h2>Results for {searchPattern}</h2>
          ))}

        {recipeList ? (
          //Display recipe cards after the recipes have been successfully fetched from the JSON files
          <RecipeCards recipes={!searchPattern ? chooseRandomRecipes(recipeList, 3) : recipeList} />
        ) : (
          //Show a loading tag until data is fetched
          <p>Fetching recipe data...</p>
        )}
      </div>
    </div>
  );
};
