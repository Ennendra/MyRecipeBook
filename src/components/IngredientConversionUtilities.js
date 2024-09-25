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
    conversion = RoundingWholeNumber(conversion);
    return conversion;
}
export function GramsToCups(amountToConvert) {
    var conversion = (amountToConvert) * 0.004;
    conversion = RoundingWholeNumber(conversion);
    return conversion;
}
export function GramsToTeaspoons(amountToConvert) {
    var conversion = (amountToConvert) * 0.2;
    conversion = RoundingWholeNumber(conversion);
    return conversion;
}
export function GramsToTablespoons(amountToConvert) {
    var conversion = (amountToConvert) * 0.066667;
    conversion = RoundingWholeNumber(conversion);
    return conversion;
}

//Conversion: Ounces to ---
export function OuncesToGrams(amountToConvert) {
    var conversion = (amountToConvert) * 28.41306;
    conversion = RoundingFraction(conversion);
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
    conversion = RoundingFraction(conversion);
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
    conversion = RoundingFraction(conversion);
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
    conversion = RoundingFraction(conversion);
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
//Grams: Round to nearest integer (or 1 if the result is too small)
export function RoundingWholeNumber(amount) {
    var rounding = Math.round(amount);
    if (rounding<=0) {
        rounding = 1;
    }
    return rounding;
}
//Others: Round to nearest 3 decimal places. If result is under 0.125 (ie: 1/8) then set to 0.125
export function RoundingFraction(amount) {
    var rounding = Math.round(amount * 1000) / 1000;
    if (rounding < 0.125) { rounding = 0.125; }
    return rounding;
}