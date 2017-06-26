'use strict'

const mongoUnit = require('mongo-unit')
const dao = require('./dao')

before(() => mongoUnit.start().then(mongoUrl => dao.init({
  url: mongoUrl
})))
