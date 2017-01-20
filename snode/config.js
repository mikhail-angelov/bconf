module.exports = {
    port: process.env.PORT || 9000,
    peerServerPort: process.env.PEER_PORT || 9001,
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
        clientID: process.env.YANDEX_ID || '2cf53b8a8edd49149fe741e41b91d118',
        clientSecret: process.env.YANDEX_SECRET || '16cbe4e30c1d43699d476a3f8b660dcf',
        callbackURL: (process.env.DOMAIN || '') + '/auth/yandex/callback',
        translationKey: (process.env.YANDEX_TRANSLATE_KEY) || 'tr-key'
    }
}