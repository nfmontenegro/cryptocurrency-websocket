const express = require('express')
const {registerUser, getUser, getUsers, deleteUser} = require('../controllers')

const router = express.Router()

router.get('/user', getUser)
router.get('/users', getUsers)
router.post('/user', registerUser)
router.delete('/user', deleteUser)

module.exports = router
