const { compareSync, hashSync } = require('bcrypt-nodejs')
const { sign, decode } = require('jsonwebtoken')
const _ = require('lodash')
const shortid = require('shortid')
const database = require('./db')
const { uploadUrl } = require('./uploader')
const secret = 'todo: move to secrete'
const USERS = 'users'
const admin = require('firebase-admin')

async function initializeFirebaseAdminApp(accountKey, dbName) {
    try {
        const parsedAccountKey = JSON.parse(accountKey)

        if (!dbName || !parsedAccountKey) {
            console.log("Firebase admin app hasn't been initialized, an error occured")
            trow("Firebase admin app hasn't been initialized, an error occured")
        }

        await admin.initializeApp({
            credential: admin.credential.cert(parsedAccountKey),
            databaseURL: dbName,
        })
    } catch (e) {
        console.log("Firebase admin app hasn't been initialized, an error occured", e)
    }
}

function generateToken(user) {
    const { _id, name, email } = user
    return sign(
        {
            exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60,
            _id,
            name,
            email,
        },
        secret
    )
}

function decodeToken(token) {
    return decode(token, secret)
}

function generatePasswordHash(password) {
    return hashSync(password)
}

function checkPassword(candidate, hash) {
    return compareSync(hash, candidate)
}

function userInfo({ _id, name, email, srcAvatar, firebaseMsgToken }) {
    return { _id, name, email, srcAvatar, firebaseMsgToken }
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

async function createUser({ email, name, password, srcAvatar, profile }) {
    if (!email || !name || !password) {
        return Promise.reject('invalid params')
    }
    const db = await database.db()
    const response = await db.collection(USERS).insertOne({
        _id: shortid.generate(),
        email,
        name,
        srcAvatar,
        profile,
        password: generatePasswordHash(password),
    })
    const userId = _.get(response, 'insertedId')
    if (!userId) {
        return Promise.reject('invalid params')
    }

    await createUserInFirebase({ userId, email, name, srcAvatar, profile })

    return await db.collection(USERS).findOne({ _id: userId })
}

async function createUserInFirebase({ userId, email, name, srcAvatar, profile }) {
    try {
        const firebaseUser = await admin.auth().createUser({ id: userId, email, name, srcAvatar, profile })
        const firebaseUserUid = _.get(firebaseUser, 'uid')
        await updateUser(userId, { firebaseUserUid })
    } catch (e) {
        console.log('Error creating user in firebase', e)
    }
}

async function register({ email, name, password }) {
    const user = await createUser({ email, name, password, profile: null })
    return { token: generateToken(user), user: userInfo(user) }
}

async function updateUser(userId, request) {
    try {
        const updateRequest = _.pick(request, ['firebaseMsgToken', 'name', 'email', 'srcAvatar', 'firebaseUserUid'])
        const db = await database.db()
        await db.collection(USERS).updateOne({ _id: userId }, { $set: updateRequest })
        const updatedUser = await db.collection(USERS).findOne({ _id: userId })
        return { user: userInfo(updatedUser) }
    } catch (e) {
        console.log('user update error', e)
        return Promise.reject('user update error')
    }
}

async function check(token) {
    if (!token) {
        return Promise.reject('invalid token')
    }
    const decoded = decodeToken(token)
    console.log('decoded:', decoded)
    const userId = decoded._id
    if (!userId) {
        return Promise.reject('invalid token')
    }
    const db = await database.db()
    const user = await db.collection(USERS).findOne({ _id: userId }) //todo: update it
    return { token: generateToken(user), user: userInfo(user) }
}

async function findUsers({ user, text }) {
    if (!text) {
        return Promise.reject('invalid token')
    }
    const db = await database.db()
    const users = await db
        .collection(USERS)
        .find({ name: { $regex: text, $options: 'i' } })
        .toArray()
    const results = _.filter(users, item => item._id !== user._id)
    return results
}

async function createNewUserFromProviderData(profile) {
    if (profile.providerId === 'firebase') {
        const srcAvatar = await uploadUrl(profile.photoURL)
        return createUser({
            email: profile.email,
            name: profile.displayName,
            password: profile.uid,
            srcAvatar,
            profile,
        })
    } else {
        //todo add other providers
        return Promise.reject('unknown provider')
    }
}

async function loginViaProvider(profile) {
    if (!_.isObject(profile)) {
        return Promise.reject('invalid profile: ', JSON.stringify(profile))
    }
    const email = (_.get(profile, 'email') || _.get(profile, 'uid', '')).toLowerCase()
    const db = await database.db()
    const user = await db.collection(USERS).findOne({ email })
    if (user) {
        //todo: check provider data
        return { token: generateToken(user), user: userInfo(user) }
    } else {
        const newUser = await createNewUserFromProviderData({ ...profile, email })
        return { token: generateToken(newUser), user: userInfo(newUser) }
    }
}

module.exports = {
    login,
    register,
    check,
    decodeToken,
    findUsers,
    loginViaProvider,
    updateUser,
    initializeFirebaseAdminApp,
}
