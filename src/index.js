const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const {PrismaClient} = require('@prisma/client')

require('dotenv').config()

const {APP_BASE_URL, PORT} = require('./config')
const {userRouter} = require('./routes')

const app = express()
const prisma = new PrismaClient()

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('short'))

app.use((req, res, next) => {
  req.prisma = prisma
  next()
})

app.use((err, req, res, next) => {
  if (err) {
    return res.status(401).json({message: err.message})
  }
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

const HOST_SERVER = process.env.APP_BASE_URL || 'now.sh'

app.listen(8080, () => console.log(`Server is running in: ${HOST_SERVER}`))
