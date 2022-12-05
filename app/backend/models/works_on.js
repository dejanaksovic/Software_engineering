const mongoose = require('mongoose')

const WorkDoneSchema = mongoose.Schema({
    userid : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    jobid : {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    }},
    {
    timestamps: true,
})

module.exports = mongoose.model("WorkDone", WorkDoneSchema)