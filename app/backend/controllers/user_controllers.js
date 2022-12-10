const User = require('../models/user')
const { hashPass, checkPass } = require('../middleware/hasing')
const jtw = require('jsonwebtoken')

const createUser = async (req, res) => {

    //@use, store user if already exists
    let user = {}
    console.log(req.user)

    if (req.user.authority !== "ADMIN") {
        res.status(401).json({ message: "Validation failed, user is not an Admin" })
        return
    }

    const { name, password, authority, email } = req.body

    if (!name || !password || !email) {
        res.status(400).json({
            message: "Not all necessary fields were given",
            name: name,
            password,
            email
        })

        return
    }

    try {
        user = await User.find({ 'email': email })
    }

    catch (err) {
        res.status(400).json({
            message: "The user with the given email already exists"
        })
        return
    }

    let hashedPass = ""

    try {
        hashedPass = await hashPass(password)
    }
    catch (err) {
        res.status(500).json({
            message: err,
        })
        return
    }

    user = await User.create({
        name,
        password: hashedPass,
        email,
        authority,
    })

    if (user) {
        res.status(201).json({
            message: "User was created successfully",
            token: jtw.sign({ user }, process.env.SECRET_STRING)
        })
        return
    }

    message.status(500).json({ message: "User was not created, internal error" })
}

const getUsers = async (req, res) => {

    const {email} = req.params

    if (req.user.authority === "USER") {
        res.status(401).json({
            message:
                "Request denied, user is not admin or boss"
        })
        return
    }

    if (!email) {
        const users = await User.find()
        res.status(200).json(
            users
        )
        return
    }

    const user = await User.findOne({ email })

    if (user) {
        res.status(200).json(
            user 
        )
        return
    }

    res.status(400).json({ message: "User does not exist" })

}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    const testUser = await User.findOne({ email })

    console.log(email, password)

    if (!testUser) {
        res.status(400).json({
            message: "The user doesn't exist"
        })
        return
    }

    if (await checkPass(password, testUser.password)) {
        res.status(200).json({
            token: jtw.sign({ testUser }, process.env.SECRET_STRING)
        })

        return
    }

    res.status(400).json({
        message: "The credentials don't match"
    })

}

module.exports = {
    createUser,
    getUsers,
    loginUser
}