const express = require('express')
const bodyParser = require('body-parser')

module.exports = (app) => {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/',express.static(__dirname+'/../dist'));

    //cors
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        next();
    });
}