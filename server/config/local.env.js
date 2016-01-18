'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: 'bconf-secret',

  FACEBOOK_ID: '1544725999123244',
  FACEBOOK_SECRET: 'e6a02d01298bf7834bbac1870bad9d97',

  TWITTER_ID: '8toPKTrM3UH016FahpePuEnzJ',
  TWITTER_SECRET: 'secret',

  GOOGLE_ID: '731186579748-kd1sffm7f4l946jksni2fpthl0t5c0q6.apps.googleusercontent.com',
  GOOGLE_SECRET: 'O3XgUbpEhQJGObGqh3430H6_',

  YANDEX_ID:'2cf53b8a8edd49149fe741e41b91d118',
  YANDEX_SECRET:'16cbe4e30c1d43699d476a3f8b660dcf',
  YANDEX_CB:"http://localhost:3000/auth/yandex/callback",
  YANDEX_TRANSLATE_KEY: 'trnsl.1.1.20160117T122108Z.4fc1bc27e80ca0da.ce8ba31433bef21b0d503a7b5530e1960543321f'

};
