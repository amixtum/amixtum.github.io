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
    case "p":
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
    if (!isValidSymbol(arguments[i]))
      return false;

    if (arguments[i] == symbols.savePosition) {
      openDelims.push(arguments[i]);
    }
    if (arguments[i] == symbols.returnToPosition) {
      closeDelims.push(arguments[i]);
    }
  }

  return (closeDelims.length == openDelims.length) && (arguments.length != 0);
}


/**
Represents the initial string of values for the l-system
*/
function axiom() {
  this.axiomArray = [];
}

/**
Sets the axiom if it is valid

@param str The str to set the axiom from

@return True if the axiom was valid and set successfully
        False otherwise
*/
axiom.prototype.setAxiom = function (str) {
  for (var i = 0; i < str.length; ++i) {
    if (str.charAt(i) != ' ') {
      this.axiomArray.push(str.charAt(i));
    }
  }
  if (isValidRule(this.axiomArray)) {
    return true;
  }
  else {
    this.axiomArray = [];
    return false;
  }
}

/**
Represents a production rule in an l-system

@param initialSymbol The symbol that this production rule will expand
*/
function productionRule(initialSymbol) {
  this.initialSymbol = initialSymbol;
  this.rule = [];
}

/**
Creates the production rule from a sring

@param fromString The string to create the production rule from

@return True if fromString represents a valid rule
        False otherwise
*/
productionRule.prototype.setRule(fromString) {
  for (var i = 0; i < fromString.length; ++i) {
    if (fromString.charAt(i) != ' ') {
      this.rule.push(fromString.charAt(i));
    }
  }
  if (isValidRule(this.rule)) {
    return true;
  }
  else {
    this.rule = [];
    return false;
  }
}
