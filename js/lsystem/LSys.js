function LSystem() {
  this.axiom = new Axiom();
  this.productionRule = new ProductionRule();
}

LSystem.prototype.setAxiom = function(ax) {
  this.axiom.setAxiom(ax);
}

LSystem.prototype.addTransformation = function(trns) {
  this.productionRule.addTransformation(trns);
}

LSystem.prototype.applyRule = function(n) {
  return this.productionRule.applyRuleN(this.axiom.asString(), n);
}
