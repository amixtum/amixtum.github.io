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

The first symbol in a string represents the symbol to replace
and all other symbols represent the symbols to replace it with
*/
function productionRule() {
  this.rule = {};
}

/**
Creates the production rule from a string

@param fromString The string to create the production rule from

@return True if fromString represents a valid rule
        False otherwise
*/
productionRule.prototype.addRule(fromString) {
  var r = [];

  var key = fromString.charAt(0);

  fromString = fromString.trim();

  for (var i = 1; i < fromString.length; ++i) {
    if (fromString.charAt(i) != ' ' &&
        isValidSymbol(fromString.charAt(i))) {
      r.push(fromString.charAt(i));
    }
  }
  if (isValidRule(r)) {
    this.rule[key] = r;
    return true;
  }
  else {
    return false;
  }
}

/**
Applies the rule to a given string

@param toApply The string to apply the rule to

@return A sequence as a result of applying the production
      rule to the given string
*/
productionRule.prototype.applyRules(toApply) {
  var newSequence = []; // we will return this

  var keys = Object.keys(this.rule); // array of keys representing
                                    // characters to replace

  for (var i = 0; i < toApply.length; ++i) { // iterate through the parameter
                                            // string

    if (toApply.charAt(i) != ' ' &&
        isValidSymbol(fromString.charAt(i))) { // if the character is in the
                                              // alphabet

        for (var j = 0; j < keys.length; ++j) { // look for the corresponding
                                              // rule for this character

          if (toApply.charAt(j) == keys[j]) { // add the result of replacing
                                            // the character to the result
            newSequence.push(this.rule[j]);
            break;
          }
        }
    }
  }

  return newSequence; // return the result
}
