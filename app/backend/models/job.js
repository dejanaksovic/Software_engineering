const mongoose = require('mongoose')

const JobSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        required: true,
        enum: ["INPROGRESS", "DONE", "SOON", "STANDBY"]
    },
},
    {
        timestamps: true,
    }
)

const Job = mongoose.model('Job', JobSchema)


module.exports = Job