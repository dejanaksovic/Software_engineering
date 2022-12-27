const express = require('express')
const router = express.Router()
const {tokenRequirement} = require('../middleware/auth')
const adminAuthentication = require('../middleware/adminAuthentication')
const bossAuthentication = require('../middleware/bossAuthentication')

// @POST router
// add a new router
// Private ["ADMIN"]
router.post('/', tokenRequirement, adminAuthentication, )