const nlp = require('compromise')

const pattern = require('../utils/pattern')
const Formula = require('../utils/formula')

const FormulaDefinitionNode = {
  match: (key, value) => {
    const words = nlp(key).words()
    return words.out('array')[0] === 'define' && words.out('json')[1].terms[0].tags.includes('Noun')
  },
  execute: (key, value, context) => {
    context.formulas.push(new Formula(new Patern(key), value))
  }
}

module.exports = FormulaDefinitionNode
