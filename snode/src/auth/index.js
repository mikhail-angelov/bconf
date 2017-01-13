'use strict';

const router = require('express').Router()
const authService = require('./auth.service')

module.exports = (dao, config) => {

    const auth = authService(dao)

    // Passport Configuration
    require('./local/passport')(auth)
    // require('./facebook/passport').setup(auth, config);
    // require('./google/passport').setup(auth, config);
    // require('./twitter/passport').setup(auth, config);
    require('./yandex/passport')(auth, config.yandex)

    router.use('/local', require('./local')(auth))
    // router.use('/facebook', require('./facebook')(auth));
    // router.use('/twitter', require('./twitter')(auth));
    // router.use('/google', require('./google')(auth));
    router.use('/yandex', require('./yandex')(auth))

    return router
}
