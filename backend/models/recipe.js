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
    recipeDescription: {type: String},
    imageSrc: String,
    prepDurationMinutes : Number,
    cookDurationMinutes : Number,
    recipeServings: Number,
    ingredients: [ingredientSchema],
    cookingSteps: [String],
    isPrivate: Boolean,
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

//Create this query helper, which will help with searching by recipe name
//(.*) tags assist by saying that there can be anything else before and after the search text
//the 'i' regular expression means the search will not be case-sensitive
recipeSchema.query.searchByName = function(name) {
    return this.where({recipeName: new RegExp('(.*)'+name+'(.*)', 'i')})
};

//index the recipe name, so that searches will not be case-sensitive
recipeSchema.index({recipeName: 'text'})

//Export the schema as a model to be used in other files
module.exports = mongoose.model('Recipe', recipeSchema);