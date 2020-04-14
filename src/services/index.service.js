const jwt = require('jsonwebtoken')
const moment = require('moment')
const CONFIG = require('../config/config')

function createToken (usuario) {
 
    const payload = {
      usr: usuario,
      iat: moment().unix(),
      exp: moment().add(1,'days').unix()
    }
    
    return jwt.sign(payload,CONFIG.SECRET_TOKEN)
  }

  module.exports = {
    createToken
  }