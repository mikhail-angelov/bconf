const { compareSync, hashSync } = require('bcrypt')
const { sign, decode } = require('jsonwebtoken')
const _ = require('lodash')
const database = require('./db')
const secret = 'todo: move to secrete'
const USERS = 'users'

function generateToken(user) {
  const { _id, name, email } = user
  return sign({
    exp: Math.floor(Date.now() / 1000) + (8 * 60 * 60),
    _id, name, email,
  }, secret)
}

function checkToken(token) {
  return decode(token, secret)
}

function generatePasswordHash(password) {
  return hashSync(password, 2)
}

function checkPassword(candidate, hash) {
  return compareSync(hash, candidate)
}

function userInfo(user) {
  const { _id, name, email } = user
  return { _id, name, email }
}

async function login(credentials) {
  const { email, password } = credentials
  if (!email || !password) {
    return Promise.reject('invalid params')
  }
  const db = await database.db()
  const user = await db.collection(USERS).findOne({ email })
  if (!user) {
    return Promise.reject('invalid params')
  }
  if (checkPassword(user.password, password)) {
    return { token: generateToken(user), user: userInfo(user) }
  } else {
    return Promise.reject('invalid username or password')
  }
}

async function register(request) {
  const { email, name, password } = request
  if (!email || !name || !password) {
    return Promise.reject('invalid params')
  }
  const db = await database.db()
  const response = await db.collection(USERS).insertOne({
    email, name, password: generatePasswordHash(password)
  })
  const userId = _.get(response, 'insertedId')
  if (!userId) {
    return Promise.reject('invalid params')
  }
  const user = await db.collection(USERS).findOne({ _id: userId })
  return { token: generateToken(user), user: userInfo(user) }
}

async function check(token) {
  if (!token) {
    return Promise.reject('invalid token')
  }
  const userId = _.get(checkToken(token), '_id')
  if (!userId) {
    return Promise.reject('invalid token')
  }
  const db = await database.db()
  const user = await db.collection(USERS).findOne({ _id: userId })
  return { token: generateToken(user), user: userInfo(user) }
}

module.exports = {
  login,
  register,
  check,
}
