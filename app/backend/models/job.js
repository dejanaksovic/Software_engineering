const mongoose = require('mongoose')

const JobSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        default: 4000,
    },

    status: {
        type: String,
        required: true,
        enum: ["IN_PROGRESS", "DONE", "SOON", "STAND_BY"],
        default: "IN_PROGRESS"
    },
},
    {
        timestamps: true,
    }
)

const Job = mongoose.model('Job', JobSchema)


module.exports = Job