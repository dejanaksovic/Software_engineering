const jtw = require('jsonwebtoken')
const user = require('../models/user')

const getAuthLevel = (req, res, next) => {
    //Check if the autorization exists
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(" ")[1]
            let decoded = ""
            try {
                decoded = jtw.verify(token, process.env.SECRET_STRING)
            }
            catch(err) {
                res.status(401).json({
                    message: `Autorization error, invalid token`
                })
            }
            req.user = decoded.testUser
            next()
    }

}

module.exports = {
    getAuthLevel
}