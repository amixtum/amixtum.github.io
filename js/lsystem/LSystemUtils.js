/**
The valid symbols for this l-system
*/
alphabet = {rotateLeft: "<", rotateRight: ">",
           rotateUp: "^", rotateDown: "v",
           moveForward: "F",
           savePosition: "[", returnToPosition: "]",
           placeObject: "P"}

/**
Determines the validity of the given symbol

@param sym The symbol to validate

@return True if the symbol is in the alphabet
        False otherwise
*/
function isValidSymbol(sym) {
  switch (sym) {
    case "<":
    case ">":
    case "^":
    case "v":
    case "F":
    case "[":
    case "]":
    case "P":
      return true;
    default:
      return false;
  }
}

/**
Validates the rule
@param arguments This function takes a variable number of arguments
                 Representing an axiom or result of a production rule
@return True if all delimiters match and all symbols are valid
        False otherwise
*/
function isValidRule() {
  var openDelims = [];
  var closeDelims = [];

  for (var i = 0; i < arguments.length; ++i) {
    if (!isValidSymbol(arguments[i])) {
      console.log("found invalid symbol in isValidRule()" + arguments[i]);
      return false;
    }

    if (arguments[i] == symbols.savePosition) {
      openDelims.push(arguments[i]);
    }

    if (arguments[i] == symbols.returnToPosition) {
      closeDelims.push(arguments[i]);
    }
  }

  console.log("Is valid rule returned" + ((closeDelims.length == openDelims.length) && (arguments.length != 0)))

  return (closeDelims.length == openDelims.length) && (arguments.length != 0);
}
