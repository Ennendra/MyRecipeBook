import React, {  useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//import { chooseRandomRecipes, useRecipes } from '../../hooks/common';
import { RecipeCards } from '../pages-content/RecipeCards';
import { SearchBar } from '../pages-content/SearchBar';
import './Home.css';
import { useHttpClient } from '../../hooks/HttpHooks';

export const Home = () => {
  const navigate = useNavigate();
  const { searchPattern } = useParams();

  //Define the backend API connection 
  const {sendAPIRequest} = useHttpClient();
  //Define the recipeList as a state
  const[recipeList, setRecipeList] = useState();
  
  
  //Set a function state to fetch the recipes for display
  useEffect(() => {
    //Define the function to fetch the recipes
    const fetchRecipes = async () => {
      try {
        let responseData
        //If there is a search parameter then send the fetch request based on that search, otherwise, send a fetch for the random recipes
        if (searchPattern) {
          responseData = await sendAPIRequest(`http://localhost:5000/home/${searchPattern}`);
        }
        else {
          responseData = await sendAPIRequest(`http://localhost:5000/home`);
        }
        //Set this response to the recipeList state
        setRecipeList(responseData.recipes);
      }catch(error) {console.log("Homepage error: "+error);} 
    };
    //immediately run the above function
    fetchRecipes();

  //Dependencies are set so that this useEffect will run when sendAPIRequest is defined (ie, the component is loaded)
  //And when searchPattern changes (ie, a search is sent)
  }, [sendAPIRequest, searchPattern]); 

  return (
    <div>
      <h1 className="page-title"> MyRecipeBook</h1>
      <SearchBar
        onSearch={ searchString => navigate(`/home/${searchString}` ) }
        searchPattern={searchPattern}
      />

      <div className="add-button-bar">
        <button className="add-button" onClick={() => navigate('/addNewRecipe')}>
          + Add recipe
        </button>
      </div>
      {/* If users use the search function, check the results, show no results or the results for something */}
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
        //<RecipeCards recipes={!searchPattern ? chooseRandomRecipes(recipeList, 3) : recipeList} />
        <RecipeCards recipes={recipeList} />
      ) : (
        //Show a loading tag until data is fetched
        <p>Fetching recipe data...</p>
      )}
    </div>
  );
};
