const express = require('express')

const {verifyToken} = require('../middlewares')
const {registerUser, getUser, getUsers, deleteUser, login} = require('../controllers')

const router = express.Router()

router.get('/users/:id', verifyToken, getUser)
router.get('/users', verifyToken, getUsers)
router.post('/users', registerUser)
router.delete('/users/:id', verifyToken, deleteUser)
router.post('/login', login)

module.exports = router
