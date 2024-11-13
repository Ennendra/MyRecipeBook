/*
    This library holds funcctions to convert measurements to other measurements
    Each ingredient type will have a marked 'density' factor based around 1L/kg
        - For liquids, 1000mL = 1000g, so the factor is 1
        - For lighter densities like flour, 1000mL = 520g, so it's factor is 0.52
    Using these densities for ingredients, we can freely switch between each measurement type

    NOTE: Possible thing to consider with recipe conversions
    g and oz may not need their densities changed if converting with each other
    and same for cup/tsp/tbsp
    if g/oz is converting to cup/tsp/tbsp, THEN apply the density factor
*/

/* List of ingredient codes
Liquids
- Water
- Wine
- Vinegar

Flours/Powders
- All-Purpose
- Cake flour
- Pastry Flour
- Baking Powder/Bicarb
- Cocoa powder

Sugars
- Brown/granulated
- Packed sugar
- Icing sugar

Dairy
- Milk
- Butter
- Cream
- Whipped Cream
- Yoghurt
- Cheese (mozarella)
- Cheese (other)

Syrups
- Honey/Corn Syrup
- Maple Syrup

Oils
- Olive, Canola, Sunflower
- Coconut

Sauces
- Ketchup/Tomato sauce
- Soy sauce

Herbs and spices
- Thyme (ground)
- Basil (ground)
- Oregano (ground)
- Paprika powder
- Chili Powder
- Chili flakes

Other
- Breadcrumbs
- Uncooked Rice
- Fruits and veg (diced/sliced)
- Chicken (diced/minced)
- Other Meat (diced/minced)
*/

//#region Density factor functions
//gets the density factor of the given ingredient (e.g. 'All-Purpose Flour')
function GetDensityFactor(ingredientCode) {

    switch(ingredientCode) {
        case 'Water':   return 1.00;
        case 'Wine':    return 1.01;
        case 'Vinegar': return 1.01;

        case 'All-Purpose Flour':       return 0.53;
        case 'Almond Flour':            return 0.41;
        case 'Cake Flour':              return 0.48;
        case 'Pastry Flour':            return 0.45;
        case 'Baking Powder':           return 0.92;
        case 'Baking Soda/Bicarb':      return 0.71;
        case 'Cocoa Powder':            return 0.36;

        case 'Brown/Granulated Sugar':  return 0.83;
        case 'Packed Sugar':            return 0.88;
        case 'Icing Sugar':             return 0.48;

        case 'Milk':                    return 1.00;
        case 'Butter':                  return 0.96;
        case 'Cream':                   return 1.02;
        case 'Whipped Cream':           return 0.50;
        case 'Yoghurt (Greek)':         return 0.96;
        case 'Yoghurt (Plain)':         return 1.06;
        case 'Cheese (Mozzarella)':     return 0.35;
        case 'Cheese (Other)':          return 0.50;

        case 'Honey/Corn Syrup':        return 1.32;
        case 'Maple Syrup':             return 1.20;

        case 'Olive/Canola/Sunflower Oil':  return 0.95;
        case 'Coconut Oil':                 return 0.92;

        case 'Ketchup/Tomato Sauce':    return 1.04;
        case 'Soy Sauce':               return 1.15;

        case 'Breadcrumbs':                     return 0.46;
        case 'Rice (Uncooked)':                 return 0.78;
        case 'Fruits and Veg (Diced/Sliced)':   return 0.60;
        case 'Chicken (Diced/Minced)':          return 0.80;
        case 'Other Meat (Diced/Minced)':       return 1.00;


        default: return 1.0; 
    }
}
//Determines whether we want to apply the density factor to the measurement. True = we want to apply the density factor
// g and oz do not need to apply the density factor with each other, and same with cup/tsp/tbsp
//If g/oz is converting to cup/tsp/tbsp and vice versa, then we DO want to apply the density factor
function DoApplyDensityFactor(recipeMeasurement, targetMeasurement) {
    if (recipeMeasurement === 'g' || recipeMeasurement === 'oz') {
        if (targetMeasurement === 'cups' || targetMeasurement === 'tsp' || targetMeasurement === 'tbsp') {
            return true;
        }
    }
    else {
        if (recipeMeasurement === 'g' || recipeMeasurement === 'oz') {
            return true;
        }
    }
    return false;
}
//#endregion

