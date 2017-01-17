'use strict';

const router = require('express').Router()
const authService = require('./auth.service')

const local = require('./local')
const facebook = require('./facebook')
const twitter = require('./twitter')
const google = require('./google')
const yandex = require('./yandex')

module.exports = (dao, config) => {

    const auth = authService(dao)
    router.use('/local', local(auth).router)
    router.use('/facebook', facebook(auth, config.facebook).router);
    router.use('/twitter', twitter(auth, config.twitter).router);
    router.use('/google', google(auth, config.google).router);
    router.use('/yandex', yandex(auth, config.yandex).router)

    return router
}
