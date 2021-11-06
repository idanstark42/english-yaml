export default class Pattern {
  constructor (raw) {
    this.raw = raw
    this.params = (this.raw.match(Pattern.Param.REGEX) || []).map(match => {
      const [type, name] = match.substring(1, match.length - 1).split(Pattern.Param.SEPERATOR)
      return new Pattern.Param(name, type)
    })
  }

  regex () {
    let str = this.raw
    this.params.forEach(param => {
      const paramMatch = `(?<${param.name}>${REGEX_WITHOUT_PARENTHASSES})`
      str = str.replace(`<${param.name}>`, paramMatch).replace(`<${param.type}:${param.name}>`, paramMatch)
    })
    return new RegExp(`^${str}$`)
  }

  match (raw) {
    const match = this.regex().exec(raw)
    return match && match[0]
  }

  extract (raw) {
    const rawParams = this.regex().exec(raw).groups
    if (!rawParams) return null
    Object.keys(rawParams).forEach(key => { rawParams[key] = this._removeParenthases(rawParams[key]) })
    return rawParams
  }

  getParameterTypes () {
    return this.params.reduce((param, { name, type }) => ({ [name]: type }), { })
  }

  _removeParenthases (raw) {
    if (raw.match(/^\(.*\)$/)) {
      return raw.substring(1, raw.length - 1)
    }
    return raw
  }
}

Pattern.Param = class PatternParam {
  constructor (name, type) {
    Object.assign(this, { name, type: type || name })
  }
}

const REGEX_WITHOUT_PARENTHASSES = '[^\\)]+?(\\(.+?)?'

Pattern.Param.REGEX = /<(\w+:?\w+?)>/g
Pattern.Param.SEPERATOR = ':'

module.exports = Pattern
