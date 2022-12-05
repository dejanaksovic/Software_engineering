const jtw = require('jsonwebtoken')
const user = require('../models/user')

const generateToken = async (userID) => {
    const token = jtw.sign({ userID },
        process.env.SECRET_STRING, {
        expiresIn: '1h'
    })
    return token
}

const getAuthLevel = async (req, res, next) => {
    let token

    //Check if the autorization exists
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(" ")[1]
            const decoded = await jtw.verify(token, process.env.SECRET_STRING)
            req.userid = decoded.userID
            console.log("Works until pre next")
            next()
            console.log("Next is executed")
    }

    if (!token) {
        res.status(401).json({
            message: "User not authorized, no token"
        })
    }

}

module.exports = {
    generateToken,
    getAuthLevel
}