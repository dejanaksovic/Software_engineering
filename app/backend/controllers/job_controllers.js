const Job = require('../models/job')
const Business = require('../models/business')
const mongoose = require('mongoose')

const addJob = async (req, res) => {
    const { type, price, status, businessId } = req.body

    if (!type, !businessId) {
        return res.status(400).json({
            message: "Not all necessary fields were given"
        })
    }

    if (!["IN_PROGRESS", "DONE", "SOON", "STAND_BY"].includes(status)) {
        return res.status(400).json({
            message: "Invalid status"
        })
    }

    if (!mongoose.Types.ObjectId.isValid(businessId)) {
        return res.status(404).json({
            message: "Invalid business"
        })
    }

    const business = await Business.findById(businessId)

    if (!business) {
        return res.status(404).json({
            message: "Business with given id not found"
        })
    }

    const job = await Job.create({
        type,
        price,
        status,
    })

    if (!job) {
        return res.status(500).json({
            message: "Something went wrong with creating a job, if this continues contact the administrator"
        })
    }

    business.jobs.push(job._id)

    await business.save()

    res.status(200).json({
        message: `The job has been succesfully created ${job}`
    })
}

const getJob = async (req, res) => {
    const { id } = req.params

    if (!id) {
        const jobs = await Job.find()

        if (!jobs) {
            return res.status(400).json({
                message: "There is no jobs"
            })
        }

        return res.status(200).json(
            jobs
        )
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: "Job with that id does not exist"
        })
    }

    const job = await Job.findById(id)

    if (!job) {
        return res.status(404).json({
            message: "Job with given id not found"
        })
    }

    return res.status(200).json(job)

}

const updateJob = async (req, res) => {
    const { type, status, price, id } = req.body

    if (!type && !status && !price) {
        return res.status(400).json({
            message: "Not any field was given"
        })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: "job not found",
        })
    }

    const job = await Job.findByIdAndUpdate(id, {
        type,
        status,
        price
    })

    if (!job) {
        return res.status(404).json({
            message: "Job not found"
        })
    }

    return res.status(200).json({
        message: `Job ${job} sucessfully updated`
    })
}

const deleteJob = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: "job not found"
        });
    }

    const job = await Job.findByIdAndDelete(id);

    if(!job) {
        return res.status(404).json({
            message: "Job not found"
        })
    }

    return res.status(200).json({
        message: `Job ${job} succesfully deleted`,
    })
}

module.exports = {
    addJob,
    getJob,
    updateJob,
    deleteJob
}