module.exports = {
    facebook: {
        clientID: process.env.FACEBOOK_ID || 'id',
        clientSecret: process.env.FACEBOOK_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/facebook/callback'
    },

    twitter: {
        clientID: process.env.TWITTER_ID || 'id',
        clientSecret: process.env.TWITTER_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/twitter/callback'
    },

    google: {
        clientID: process.env.GOOGLE_ID || 'id',
        clientSecret: process.env.GOOGLE_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/google/callback'
    },

    yandex: {
        clientID: process.env.YANDEX_ID || 'id',
        clientSecret: process.env.YANDEX_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/yandex/callback',
        translationKey: (process.env.YANDEX_TRANSLATE_KEY) || 'tr-key'
    }
}