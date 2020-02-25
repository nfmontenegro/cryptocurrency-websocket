const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

require('dotenv').config()

const {APP_BASE_URL, PORT} = require('./config')
const {userRouter} = require('./routes')

const app = express()

app.use(bodyParser.json())
app.use(morgan('short'))

app.use('/api/v1', userRouter)

app.get('/', (req, res) => {
  res.json({
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  })
})

app.listen(PORT, () => console.log(`Server is running in: ${process.env.APP_BASE_URL}`))
