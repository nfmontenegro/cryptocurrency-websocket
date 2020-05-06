const express = require('express')

const {verifyToken} = require('../middlewares')
const {createPost, getPosts, getPost} = require('../controllers')

const router = express.Router()

router.get('/posts', verifyToken, getPosts)
router.get('/posts/:id', verifyToken, getPost)
router.post('/posts', verifyToken, createPost)

module.exports = router
