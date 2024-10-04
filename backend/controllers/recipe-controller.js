
//Some recipe IDs for testing reference
// 66fe3dd424a3d8d395d48a3c
// 66fe3ded5b31e4110936d95d
// 66fe3e0b5b31e4110936d95e


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
        const newError = new HttpError(500,"Something went wrong obtaining the recipe list: ");
        return next(newError);
    }
    res.json({recipes: recipes.map(recipe => recipe.toObject( {getters:true} )) });
};

const getRecipeById = async (req, res, next) => {
    //define the ID parameter
    const recipeId = req.params.recipeID;
    //defiine the result
    let recipe;
    //attempt the search
    try {
        recipe = await Recipe.findById(recipeId);
    } catch(error) {
        const newError = new HttpError(500,"Something went wrong when searching for a recipe by ID: ");
        return next(newError);
    }
    //return a 404 error if no recipe is found
    if (!recipe) {
        const newError = new HttpError(404,"Could not find a recipe with the given ID.");
        return next(newError);
    }
    
    res.json({recipes: recipe.toObject({getters: true}) });
};

const getRecipeByName = async (req, res, next) => {
    //define the search parameter, convert the parameter into utf format
    const recipeSearch = encodeURIComponent(req.params.recipeSearch);
    
    console.log(recipeSearch);
    
    let recipes;
    try {
        recipes = await Recipe.find().searchByName(recipeSearch);
    } catch(error) {
        const newError = new HttpError(500,"Something went wrong when searching for a recipe by name: ");
        return next(newError);
    }

    if (!recipes || recipes.length === 0) {
        const newError = new HttpError(404,"Could not find any recipes with a name containing the search term.");
        return next(newError);
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
