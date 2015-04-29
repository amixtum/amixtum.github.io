function LSystem() {
  this.axiom = new Axiom();
  this.productionRule = new ProductionRule();
}

LSystem.prototype.setAxiom = function(ax) {
  return this.axiom.setAxiom(ax);
}

LSystem.prototype.addTransformation = function(trns) {
  return this.productionRule.addTransformation(trns);
}

LSystem.prototype.applyRule = function(n) {
  return this.productionRule.appplyRule(this.axiom.asString(), n);
}
