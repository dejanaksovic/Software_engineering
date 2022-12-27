const mongoose = require('mongoose')

const BusinessSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    jobs: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Job',
            }
        ],
    },

    contact: {
        type: String,
        required: true,
    }},

    {
        timestamps: true
    })


module.exports = mongoose.model("Business", BusinessSchema)