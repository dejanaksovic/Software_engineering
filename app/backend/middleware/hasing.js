//Custom functions for manipulating bcrypt (hashing and dehashing)
const bcrypt = require('bcrypt')

const hashPass = async (pass) => {
    try { 

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(pass, salt)

    return hashedPass 

}catch(err) {
    return err
}

}

//TO THINK: Maybe this function isn't necessary, one line of code either way
const checkPass = async (pass, hashedPass) => {

    try {

        const isRight = await bcrypt.compare(pass, hashedPass)

    }catch(err) {

        return err

    }
    return isRight
}

module.exports = {
    hashPass,
    checkPass
}