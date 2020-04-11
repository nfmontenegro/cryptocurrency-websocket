const jwt = require('jsonwebtoken')
const util = require('util')
const {SECRET} = require('../config')

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers['authorization']
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length)
      const verify = util.promisify(jwt.verify)
      const hasAccessToken = await verify(token, SECRET)
      req.token = hasAccessToken

      next()
    } else {
      res.status(403).json({
        message: 'Auth token is not supplied'
      })
    }
  } catch (err) {
    res.status(401).json({message: err.message})
  }
}

module.exports = {
  verifyToken
}
