const { prisma } = require('../../generated/prisma-client')

const registerUser = (req, res) => {
  const newUser = prisma.createUser(req.body).then(user => res.json(user))
}

module.exports = {
  registerUser
}
