/*
This library holds functions to convert each ingredient type to another type

The conversion function runs as follows
    Takes the given amount, and multiplies it based on specific conversion amount 
        e.g. TeaspoonToGrams: 1tsp = 5g
        So the conversion = <given amount> * 5
    Rounds the result to nearest 3 decimals (or in the case of grams, whole number)
*/
//Conversion: Grams to ---
export function GramsToOunces(amountToConvert) {
    var conversion = (amountToConvert) * 0.035195;
    conversion = RoundingFraction(conversion);
    return conversion;
}
export function GramsToCups(amountToConvert) {
    var conversion = (amountToConvert) * 0.004;
    conversion = RoundingFraction(conversion);
    return conversion;
}
export function GramsToTeaspoons(amountToConvert) {
    var conversion = (amountToConvert) * 0.2;
    conversion = RoundingFraction(conversion);
    return conversion;
}
export function GramsToTablespoons(amountToConvert) {
    var conversion = (amountToConvert) * 0.066667;
    conversion = RoundingFraction(conversion);
    return conversion;
}

//Conversion: Ounces to ---
export function OuncesToGrams(amountToConvert) {
    var conversion = (amountToConvert) * 28.41306;
    conversion = RoundingWholeNumber(conversion);
    return conversion;
}
export function OuncesToCups(amountToConvert) {
    var conversion = (amountToConvert) * 0.113652;
    conversion = RoundingFraction(conversion);
    return conversion;
}
export function OuncesToTeaspoons(amountToConvert) {
    var conversion = (amountToConvert) * 5.682612;
    conversion = RoundingFraction(conversion);
    return conversion;
}
export function OuncesToTablespoons(amountToConvert) {
    var conversion = (amountToConvert) * 1.894204;
    conversion = RoundingFraction(conversion);
    return conversion;
}

//Conversion: Cup to ---
export function CupsToGrams(amountToConvert) {
    var conversion = (amountToConvert) * 250;
    conversion = RoundingWholeNumber(conversion);
    return conversion;
}
export function CupsToOunces(amountToConvert) {
    var conversion = (amountToConvert) * 8.79877;
    conversion = RoundingFraction(conversion);
    return conversion;
}
export function CupsToTeaspoons(amountToConvert) {
    var conversion = (amountToConvert) * 50;
    conversion = RoundingFraction(conversion);
    return conversion;
}
export function CupsToTablespoons(amountToConvert) {
    var conversion = (amountToConvert) * 16.66667;
    conversion = RoundingFraction(conversion);
    return conversion;
}

//Conversion: Teaspoon to ---
export function TeaspoonsToGrams(amountToConvert) {
    var conversion = (amountToConvert) * 5;
    conversion = RoundingWholeNumber(conversion);
    return conversion;
}
export function TeaspoonsToOunces(amountToConvert) {
    var conversion = (amountToConvert) * 0.175975;
    conversion = RoundingFraction(conversion);
    return conversion;
}
export function TeaspoonsToCups(amountToConvert) {
    var conversion = (amountToConvert) * 0.02;
    conversion = RoundingFraction(conversion);
    return conversion;
}
export function TeaspoonsToTablespoons(amountToConvert) {
    var conversion = (amountToConvert) * 0.333333;
    conversion = RoundingFraction(conversion);
    return conversion;
}

//Conversion: Tablespoon to ---
export function TablespoonsToGrams(amountToConvert) {
    var conversion = (amountToConvert) * 15;
    conversion = RoundingWholeNumber(conversion);
    return conversion;
}
export function TablespoonsToOunces(amountToConvert) {
    var conversion = (amountToConvert) * 0.527926;
    conversion = RoundingFraction(conversion);
    return conversion;
}
export function TablespoonsToCups(amountToConvert) {
    var conversion = (amountToConvert) * 0.06;
    conversion = RoundingFraction(conversion);
    return conversion;
}
export function TablespoonsToTeaspoons(amountToConvert) {
    var conversion = (amountToConvert) * 3;
    conversion = RoundingFraction(conversion);
    return conversion;
}


//Rounding functions --------
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


//Takes the given ingredientType and returns the ingredientType that the given type was wanting to be converted to via localStorage
function DeterminePreferredType(ingredientType) {
    //Get the localStorage settings
    const localStorageSettings = JSON.parse(localStorage.getItem('ingredientPreference'));
    console.log(localStorageSettings);
    //Do not convert if no settings were found
    if (!localStorageSettings) {return ingredientType;}


    switch(ingredientType) {
        case 'g':
            return localStorageSettings.preferenceGrams;
        case 'oz':
            return localStorageSettings.preferenceOunces;
        case 'cup':
            return localStorageSettings.preferenceCups;
        case 'tsp':
            return localStorageSettings.preferenceTeaspoons;
        case 'tbsp':
            return localStorageSettings.preferenceTablespoons;
    }

    //No conversion needed, just return the same value
    return ingredientType;
}