//#region Measurement to base
//Converts each of the measurements to a base mL value 
//This is the value before the density factor is applied (e.g., like water)
function ConvertGramsToBase(amount) {
    return amount; //1g = 1mL
}
function ConvertOuncesToBase(amount) {
    return amount * 29.57; //1 fluid ounce = ~29.57mL
}
function ConvertCupsToBase(amount) {
    return amount * 250; //1 metric cup = 250mL
}
function ConvertTeaspoonsToBase(amount) {
    return amount * 5; //1 metric tsp = 5mL
}
function ConvertTablespoonsToBase(amount) {
    return amount * 15; //1 metric tbsp = 15ml
}
//The overall function that will take the measurement type and use the above functions
function ConvertIngredientToBase(amount, measurement) {
    switch(measurement) {
        case 'g':       return ConvertGramsToBase(amount);
        case 'oz':      return ConvertOuncesToBase(amount);
        case 'cups':    return ConvertCupsToBase(amount);
        case 'tsp':     return ConvertTeaspoonsToBase(amount);
        case 'tbsp':    return ConvertTablespoonsToBase(amount);
        default: console.log("Error identifying measurement!"); return amount;
    }
}
//#endregion

//#region Base to measurement
//Converts the base mL measurement to each of the measurement types
//The given value does not apply the density factor. That multiplier will be applied *after* this conversion in the process
//The base measurement is in mL
function ConvertBaseToGrams(amount) {
    return amount; //1g = 1mL
}
function ConvertBaseToOunces(amount) {
    return amount / 29.57; //1 fluid ounce = ~29.57mL
}
function ConvertBaseToCups(amount) {
    return amount / 250; //1 metric cup = 250mL
}
function ConvertBaseToTeaspoons(amount) {
    return amount / 5; //1 metric tsp = 5mL
}
function ConvertBaseToTablespoons(amount) {
    return amount / 15; //1 metric tbsp = 15ml
}
//The overall function that will take the base value and convert it to a measurement using the above functions
function ConvertBaseToIngredientValue(amount, measurement) {
    switch(measurement) {
        case 'g':       return ConvertBaseToGrams(amount);
        case 'oz':      return ConvertBaseToOunces(amount);
        case 'cups':    return ConvertBaseToCups(amount);
        case 'tsp':     return ConvertBaseToTeaspoons(amount);
        case 'tbsp':    return ConvertBaseToTablespoons(amount);
        default: console.log("Error identifying measurement!"); return amount;
    }
}
//#endregion

//#region Rounding final values to whole number or 3 decimal places
//Grams: Round to nearest integer (or 1 if the given amount is too small)
export function RoundingWholeNumber(amount) {
    var rounding = Math.round(amount);
    if (rounding<=0) { rounding = 1; }
    return rounding;
}
//Others: Round to nearest 3 decimal places (or 0.001 if the given amount is too small)
export function RoundingFraction(amount) {
    var rounding = Math.round(amount * 1000) / 1000;
    if (rounding<=0) { rounding = 0.001; }
    return rounding;
}
//#endregion

