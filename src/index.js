const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const {PrismaClient} = require('@prisma/client')

dotenv.config()

const {APP_BASE_URL, PORT} = require('./config')
const {userRouter, postRouter} = require('./routes')

const app = express()
const prisma = new PrismaClient({
  log: ['info', 'warn', 'query'],
  errorFormat: 'pretty'
})

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
app.use('/api/v1', postRouter)

app.get('/', (req, res) => {
  res.json({
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  })
})

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  console.log('Listening on ' + bind)
}

app.listen(PORT, () => console.log(`Server is running in: ${process.env.APP_BASE_URL}`))

app.on('error', onError)
app.on('listening', onListening)
