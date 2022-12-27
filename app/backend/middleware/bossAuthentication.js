const bossAuthentication = (req, res, next) => {
    if(req.user.authority === "USER") {
        return res.status(401).json({
            message: "Authorization rights violated",
        })
    }

    next();
}

module.exports = bossAuthentication