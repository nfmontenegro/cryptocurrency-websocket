const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const {prisma} = require('../generated/prisma-client')

require('dotenv').config()

const {APP_BASE_URL, PORT} = require('./config')
const {userRouter} = require('./routes')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('short'))

app.use((req, res, next) => {
  req.prisma = prisma
  next()
})

app.use('/api/v1', userRouter)

app.get('/', (req, res) => {
  res.json({
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  })
})

app.listen(PORT, () => console.log(`Server is running in: ${process.env.APP_BASE_URL}`))
