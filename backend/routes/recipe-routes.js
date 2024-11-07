const express = require('express');
const {check} = require('express-validator');
const checkAuth = require('../middleware/auth-check')

const recipeController = require('../controllers/recipe-controller');

const fileUpload = require('../middleware/file-upload');

const router = express.Router();

/*
    Routes to remember: These are routes that the frontend will navigate to when interacting with the app (ie. everything after the domain e.g. 'localhost:3000/<route>')
        /home - view all recipes. Frontend can then sort them and show 3
        /home/:searchParam - Searchbar, find all recipes whose name contains what is searched
        /viewRecipe/:recipeID - search the recipe whose ID matches
        /addNewRecipe - POST the new recipe after the form is validated
        /editRecipe/:recipeID - find the recipe that matches the ID and PATCH it (or UPDATE), using the formatted form
        /deleteRecipe/:recipeID - find the recipe that matches the ID and DELETE it
*/

//The validation for a recipe form (add or edit recipe)
const recipeFormValidation = [
    //Check that the recipe name is not empty
    check('recipeName').notEmpty(),

    //IngredientAmount: Check that it is an array with at least one element and that all elements are numbers
    check('ingredientsAmount')
        .isArray({min: 1}).withMessage(`There are no ingredientAmount elements`)
        .bail() //If the above check fails, don't bother running the following checks. Will help with error handling
        .custom((value) => {
            for (let i=0; i<value.length;i++) {
                if (isNaN(value[i])) {
                    throw new Error(`Ingredient amount at index ${i} is not a valid number`)
                }
            }
            return true;
        }),
    //IngredientItem: Similar to above, except making sure the string is not empty
    check('ingredientsItem')
        .isArray({min: 1}).withMessage(`There are no ingredientName elements`)
        .bail() //If the above check fails, don't bother running the following checks. Will help with error handling
        .custom((value) => {
            for (let i=0; i<value.length;i++) {
                if (value[i].trim() === '') {
                    throw new Error(`Ingredient item at index ${i} has no name`)
                }
            }
            return true;
        }),
    //CookingSteps: Exactly like above
    check('cookingSteps')
        .isArray({min: 1}).withMessage(`There are no cooking step elements`)
        .bail() //If the above check fails, don't bother running the following checks. Will help with error handling
        .custom((value) => {
            for (let i=0; i<value.length;i++) {
                if (value[i].trim() === '') {
                    throw new Error(`Cooking step at index ${i} has nothing added`)
                }
            }
            return true;
        }),
];

//Home - find all recipes (Frontend will then show 3 random recipes)
router.get(`/home`, recipeController.getRandomRecipes);

//Home/:recipeSearch - Find all recipes containing the phrase in the recipe search
router.get(`/search/:recipeSearch`, recipeController.getRecipeByName);

//viewRecipe - show the recipe matching the given param ID
router.get(`/viewRecipe/:recipeID`, recipeController.getRecipeById);

//Beyond this point, any other calls require authenication
router.use(checkAuth);

//addNewRecipe - Add a new recipe 
//Since this form is being sent as formdata (in order to allow image uploads), we require that extra fileupload argument
router.post(`/addNewRecipe`, 
    fileUpload.single('imageFile'), 
    recipeFormValidation,
    recipeController.addNewRecipe);

//editRecipe - finding the recipe to edit (will be used for auto-fill info)
router.get(`/editRecipe/:recipeID`, recipeController.getRecipeById)
//editRecipe - Update recipe matching a given param ID
router.patch(`/editRecipe/:recipeID`,
    fileUpload.single('imageFile'), 
    recipeFormValidation,
    recipeController.updateRecipe);

//deleteRecipe - delete recipe matching a given param ID
router.delete(`/deleteRecipe/:recipeID`, recipeController.deleteRecipe)


module.exports = router;