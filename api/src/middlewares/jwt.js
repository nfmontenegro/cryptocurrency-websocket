const jwt = require('jsonwebtoken')
const {SECRET} = require('../config')

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']

  if (token) {
    jwt
      .verify(token, SECRET)
      .then(verifiedToken => {
        if (!verifiedToken) {
          res.status(401).json({message: 'Token is not valid'})
        } else {
          req.token = verifiedToken
          next()
        }
      })
      .catch(err => res.status(400).json(err))
  } else {
    res.status(403).json({
      message: 'Auth token is not supplied'
    })
  }
}
