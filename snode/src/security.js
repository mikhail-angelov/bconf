const jwt = require('jsonwebtoken')
const SECRET = process.env.AUTH_SECRET || 'test-test'

module.exports = {
    encodeToken,
    decodeToken,
    encodePassword,
    validatePassword
}

function encodeToken(data) {
    return jwt.sign(data, SECRET, { expiresIn: '5d' })
}

function decodeToken(token) {
    try {
        return jwt.verify(token, SECRET)
    } catch (e) {
        return null
    }
}

function encodePassword(password){
    return password
}

function validatePassword(password, encodedPassword){
    return password == encodedPassword
}