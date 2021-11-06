const YAML = require('yaml')

const Context = require('./utils/context')
const nodes = require('./nodes')

const run = command => {
  const doc = YAML.parse(doc)

  const context = new Context()
  if (doc.constructor === String) {
    context.execute(doc)
  } else {
    Object.entries(doc).forEach(([key, value]) => context.execute({ [key]: value }))
  }
}

module.exports = run
