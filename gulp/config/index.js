'use strict';

module.exports = {
  client: {
    source: ['ui/**/*.{html,css,ico}', '!**/app/**'],
    destination: 'dist/ui',
    app: ['ui/**/*.js'],
    indexHtml: 'ui/index.html'
  },
  server: {
    source: ['server/**/*.{js,json}', '!server/**/*.spec.*'],
    destination: 'dist/server'
  },
  general: {
    source: ['package.json', 'Procfile'],
    destination: 'dist'
  },
  liveReload: {
    port: 35729
  },
  build: {
    destination: 'dist'
  }
};
