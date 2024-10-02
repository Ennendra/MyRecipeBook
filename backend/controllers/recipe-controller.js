

//Schema models and the error handler model
const HttpError = require('../models/httpError');
const Recipe = require('../models/recipe');


const getAllRecipes = async (req, res, next) => {
    //Define the result
    let recipes;
    //Attempt to find all recipes
    try {
        recipes = await Recipe.find({});
    } catch(error) {
        console.log('Error finding recipes:' + error);
        return next(error);
    }
    res.json({recipes: recipes.map(recipe => recipe.toObject( {getters:true} )) });
};

const getRecipeById = async (req, res, next) => {
    const recipeId = req.params.recipeID;
    let recipes;
    try {
        recipes = await Recipe.find({_id: recipeId});
    } catch(error) {
        console.log('Error finding recipe by id:' + error);
        return next(error);
    }
    
    res.json({recipes: recipes.toObject({getters: true}) });
};

const getRecipeByName = async (req, res, next) => {
    const recipeSearch = req.params.recipeSearch;
    let recipes;
    try {
        recipes = await Recipe.find({recipeName: recipeSearch});
    } catch(error) {
        console.log('Error finding recipe by id:' + error);
        return next(error);
    }
    
    res.json({recipes: recipes.map(recipe => recipe.toObject( {getters:true} )) });
};


const addNewRecipe = async (req, res, next) => {
    const createdRecipe = new Recipe( { 
        recipeName: req.body.recipeName,
        recipeDescription: req.body.recipeDescription,
        imageSrc: req.body.imageSrc,
        prepDurationMinutes : req.body.prepDurationMinutes,
        cookDurationMinutes : req.body.cookDurationMinutes,
        recipeServings: req.body.recipeServings,
        ingredients: req.body.ingredients,
        cookingSteps: req.body.cookingSteps
    });

};

const updateRecipe = async (req, res, next) => {

};

const deleteRecipe = async (req, res, next) => {

};

exports.getAllRecipes = getAllRecipes;
exports.getRecipeById = getRecipeById;
exports.getRecipeByName = getRecipeByName;
exports.addNewRecipe = addNewRecipe;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;










/* getrecipebyid local dummy data
const getRecipeById = (req, res, next) => {
    
    //Define the ID to be checked for
    const recipeId = req.params.recipeID;
    //Define the result
    let recipe;
    //Attempt to run the search
    try {
        recipe = DUMMY_RECIPES.find(r => {
            return r._id === recipeId;
        });
    } catch(err) {
        const error = new HttpError(500,'Something happened, could not find recipe');
        return next(error);
    }
    //Exit with an error if no result is found
    if (!recipe) {
        const error = new HttpError(404,'Could not find a recipe of the provided id');
        return next(error);
    }

    res.json({recipe});
};


const getRecipeByName = async (req, res, next) => {
    //define the search parameter
    const searchName = req.params.recipeSearch;
    //define the results matching the search parameter as an object
    const recipe = DUMMY_RECIPES.find(r => {
        return r.recipeName.includes(recipeSearch);
    });

    //Exit with a status response error if no result was found
    if (!recipe) {
        return next(error);
        return res.status(404).json({message: 'Could not find a recipe of the provided id'});
        
    }
    
    res.json({recipe});
};
*/