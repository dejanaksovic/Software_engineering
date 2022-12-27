const express = require('express')
const mongoose = require('mongoose')
const Connect = require('./config/db')
require('dotenv').config()

const userRouter = require('./routers/users_router')

Connect()

const connString = process.env.MONGO_STRING
const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded()) 

app.use('/users', userRouter)

app.listen(PORT, () => {
    console.log(`This does indeed work! Running on port ${PORT}`)
})


