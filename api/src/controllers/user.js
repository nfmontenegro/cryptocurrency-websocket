const {sign} = require('jsonwebtoken')
const {hash, compare} = require('bcryptjs')

const {prisma} = require('../../generated/prisma-client')

const {paginate, buildConnectionResponse} = require('../utils')

const registerUser = (req, res) => {
  const {password, email} = req.body
  const response = Promise.all([hash(password, 10), prisma.user({email})])

  return response
    .then(data => {
      const [hashedPassword, hadUser] = data
      if (hadUser && hadUser.email === email) {
        res.status(400).json({message: `User with email ${email} exist`})
      }

      return prisma.createUser({
        ...req.body,
        password: hashedPassword
      })
    })
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({message: err.message}))
}

const getUsers = (req, res) => {
  const {page, limit} = req.query
  return (
    prisma
      .users()
      // .usersConnection(paginate(page, limit))
      // .then(buildConnectionResponse)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({message: err.message}))
  )
}

const getUser = (req, res) => {
  const {id} = req.params
  if (!id) {
    return res.status(400).json({message: 'Param resource not found'})
  }
  return prisma
    .user({id})
    .then(user => {
      if (user) {
        return res.status(200).json(user)
      } else {
        return res.status(404).json({message: 'User not found'})
      }
    })
    .catch(err => res.status(500).json({message: err.message}))
}

const deleteUser = (req, res) => {
  const {id} = req.params
  if (!id) {
    res.status(400).json({message: 'Param resource not found'})
  }

  return prisma
    .deleteUser({id})
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({message: 'User not found'})
      }
    })
    .catch(err => res.status(500).json({message: err.message}))
}

const login = (req, res) => {
  const {password, email} = req.body

  return prisma
    .user({email})
    .then(user => {
      if (!user) {
        res.status(400).json({message: `No such user found ${email}`})
      }
      return {password: compare(password, user.password), user}
    })
    .then(data => {
      const {password, user} = data
      const isValidPassword = Promise.resolve(password)

      if (!isValidPassword) {
        res.status(400).json({message: 'Invalid password'})
      }

      res.status(200).json({
        data: {
          token: sign({userId: user.id}, 'psssshhhhtt! secret')
        }
      })
    })
    .catch(err => res.status(500).json({message: err.message}))
}

module.exports = {
  registerUser,
  getUsers,
  getUser,
  deleteUser,
  login
}
