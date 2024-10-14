import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import React, {  useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ConvertIngredientData } from '../../hooks/IngredientConversionUtilities';
import './Styles.css';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import { useHttpClient } from '../../hooks/HttpHooks';

//Converts a given number of minutes into a string reading '#h ##min'
export function ConvertMinutesToHoursAndMinutes(minutes) {
  var result = ``;
  var hours = Math.floor(minutes / 60);
  if (hours > 0) {
    result += `${hours}h `;
  }
  var convertedMinutes = minutes % 60;
  if (convertedMinutes > 0) {
    result += `${convertedMinutes}min`;
  }
  return result;
}

// returns each item in the ingredients list as a list item to render
function ExpandIngredientsList(ingredientList) {
  //Creating a direct copy of the ingredient list array to safely convert values
  const revisedIngredientList = JSON.parse(JSON.stringify(ingredientList));

  //converting the ingredients to their preferred measurement type, and into fraction form
  revisedIngredientList.forEach(ingredient => {
    ConvertIngredientData(ingredient);
  });

  const ingredientItems = revisedIngredientList.map((ingredient, index) => (
    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" sx={{ width: 100 }}>
        {ingredient.amount +
          ' ' +
          (ingredient.measurement === 'item' ? '' : ingredient.measurement)}
      </TableCell>
      <TableCell>{ingredient.item}</TableCell>
    </TableRow>
  ));

  return ingredientItems;
}
//Return each step in the cookingSteps as a list item to render

function ExpandStepsList(stepList) {
  const stepItems = stepList.map((step, index) => (
    <ListItem disablePadding key={index}>
      <ListItemIcon>
        <Checkbox />
      </ListItemIcon>
      <ListItemText primary={step} />
    </ListItem>
  ));

  return <Stack>{stepItems}</Stack>;
}

function DisplayRecipe(recipe) {
  const preparationTime = ConvertMinutesToHoursAndMinutes(recipe.prepDurationMinutes);
  const cookingTime = ConvertMinutesToHoursAndMinutes(recipe.cookDurationMinutes);
  const totalTime = ConvertMinutesToHoursAndMinutes(
    recipe.prepDurationMinutes + recipe.cookDurationMinutes
  );
  return (
    <div className="ViewRecipe">
      <div className="viewRecipeInfo">
        <img
          src={recipe.imageSrc === '' ? 'images/noImageIcon.png' : recipe.imageSrc}
          alt={recipe.recipeName}
          className="recipeImg"
        />
        <div className="recipeNameCard">
          <h2>{recipe.recipeName}</h2>
          <p>{recipe.recipeDescription}</p>
        </div>
      </div>
      <hr />

      <Stack spacing={1} sx={{ alignItems: 'left' }}>
        <Stack direction="row" spacing={2}>
          <Chip
            icon={<RestaurantOutlinedIcon />}
            label={'Serves: ' + recipe.recipeServings + ' portion(s)'}
            // variant="outlined"
            color="success"
          ></Chip>
          <Chip
            icon={<QueryBuilderOutlinedIcon />}
            label={'Preparation Time: ' + preparationTime}
            // variant="outlined"
            color="success"
          ></Chip>
          <Chip
            icon={<QueryBuilderOutlinedIcon />}
            label={'Cooking Time: ' + cookingTime}
            // variant="outlined"
            color="success"
          ></Chip>
          <Chip
            icon={<QueryBuilderOutlinedIcon />}
            label={'Total time:' + totalTime}
            // variant="outlined"
            color="success"
          ></Chip>
        </Stack>
      </Stack>

      <div>
        <h3>Ingredients:</h3>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, backgroundColor: '#eeeeee' }} aria-label="simple table">
            {/* <TableHead>
              <TableRow>
                <TableCell sx={{ width: 150 }}>
                  <h3>Amount</h3>
                </TableCell>
                <TableCell>
                  <h3>Name</h3>
                </TableCell>
              </TableRow>
            </TableHead> */}
            <TableBody>{ExpandIngredientsList(recipe.ingredients)}</TableBody>
          </Table>
        </TableContainer>
      </div>
      <hr />

      <div>
        <h3>Steps:</h3>
        <List sx={{ width: '100%', maxWidth: 960, bgcolor: '#eeeeee' }} aria-label="contacts">
          {ExpandStepsList(recipe.cookingSteps)}
        </List>
      </div>
    </div>
  );
}
function NoRecipeDisplay() {
  return <p className="textStyle">Recipe not found.</p>;
}

export const ViewRecipe = () => {
  //Define the object ID of the recipe in the params and the recipe object itself
  const { id } = useParams();
  const[recipe, setRecipe] = useState();

  //Define the backend API connection 
  const {sendAPIRequest} = useHttpClient();
  //Set a function state to fetch the recipes for display
    useEffect(() => {
    //Define the function to fetch the recipes
    const fetchRecipes = async () => {
      try {
        let responseData
        //Find the specified recipe
        responseData = await sendAPIRequest(`http://localhost:5000/viewRecipe/${id}`);
        //Set this response to the recipeList state
        setRecipe(responseData.recipes);
      }catch(error) {console.log("Homepage error: "+error);} 
    };
    //immediately run the above function
    fetchRecipes();

  //Dependencies are set so that this useEffect will run when sendAPIRequest is defined (ie, the component is loaded)
  }, [sendAPIRequest]); 

  

  return (
    <div>
      {/* <h1 className="page-title"> View recipe page </h1> */}
      {recipe ? DisplayRecipe(recipe) : NoRecipeDisplay()}
    </div>
  );
};
