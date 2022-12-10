//Custom functions for manipulating bcrypt (hashing and dehashing)
const bcrypt = require('bcrypt')

const hashPass = async (pass) => {
    try { 

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(pass, salt)

    return hashedPass 

} catch(err) {
    return err
}

}

//TO THINK: Maybe this function isn't necessary, one line of code either way
const checkPass = async (pass, hashedPass) => {

    let isRight = true

    try {

        isRight = await bcrypt.compare(pass, hashedPass)
        return isRight

    } catch(err) {

        return false

    }
}

module.exports = {
    hashPass,
    checkPass
}