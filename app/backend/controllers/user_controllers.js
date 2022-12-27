const User = require('../models/user')
const { hashPass, checkPass } = require('../middleware/hasing')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {

    //@use, store user if already exists
    let user = {}
    const { name, password, authority, email } = req.body

    if (!name || !password || !email) {
        return res.status(400).json({
            message: "Not all necessary fields were given",
            name: name,
            password,
            email
        })
    }

    try {
        user = await User.find({ 'email': email })
    }

    catch (err) {
        return res.status(400).json({
            message: "The user with the given email already exists"
        })
    }

    let hashedPass = ""

    try {
        hashedPass = await hashPass(password)
    }
    catch (err) {
        return res.status(500).json({
            message: err,
        })
    }

    user = await User.create({
        name,
        password: hashedPass,
        email,
        authority,
    })

    if (!user) {
        return message.status(500).json({ message: "User was not created, internal error" })
    }

    res.status(201).json({
        message: "User was successfully created",
        token: jwt.sign({user})
    })
}

const getUsers = async (req, res) => {

    const { email } = req.params

    if (!email) {
        const users = await User.find()
        return res.status(200).json(
            users
        )
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({ message: "User does not exist" })
    }

    res.status(200).json({
        user
    })

}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        res.status(400).json({
            message: "The user doesn't exist"
        })
        return
    }

    if (await checkPass(password, user.password)) {
        res.status(200).json({
            token: jwt.sign({ user }, process.env.SECRET_STRING)
        })

        return
    }

    res.status(400).json({
        message: "The credentials don't match"
    })

}

const updateUser = async (req, res) => {
    const {name, email} = req.body
    console.log("Inside update")
    let user = await User.findOneAndUpdate({email}, {
        name,
    })

    if(!user) {
        return res.status(401).send({message: "user not found"})
    }

    return res.status(200).json({
        message: "User update succesfully"
    })

}

module.exports = {
    createUser,
    getUsers,
    loginUser,
    updateUser,
}