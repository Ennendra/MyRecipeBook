//temporary function for creating a recipe and adding to recipes.json
export function CreateRecipe() {

    //Setting some values for the test
    var imageSrc="";
    var recipeName = "Test Recipe";
    var recipeDescription = "This is a test to see if the recipe is successfully added to the JSON file";
    var servings = 4;
    var prepTime = 50;
    var cookTime = 150;
    var ingredientAmount = [3, 5, 4.333];
    var ingredientType = ["Oz", "Tbsp", "Cups"];
    var ingredientName = ["Meat", "Oil, with added steps", "Water or something"];
    var steps = [
        "Step 1 is to oil the meat, iunno",
        "Step 2, don't anger the pidgeons",
        "Step 3, I said don't anger the pidgeons! What are you doing?!",
        "Step 4, add water, serve as a mush"
    ];
    
    //Formatting the JSON object to be added
    //Set the recipe ID to the highest current ID number + 1
    //TODO

}