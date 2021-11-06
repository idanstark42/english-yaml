class Context {
  constructor() {
    Object.assign(this, { formulas: [], actions: [], variables: {} })
  }

  evaluate (value) {
    if (this.variables.hasOwnProperty(value))
      return this.variables[value]

    const formula = this.formulas.find(f => f.pattern.match(value))
    if (formula) {
      return this.formula.evaluate(value, this)
    }

    return value
  }

  execute (cmd) {
    
  }
}

module.exports = Context
