const jwt = require('jsonwebtoken')
const SECRET = process.env.AUTH_SECRET || 'test-test'

module.exports = {
    encodeToken,
    decodeToken,
    encodePassword,
    validatePassword,
    authRequired
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
    return encodePassword(password) == encodedPassword
}

function authRequired(req, res, next){
    const token = req.headers ? req.headers['x-access-token'] : ''
    const decoded = decodeToken(token)
    if (decoded) {
        req.decoded = decoded
        next()
    } else {
        res.status(401).end()
    }
}