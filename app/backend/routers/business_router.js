const express = require('express')
const router = express.Router()
const {tokenRequirement} = require('../middleware/auth')
const adminAuthentication = require('../middleware/adminAuthentication')
const bossAuthentication = require('../middleware/bossAuthentication')
const {addBusiness, getBusiness, updateBusiness, deleteBusiness} = require('../controllers/buisness_controllers')

// @POST
// Adds a new business
// Private [ADMIN, BOSS]
router.post('/', tokenRequirement, adminAuthentication, addBusiness)

// @GET
// Gets all businesses if not given an id to seach for one
// Private [ADMIN, BOSS]
router.get('/:id?', tokenRequirement, bossAuthentication, getBusiness)

// @PATCH
// Patches name or contact of a busniess
// Private [ADMIN, BOSS]
router.patch('/', tokenRequirement, bossAuthentication, updateBusiness)

// @DELETE
// Deletes a firm and all associate jobs with it
// Private [ADMIN, BOSS]
router.delete('/id', tokenRequirement, bossAuthentication, deleteBusiness)

module.exports = router