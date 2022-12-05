const mongoose = require('mongoose')

const JobSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["PPO", "OPPA", "PPU"]
    },

    price: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        required: true,
        enum: ["IN_PROGRESS", "DONE", "SOON"]
    },

    businessid: {
        type: mongoose.Types.ObjectId,
        required: true,
    }

},
    {
        timestamps: true,
    }
)

const Job = mongoose.model('Job', JobSchema)


module.exports = Job