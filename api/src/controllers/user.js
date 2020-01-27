const {prisma} = require('../../generated/prisma-client')

const registerUser = (req, res) => {
  return prisma.createUser(req.body).then(user => res.json(user))
}

const getUsers = (req, res) => {
  return prisma
    .users()
    .then(users => res.json(users))
    .catch(err => console.log('Error:', err))
}

const getUser = (req, res) => {
  const {id} = req.params
  return prisma
    .user({id})
    .then(user => res.json(user))
    .catch(err => console.log('Error:', err))
}

module.exports = {
  registerUser,
  getUsers,
  getUser
}
