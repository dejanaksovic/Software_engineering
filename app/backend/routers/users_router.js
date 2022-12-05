const express = require('express')
const router = express.Router()
const {createUser, getAllUsers} = require('../controllers/user_controllers')

//@ users/create
//POST
//Sends a request to create a new user
router.post('/create', createUser)

//@ users/all
//GET
//Send a request to retrieve all users
router.get('/all', getAllUsers)

module.exports = router