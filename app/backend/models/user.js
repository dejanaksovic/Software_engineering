const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    authority: {
        type: String,
        required: true,
        enum: ["ADMIN", "USER", "BOSS"],
        default: "USER"
    },

    email: {
        type: String,
        unique: true,
    }

},
    {
        timestamps: true,
    })

module.exports = mongoose.model("User", UserSchema)