import React, {  useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//import { chooseRandomRecipes, useRecipes } from '../../hooks/common';
import { RecipeCards } from '../pages-content/RecipeCards';
import { SearchBar } from '../pages-content/SearchBar';
import './Home.css';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useHttpClient } from '../../hooks/HttpHooks';
import { AuthContext } from '../common/context/auth-context';

export const Home = () => {
  const navigate = useNavigate();
  const { searchPattern } = useParams();
  const auth = useContext(AuthContext);

  //Define the backend API connection 
  const {sendAPIRequest} = useHttpClient();
  //Define the recipeList as a state (set initially as an empty array)
  const[recipeList, setRecipeList] = useState([]);
  
  
  //Set a function state to fetch the recipes for display
  useEffect(() => {
    //Define the function to fetch the recipes
    const fetchRecipes = async () => {
      try {
        let responseData
        //If there is a search parameter then send the fetch request based on that search, otherwise, send a fetch for the random recipes
        if (searchPattern) {
          responseData = await sendAPIRequest(`search/${searchPattern}`);
        }
        else {
          responseData = await sendAPIRequest(`home`);
        }
        //Set this response to the recipeList state, unless there are no recipes (ie. 'no search results')
        if (responseData.recipes.length>0) { setRecipeList(responseData.recipes); }
        
      }catch(error) {
        //Something's gone wrong (likely a search that gave no results)
        //Set the recipe list as an empty array
        setRecipeList([]);
      } 
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
        onSearch={ searchString => navigate(`/search/${searchString}` ) }
        searchPattern={searchPattern}
      />

      
        <div className="add-button-bar">
          {auth.isLoggedIn && (
            <Button
              className="add-button"
              onClick={() => navigate('/addNewRecipe')}
              variant="contained"
              color="success"
              startIcon={<AddOutlinedIcon />}
            >
              Add recipe
            </Button>
          )}
        </div>
        
      {/* If users use the search function, check the results, show no results or the results for something */}
      <div className='resultInfo'>
        {!searchPattern === false &&
          (recipeList.length === 0 ? (
            <p>
              We could not find any recipes matching your search. Please try using different
              ingredients or keywords.   
            </p>
          ) : (
            <p>Results for {searchPattern}</p>
          ))}
      </div>
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