//#region Convert decimal value to readable fraction
//Convert a a decimal number into a string displaying the number in a simplified fraction form (e.g. '1/8, 2 1/3')
//Fraction conversion rounds to nearest /8, /4, /3 or /2
//If given number is smaller than 0.06, the end result will be "< 1/8"
export function DecimalAsFraction(amount){
    //Prepare the final value as a string
    var fractionValue = ``;

    //Separate the decimal value and the whole number from each other
    var wholeNumber = Math.floor(amount);
    var decimalNumber = amount % 1;
    
    //Declare the variable that will be used to display the decimal point as a fraction
    var decimalToFraction = ``;

    //Convert the decimal value to a fraction based on the values below
    /*
    <1/8    1/8         1/4         1/3         3/8         1/2         5/8         2/3         3/4         7/8             1
            .125        .25         .333        .375        .5          .625        .666        .75         .875            1
    <0.06   <0.187      <0.291      <0.354      <0.437      <0.562      <0.645      <0.708      <0.812      <0.937          >=0.937
    */     
    if (decimalNumber<0.06) {
        //check if we have a whole number value, if we don't, set to '< 1/8', so we avoid a full 0 value
        if (wholeNumber <=0) { decimalToFraction=`< 1/8`; }
    }
    else if (decimalNumber<0.187) {
        decimalToFraction=`1/8`;
    }
    else if (decimalNumber<0.291) {
        decimalToFraction=`1/4`;
    }
    else if (decimalNumber<0.354) {
        decimalToFraction=`1/3`;
    }
    else if (decimalNumber<0.437) {
        decimalToFraction=`3/8`;
    }
    else if (decimalNumber<0.562) {
        decimalToFraction=`1/2`;
    }
    else if (decimalNumber<0.645) {
        decimalToFraction=`5/8`;
    }
    else if (decimalNumber<0.708) {
        decimalToFraction=`2/3`;
    }
    else if (decimalNumber<0.812) {
        decimalToFraction=`3/4`;
    }
    else if (decimalNumber<0.937) {
        decimalToFraction=`7/8`;
    }
    else {
        //The value is close enough to a whole number that we will round it to the whole number
        wholeNumber = wholeNumber + 1;
    }
    
    //Add the whole number to the final value if it is not 0 (to avoid values like '0 1/8')
    if (wholeNumber>0) { fractionValue+=`${wholeNumber} `; }
    //add the fraction value (if not a fraction, value will be blank so no real change will happen)
    fractionValue += decimalToFraction;
    
    return fractionValue;
}
//#endregion

//Takes the given ingredientType and returns the ingredientType that the given type was wanting to be converted to via localStorage
function DeterminePreferredMeasurement(ingredientType) {
    //Get the localStorage settings
    const localStorageSettings = JSON.parse(localStorage.getItem('localTypesSettings'));
    //Do not convert if no settings were found
    if (!localStorageSettings) {return ingredientType;}

    switch(ingredientType) {
        case "g":
            return localStorageSettings.g;
        case "oz":
            return localStorageSettings.oz;
        case "cup":
            return localStorageSettings.cups;
        case "tsp":
            return localStorageSettings.tsp;
        case "tbsp":
            return localStorageSettings.tbsp;
    }

    //No conversion needed, just return the same value
    return ingredientType;
}

//#region THE MAIN FUNCTION
//Takes the given ingredient object {amount, measurement, ingredientCode} and converts its amount value as needed
//ingredientCode is used to more accurately convert values based on the density factor of the recipe
export function ConvertIngredientData(ingredient) {
    //set a variable for the revised ingredient object
    var revisedIngredient = ingredient;

    //If the ingredient type is 'items', then return without changes
    if (revisedIngredient.measurement === 'items') { 
        revisedIngredient.amount = DecimalAsFraction(revisedIngredient.amount);
        return revisedIngredient; 
    }

    //Set what we wish this ingredient to be converted to
    var preferredIngredientType = DeterminePreferredMeasurement(revisedIngredient.measurement)
    //If the ingredient types match, then return without changes
    if (ingredient.measurement === preferredIngredientType) { 
        revisedIngredient.amount = DecimalAsFraction(revisedIngredient.amount);
        return revisedIngredient; 
    }

    //Main conversion here --
    //First, convert the ingredient amount to the base mL value
    var convertedIngredientAmount = ConvertIngredientToBase(ingredient.amount, ingredient.measurement);
    //Second, determine whether we want to apply the density factor to this measurement and if so, add the multiplier to it
    if (DoApplyDensityFactor(ingredient.measurement, preferredIngredientType)) {
        convertedIngredientAmount = convertedIngredientAmount * GetDensityFactor(ingredient.ingredientCode);
    }
    //Third, convert that base value to the preferred ingredient type
    convertedIngredientAmount = ConvertBaseToIngredientValue(convertedIngredientAmount, preferredIngredientType);

    //Finalising conversions
    //change the measurement value to match the preferred measurement
    revisedIngredient.measurement = preferredIngredientType;
    revisedIngredient.amount = DecimalAsFraction(convertedIngredientAmount);
    //Return the revised ingredient
    return revisedIngredient;
}
//#endregion