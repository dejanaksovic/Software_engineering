const mongoose = require('mongoose')

const connectDb = async () => {
    try {
    console.log("Connected to db")
    const conn = await mongoose.connect(process.env.MONGO_STRING)
    return conn
    }

    catch(err) {
        return ({message: `Error connecting with database ${err}`})
    }
}

module.exports = connectDb