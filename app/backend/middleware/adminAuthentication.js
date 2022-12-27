const adminAuthentication = (req, res, next) => {
    if(req.user.authority !== "ADMIN" ) {
        return res.status(401).json({
            message: "This actin requires ADMIN permissions",
        })
    }

    next();
}

module.exports = adminAuthentication