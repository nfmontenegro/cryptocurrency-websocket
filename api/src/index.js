const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()

const {APP_BASE_URL, PORT} = require('./config')
const {userRouter} = require('./routes')

const app = express()

app.use(bodyParser.json())

app.use('/api/v1', userRouter)

app.listen(PORT, () => console.log(`Server is running in: ${process.env.APP_BASE_URL}`))
