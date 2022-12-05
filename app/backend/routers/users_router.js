const express = require('express')
const router = express.Router()
const {createUser} = require('../controllers/user_controllers')

//@ users/create
//POST
//Sends a request to create a new user
router.post('/create', createUser)

module.exports = router