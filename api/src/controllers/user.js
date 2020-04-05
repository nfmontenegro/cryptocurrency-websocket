const {sign} = require('jsonwebtoken')
const {hash, compare} = require('bcryptjs')

const {SECRET} = require('../config')
const {prisma} = require('../../generated/prisma-client')

const registerUser = async (req, res) => {
  try {
    const {password, email} = req.body
    const [hashedPassword, hadUser] = await Promise.all([hash(password, 10), req.prisma.user({email})])

    if (hadUser && hadUser.email === email) {
      return res.status(400).json({message: `User with email ${email} exist`})
    }

    const user = await req.prisma.createUser({...req.body, password: hashedPassword})
    return res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

const getUsers = async (req, res) => {
  const {page, limit} = req.query
  try {
    const users = await req.prisma.users()
    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

const getUser = async (req, res) => {
  try {
    const {id} = req.params

    if (!id) {
      return res.status(400).json({message: 'Param resource not found'})
    }

    const user = await req.prisma.user({id})
    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({message: 'User not found'})
    }
  } catch (err) {
    next(err)
  }
}

const deleteUser = async (req, res) => {
  try {
    const {id} = req.params

    if (!id) {
      res.status(400).json({message: 'Param resource not found'})
    }

    const user = await req.prisma.deleteUser({id})

    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({message: 'User not found'})
    }
  } catch (err) {
    next(err)
  }
}

const login = async (req, res) => {
  try {
    const {password, email} = req.body
    const user = await req.prisma.user({email})

    if (!user) {
      return res.status(400).json({message: `No such user found ${email}`})
    }

    const isValidPassword = await compare(password, user.password)

    if (!isValidPassword) {
      return res.status(400).json({message: 'Invalid password'})
    }

    const token = sign({userId: user.id}, SECRET, {expiresIn: '5m'})

    return res.status(200).json({token, user})
  } catch (err) {
    next(err)
  }
}

const profile = async (req, res) => {
  const {userId: id} = req.token
  const user = await req.prisma.user({id})
  res.json(user)
}

module.exports = {
  registerUser,
  getUsers,
  getUser,
  deleteUser,
  login,
  profile
}
