const User = require('../models/user')
const {hashPass, checkPass} = require('../middleware/hasing')

const createUser = async (req, res) => {
    const {name, password, authority, email} = req.body

    if(!name || !password || !email) {
        res.status(400).json({
            message: "Not all necessary fields were given",
            name: name,
            password,
            email
        })

        return
    }

    let user = await User.find({email})

    if(user) {
        res.status(400).json({
            message: "The user already exists"
        })
        return
    }

    let hashedPass = ""

    try {
    hashedPass = await hashPass(password)
    }
    catch(err) {
        res.status(500).json({
            message:err,
        })
        return
    }

    user = await User.create({
        name,
        password: hashedPass,
        email,
        authority,})

    if(user) {
        res.status(201).json({message: "User was created successfully"})
    }
}

module.exports = {
    createUser
}