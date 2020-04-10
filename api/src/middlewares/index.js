const jwt = require('jsonwebtoken')
const {SECRET} = require('../config')

// use util promisy to convert callback to async/await
const verifyJWT = (token, secret) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  )

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization']
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }

  if (token) {
    verifyJWT(token, SECRET)
      .then(verifiedToken => {
        if (!verifiedToken) {
          res.status(401).json({message: 'Token is not valid'})
        } else {
          req.token = verifiedToken
          next()
        }
      })
      .catch(err => {
        res.status(401).json({message: err.message})
      })
  } else {
    res.status(403).json({
      message: 'Auth token is not supplied'
    })
  }
}

module.exports = {
  verifyToken
}