//THE MAIN FUNCTION
//Takes the given ingredient object and converts the data based on settings, returning a revised ingredient object
export function ConvertIngredientData(ingredient) {
    //set a variable for the revised ingredient object
    var revisedIngredient = ingredient;

    console.log("Before conversion:" + revisedIngredient.amount);

    //If the ingredient type is 'items', then return without changes
    if (revisedIngredient.measurement === 'items') { 
        revisedIngredient.amount = DecimalAsFraction(revisedIngredient.amount);
        return revisedIngredient; 
    }

    //Set what we wish this ingredient to be converted to
    var preferredIngredientType = DeterminePreferredType(ingredient.measurement)
    //If the ingredient types match, then return without changes
    if (ingredient.measurement === preferredIngredientType) { 
        revisedIngredient.amount = DecimalAsFraction(revisedIngredient.amount);
        return revisedIngredient; 
    }

    //Run the conversion based on the ingredient measurement and the preferred measurement and change the amount accordingly
    switch(revisedIngredient.measurement) {
        case 'g':
            switch(preferredIngredientType) {
                case 'oz': 
                    revisedIngredient.amount = GramsToOunces(revisedIngredient.amount);
                    break;
                case 'cup': 
                    revisedIngredient.amount = GramsToCups(revisedIngredient.amount);
                    break;
                case 'tsp': 
                    revisedIngredient.amount = GramsToTeaspoons(revisedIngredient.amount);
                    break;
                case 'tbsp': 
                    revisedIngredient.amount = GramsToTablespoons(revisedIngredient.amount);
                    break;
            }
            break;
        case 'oz':
            switch(preferredIngredientType) {
                case 'g': 
                    revisedIngredient.amount = OuncesToGrams(revisedIngredient.amount);
                    break;
                case 'cup': 
                    revisedIngredient.amount = OuncesToCups(revisedIngredient.amount);
                    break;
                case 'tsp': 
                    revisedIngredient.amount = OuncesToTeaspoons(revisedIngredient.amount);
                    break;
                case 'tbsp': 
                    revisedIngredient.amount = OuncesToTablespoons(revisedIngredient.amount);
                    break;
            }
            break;
        case 'cup':
            switch(preferredIngredientType) {
                case 'g': 
                    revisedIngredient.amount = CupsToGrams(revisedIngredient.amount);
                    break;
                case 'oz': 
                    revisedIngredient.amount = CupsToOunces(revisedIngredient.amount);
                    break;
                case 'tsp': 
                    revisedIngredient.amount = CupsToTeaspoons(revisedIngredient.amount);
                    break;
                case 'tbsp': 
                    revisedIngredient.amount = CupsToTablespoons(revisedIngredient.amount);
                    break;
            }
            break;
        case 'tsp':
            switch(preferredIngredientType) {
                case 'g': 
                    revisedIngredient.amount = TeaspoonsToGrams(revisedIngredient.amount);
                    break;
                case 'oz': 
                    revisedIngredient.amount = TeaspoonsToOunces(revisedIngredient.amount);
                    break;
                case 'cup': 
                    revisedIngredient.amount = TeaspoonsToCups(revisedIngredient.amount);
                    break;
                case 'tbsp': 
                    revisedIngredient.amount = TeaspoonsToTablespoons(revisedIngredient.amount);
                    break;
            }
            break;
        case 'tbsp':
            switch(preferredIngredientType) {
                case 'g': 
                    revisedIngredient.amount = TablespoonsToGrams(revisedIngredient.amount);
                    break;
                case 'oz': 
                    revisedIngredient.amount = TablespoonsToOunces(revisedIngredient.amount);
                    break;
                case 'cup': 
                    revisedIngredient.amount = TablespoonsToCups(revisedIngredient.amount);
                    break;
                case 'tsp': 
                    revisedIngredient.amount = TablespoonsToTeaspoons(revisedIngredient.amount);
                    break;
            }
            break;
    }

    //change the measurement value to match the preferred measurement
    revisedIngredient.measurement = preferredIngredientType;
    revisedIngredient.amount = DecimalAsFraction(revisedIngredient.amount);
    //Return the revised ingredient
    return revisedIngredient;
}