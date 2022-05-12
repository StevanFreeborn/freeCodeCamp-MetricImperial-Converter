const Units = require('../units');

function ConvertHandler() {

  this.getNum = function (input) {

    // text to return if number is invalid
    const error = 'invalid number';

    // regex used to match number from input
    const numberRegex = /[^a-z]+/gi;

    // fraction regex explanation:
    // Match:
    // one or more digit + zero or one period + zero or more digits + / + one or more digit + zero or one period + zero or more digits
    // OR
    // one period + one or more digit + / + one period + one or more digit
    const fractionRegex = /^[0-9]+\.?[0-9]*\/[0-9]+\.?[0-9]*$|^\.[0-9]+\/\.[0-9]+$/;

    // if no number can be matched return default value of 1
    if (!input.match(numberRegex)) return 1;

    // number matched from input
    let number = input.match(numberRegex)[0];

    // deal with fractions
    // deal with fractions that are decimals
    // if number matches fraction pattern
    if (number.match(fractionRegex)) {

      // split number at parens
      let numbers = number.split('/');

      // parse individual numbers to floats
      // to acocunt for numbers being decimals
      numbers[0] = parseFloat(numbers[0]);
      numbers[1] = parseFloat(numbers[1]);

      // divide parsed numbers and assign value to number
      number = numbers[0] / numbers[1];

    }

    // deal with matched group of non-letter characters that isn't a valid number or fraction
    if (isNaN(number)) return error;

    // deal with negative numbers
    if (number < 0) return error;

    return parseFloat(number);

  };

  this.getUnit = function (input) {

    // error to return if unit is invalid
    const error = 'invalid unit';

    // valid units
    const validUnits = Object.keys(Units);
    
    // regex for matching unit in input
    const unitRegex = /[a-z]+/gi;

    // return error if no match is in input
    if (!input.match(unitRegex)) return error;

    let unit = input.match(unitRegex)[0].toLowerCase();

    if (unit == 'l') unit = unit.toUpperCase();

    // if matched unit is not in valid units return error
    if (!validUnits.includes(unit)) return error;

    return unit;

  };

  this.getReturnUnit = function (initUnit) {

    return Units[initUnit].returnUnit;

  };

  this.spellOutUnit = function (unit) {

    return Units[unit].name;

  };

  this.convert = function (initNum, initUnit) {

    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        result = 'conversion unsuccessful'
    }

    return parseFloat(parseFloat(result).toFixed(5));

  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {

    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`

  };

}

module.exports = ConvertHandler;