const mongoose = require('mongoose');

//Schema for each ingredient
const ingredientSchema = new mongoose.Schema( {
    amount: Number,
    measurement: String,
    item: String
});

//Schema for the full recipe
const recipeSchema = new mongoose.Schema( {
    recipeName: {type: String, required: true},
    recipeDescription: {type: String, required: true},
    imageSrc: String,
    prepDurationMinutes : Number,
    cookDurationMinutes : Number,
    recipeServings: Number,
    ingredients: [ingredientSchema],
    cookingSteps: [String]
});

//Export the schema as a model to be used in other files
module.exports = mongoose.model('Recipe', recipeSchema);