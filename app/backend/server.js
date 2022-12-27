const express = require('express')
const Connect = require('./config/db')
require('dotenv').config()

const userRouter = require('./routers/users_router')
const businessRouter = require('./routers/business_router')

Connect()

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded()) 

app.use('/users', userRouter)
app.use('/business', businessRouter)

app.listen(PORT, () => {
    console.log(`This does indeed work! Running on port ${PORT}`)
})


