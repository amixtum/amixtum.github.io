/**
Represents the initial string of values for the l-system
*/
function Axiom() {
  this.axiomArray = [];
}

/**
Sets the axiom if it is valid

@param str The str to set the axiom from

@return True if the axiom was valid and set successfully
        False otherwise
*/
Axiom.prototype.setAxiom = function (str) {
  for (var i = 0; i < str.length; ++i) {
    if (str.charAt(i) != ' ') {
      this.axiomArray.push(str.charAt(i));
    }
  }
}

Axiom.prototype.asString = function() {
  return this.axiomArray.toString().replace(/,/g, " ");
}
