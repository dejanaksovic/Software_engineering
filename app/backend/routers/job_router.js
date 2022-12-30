const express = require('express')
const router = express.Router()
const {tokenRequirement} = require('../middleware/auth')
const bossAuthentication = require('../middleware/bossAuthentication')
const {addJob, getJob, updateJob, deleteJob} = require('../controllers/job_controllers')

// @POST /jobs
// add a new job
// Private ["ADMIN", "BOSS"]
router.post('/', tokenRequirement, bossAuthentication, addJob)

// @GET jobs/{id?}
// gets a job specified by id or if none is specified returns all
// Public
router.get('/:id?', tokenRequirement, getJob)

// @PATCH jobs
// updates the jobs price, type or status
// Private["ADMIN", "BOSS"]
router.patch('/', tokenRequirement, bossAuthentication, updateJob)

// @DELETE job/id
// deletes a job with specified id
// Private["ADMIN", "BOSS"]
router.delete('/:id', tokenRequirement, bossAuthentication, deleteJob)

module.exports = router