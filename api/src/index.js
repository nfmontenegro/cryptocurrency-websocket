const express = require('express')
const bodyParser = require('body-parser')

const { userRouter } = require('./routes')

const app = express()
app.use(bodyParser.json())

app.use('/api', userRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`))
