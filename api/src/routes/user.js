const express = require('express')
const {registerUser, getUser, getUsers, deleteUser, login} = require('../controllers')

const router = express.Router()

router.get('/users/:id', getUser)
router.get('/users', getUsers)
router.post('/users', registerUser)
router.delete('/users/:id', deleteUser)
router.post('/login', login)

module.exports = router
