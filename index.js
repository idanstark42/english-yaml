const fs = require('fs')
const run = require('./interpreter')

const command = (arguments[0] === '-f') ? fs.readFile(arguments[1]) : arguments[0]
run(command)
