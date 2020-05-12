const {sign} = require('jsonwebtoken')
const {hash, compare} = require('bcryptjs')

const {SECRET} = require('../config')

async function registerUser(req, res, next) {
  try {
    const {password, email} = req.body
    const [hashedPassword, hadUser] = await Promise.all([hash(password, 10), req.prisma.user.findOne({where: {email}})])

    if (hadUser && hadUser.email === email) {
      return res.status(400).json({message: `User with email ${email} exist`})
    }

    const user = await req.prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword
      }
    })
    return res.status(201).json(user)
  } catch (err) {
    next(err)
  } finally {
    await req.prisma.disconnect()
  }
}

async function getUsers(req, res, next) {
  const {page = 1, limit: paginationLimit = 10} = req.query
  const pageNumber = +page
  const limit = +paginationLimit
  try {
    const users = await req.prisma.user.findMany({
      first: limit,
      skip: (pageNumber - 1) * limit
    })
    return res.status(200).json(users)
  } catch (err) {
    next(err)
  } finally {
    await req.prisma.disconnect()
  }
}

async function getUser(req, res, next) {
  try {
    const id = parseInt(req.params.id)

    if (!id) {
      return res.status(400).json({message: 'Param resource not found'})
    }

    const user = await req.prisma.user.findOne({
      where: {
        id
      }
    })
    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({message: 'User not found'})
    }
  } catch (err) {
    next(err)
  } finally {
    await req.prisma.disconnect()
  }
}

async function deleteUser(req, res, next) {
  try {
    const id = parseInt(req.params.id)

    if (!id) {
      return res.status(400).json({message: 'Param resource not found'})
    }

    const user = await req.prisma.user.delete({
      where: {
        id
      }
    })

    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({message: 'User not found'})
    }
  } catch (err) {
    next(err)
  } finally {
    await req.prisma.disconnect()
  }
}

async function updateUser(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    if (!id) {
      return res.status(400).json({message: 'Param resource not found'})
    }

    const user = await req.prisma.user.update({
      where: {
        id
      },
      data: req.body
    })

    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({message: 'User not found'})
    }
  } catch (err) {
    next(err)
  } finally {
    await req.prisma.disconnect()
  }
}

async function login(req, res, next) {
  try {
    const {password, email} = req.body
    const user = await req.prisma.user.findOne({where: {email}})

    if (!user) {
      return res.status(400).json({message: `No such user found ${email}`})
    }

    const isValidPassword = await compare(password, user.password)

    if (!isValidPassword) {
      return res.status(400).json({message: 'Invalid password'})
    }

    const token = sign({userId: user.id}, SECRET, {expiresIn: '1h'})

    return res.status(200).json({token, user})
  } catch (err) {
    next(err)
  } finally {
    await req.prisma.disconnect()
  }
}

async function userProfile(req, res, next) {
  try {
    const id = parseInt(req.token.userId)

    const user = await req.prisma.user.findOne({
      where: {
        id
      }
    })

    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({message: 'User not found'})
    }
  } catch (err) {
    return next(err)
  } finally {
    await req.prisma.disconnect()
  }
}

module.exports = {
  registerUser,
  getUsers,
  getUser,
  deleteUser,
  login,
  userProfile
}
