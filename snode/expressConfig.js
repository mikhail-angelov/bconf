const bodyParser = require('body-parser')
const security = require('./src/security')

module.exports = (app) => {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        next();
    });

    app.use(function (req, res, next) {
        if (req.url === '/login' ||
            req.url === '/logout' ||
            req.url === '/forgotPassword' ||
            req.url === '/signUp') {
            next();
        } else {
            const token = req.headers ? req.headers['x-access-token'] : ''
            const decoded = security.decodeToken(token)
            if (decoded || req.method == 'OPTIONS') {
                req.decoded = decoded
                next()
            } else {
                res.status(401).end()
            }
        }
    });
}