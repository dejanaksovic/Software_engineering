const jwt = require('jsonwebtoken')

const tokenRequirement = (req, res, next) => {
    //Check if the autorization exists
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        return res.status(401).send({message: "Authorization failed, no token"})
    }

    const token = req.headers.authorization.split(" ")[1]
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.SECRET_STRING)
    }
    catch(err) {
        return res.status(401).send({message: `Authorization failed, invalid token ${err}`})
    }

    req.user = decodedToken.user

    next()

}


module.exports = {
    tokenRequirement
}