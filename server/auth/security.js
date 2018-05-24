const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const SALT_FACTOR = 5

function verifyPassword(user, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, correct) => {
      if (err) {
        reject(err)
      } else {
        resolve({user, correct})
      }
    })
  })
}

function encodePassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
      if (err) {
        reject(err)
      } else {
        bcrypt.hash(password, salt, null, (err, hash) => {
          if (err) {
            reject(err)
          } else {
            resolve(hash)
          }
        })
      }
    })
  })
}

function generateToken(user) {
  return jwt.sign({ id: user._id, name: user.name }, config.authToken, {
    expiresIn: '8h'
  })
}

module.exports = {
  verifyPassword,
  encodePassword,
  generateToken,
}