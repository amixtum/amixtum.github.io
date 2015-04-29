/**
Represents a production rule in an l-system

The first symbol in a string represents the symbol to replace
and all other symbols represent the symbols to replace it with
*/
function ProductionRule() {
  this.rule = {};
}

/**
Creates the production rule from a string

@param fromString The string to create the production rule from

@return True if fromString represents a valid rule
        False otherwise
*/
ProductionRule.prototype.addTransformation = function(fromString) {
  var r = [];  // rule to add

  fromString = fromString.trim(); // remove bug-inspiring whitespace

  var key = fromString.charAt(0); // the first character is the symbol
                                 // to apply the replacement to

  for (var i = 1; i < fromString.length; ++i) { // add any symbols that are valid

    if (fromString.charAt(i) != ' ' &&
        isValidSymbol(fromString.charAt(i))) {

      r.push(fromString.charAt(i));
    }

  }

  if (isValidRule(r)) { // add the transformation if it is valid and return true
    this.rule[key] = r;
    return true;
  }

  else {
    return false; // return false if the rule is invalild
  }
}

/**
Applies the rule to a given string

@param toApply The string to apply the rule to

@return A sequence as a result of applying the production
      rule to the given string
*/
ProductionRule.prototype.applyRule = function(toApply) {
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

/**
Applies the rules to the given string over n iterations

@param toApply The initial sequence of symbols

@param n The number of iterations over which to apply the rule

@return The sequence obtained by applying the production rule
        n times.
*/
ProductionRule.prototype.applyRule = function(toApply, n) {
  var result = toApply; // set the result initially to the given string

  for (var i = 0; i < n; ++i) {
    result = this.applyRule(result); // apply the result of the rule n times
  }

  return result; // return the result
}
