const mongoose = require('mongoose')
const Business = mongoose.model("Business", BusinessSchema)

const BusinessSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true,
    }},
    {
        timestamps: true
    })


module.exports = mongoose.model("Business", BusinessSchema)