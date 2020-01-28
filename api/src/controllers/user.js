const {prisma} = require('../../generated/prisma-client')

const registerUser = (req, res) => {
  return prisma.createUser(req.body).then(user => res.status(200).json({data: user}))
}

const getUsers = (req, res) => {
  return prisma
    .users()
    .then(users => res.status(200).json({data: users}))
    .catch(err => console.log('Error:', err))
}

const getUser = (req, res) => {
  const {id} = req.params
  return prisma
    .user({id})
    .then(user => res.status(200).json({data: user}))
    .catch(err => console.log('Error:', err))
}

const deleteUser = (req, res) => {
  const {id} = req.params
  return prisma
    .deleteUser({id})
    .then(user => res.status(200).json({data: user}))
    .catch(err => console.log('Error:', err))
}

module.exports = {
  registerUser,
  getUsers,
  getUser,
  deleteUser
}
