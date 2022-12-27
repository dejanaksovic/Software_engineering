const Business = require('../models/business')
const mongoose = require('mongoose')

//Add new firm
const addBusiness = async (req, res) => {
    const {name, contact} = req.body

    if (!name, !contact) {
        return res.status(400).json({
            message: "Not all nececcesary fields were given",
        })
    }

    const business = await Business.create({
        name,
        contact,
    })

    if(!business) {
        return res.status(500).json({
            message: "Business not created, internal error"
        })
    }

    res.status(201).json({
        message: "Business create succesfully",
    })
}

//Return frim(s) by id
const getBusiness = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id) && id) {
        return res.status(404).json({
            message: "not found",
        })
    }

    if (!id) {
        return res.status(200).json(
            await Business.find()
        )
    }

    const business = await Business.find({
        _id: id
    })

    if(!business) {
        return res.status(404).json({
            message: "business not found"
        })
    }

    res.status(200).json(
        business
    )
}

//Update existsing firm
const updateBusiness = async(req, res) => {
    const {id, name, contact} = req.body

    if(!id) {
        return res.stauts(400).json({
            message: "Not all necessary fields were given",
        })
    }

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: "business not found",
        })
    }

    const businesss = await Business.findByIdAndUpdate(id, {
        name,
        contact,
    })

    if (!businesss) {
        return res.status(404).json({
            message: "Business not found",
        })
    }

    res.status(200).json({
        message: "Business updated succesfully"
    })
}

//Delete business by id
const deleteBusiness = async(req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: "business not found"
        })
    }

    const business = Business.findByIdAndDelete(id)

    if(!business) {
        return res.status(404).json({
            message: "Business not found",
        })
    }

    res.status(200).json({
        message: "Business deleted succesfully"
    })

}

module.exports = {
    addBusiness,
    getBusiness,
    updateBusiness,
    deleteBusiness,
}