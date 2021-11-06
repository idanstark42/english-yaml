class Formula {
  constructor (pattern, meaning) {
    Object.assign(this, { pattern, meaning })
  }

  evaluate (value, context) {
    const parameters = this.pattern.extract(value)
    const calculableValue = Object.entries(parameters).reduce((calculableValue, [paramKey, paramRawValue]) => {
      const paramValue = context.evaluate(paramRawValue)
      return calculableValue.replaceAll(new RegExp(`[^a-zA-Z0-9]${paramKey}[^a-zA-Z0-9]`), paramValue)
    }, this.meaning)
    return context.evaluate(calculableValue)
  }
}

module.exports = Formula
