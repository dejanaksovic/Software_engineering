const express = require('express')
const router = express.Router()
const {createUser, getUsers, loginUser, updateUser, deleteUser} = require('../controllers/user_controllers')
const { tokenRequirement } = require('../middleware/auth')
const adminAuthentication = require('../middleware/adminAuthentication')
const bossAuthentication = require('../middleware/bossAuthentication')

// Sends a request to create a user
// @POST /users
// PRIVATE [ADMIN]
router.post('/',tokenRequirement, adminAuthentication, createUser)

// Sends a request to retrive all users
// @GET users/?{email}
// PRIVATE [ADMIN, BOSS]
router.get('/:email?', tokenRequirement, bossAuthentication, getUsers)

// Sends a login request for the return of a json web token
// @POST /login
// Access public
router.post('/login', loginUser)

// Sends a request to update the user
// @PUT /users
// Private [ADMIN]
router.patch('/', tokenRequirement, adminAuthentication, updateUser)

// Sends a request to delete a user by id
// @DELETE /users
// Private [ADMIN]
router.delete('/:id', tokenRequirement, adminAuthentication, deleteUser)

module.exports = router