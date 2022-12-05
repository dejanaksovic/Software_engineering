const express = require('express')
const mongoose = require('mongoose')
const Connect = require('./config/db')
require('dotenv').config()

Connect()

const connString = process.env.MONGO_STRING
const PORT = process.env.PORT

const app = express()
app.use(express.json())


app.listen(PORT, () => {
    console.log(`This does indeed work! Running on port ${PORT}`)
})


