const express = require('express')
const router = express.Router()
const {createUser, getUsers, loginUser} = require('../controllers/user_controllers')
const { getAuthLevel } = require('../middleware/auth')

// Sends a request to create a user
// @POST /users/create
// PRIVATE [ADMIN]
router.post('/create/',getAuthLevel, createUser)

// Sends a request to retrive all users
// @GET users/all/?{email}
// PRIVATE [ADMIN, BOSS]
router.get('/:email?',getAuthLevel, getUsers)

// Sends a login request for the return of a json web token
// @POST /users/login
// Access public
router.post('/login', loginUser)

module.exports = router