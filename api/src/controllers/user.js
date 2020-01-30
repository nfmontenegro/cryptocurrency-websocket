const {hash} = require('bcryptjs')
const {sign} = require('jsonwebtoken')
const {prisma} = require('../../generated/prisma-client')

const registerUser = async (req, res) => {
  const {password, email} = req.body

  const response = Promise.all([hash(password, 10), prisma.user({email})])

  return response
    .then(data => {
      const [hashedPassword, hadUser] = data
      if (hadUser && hadUser.email === email) {
        throw new Error(`User with email ${email} exist `)
      }

      return prisma.createUser({
        ...req.body,
        password: hashedPassword
      })
    })
    .then(async user =>
      res.json({
        token: sign({userId: user.id}, 'secret shhh'),
        user
      })
    )
    .catch(err => res.status(500).send(err.message))
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
