const express = require('express')

const {verifyToken} = require('../middlewares')
const {createPost} = require('../controllers')

const router = express.Router()

router.post('/posts', verifyToken, createPost)

module.exports = router
