const User = require('../models/user')
const {hashPass, checkPass} = require('../middleware/hasing')
const {generateToken, getAuthLevel} = require('../middleware/auth')

const createUser = async (req, res) => {

    let user = await User.findById(req.userid)

    console.log(user)



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

    try {
        user = User.find({'email':email})
    }

    catch(err) {
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

const getAllUsers = async (req, res) => {
    const user = await User.findById(req.userid)

    console.log(user)

    try {
        const users = await User.find()
        res.status(200).json(
            users
        )
    }
    catch(err) {
        res.status(400).json({
            message: "No users found"
        })
    } 
}

const loginUser = async (req, res) => {
    const {email, password} = req.body

    const testUser = await User.find({email})

    if(!testUser) {
        res.status(400).json({
            message: "The user doesn't exist"
        })
        return
    }

    if(await checkPass(password, testUser.password)) {
        res.status(200).json({
            token: await generateToken(testUser.id)
        })

        return
    }

    res.status(400).json({
        message: "The credentials don't match"
    })

}

module.exports = {
    createUser,
    getAllUsers,
    loginUser
}