// Importing Node modules and initializing Express
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
const winston = require('winston')
const routers = require('./routers')
const config = require('./config')

const app = express()

if (mongoose.connection.readyState === 0) {
  mongoose.connect(config.mongoUrl)
}
mongoose.set('debug', function (collectionName, method, query) {
  winston.debug('MONGO COLLECTION: %s METHOD: %s QUERY: %s', collectionName, method, JSON.stringify(query))
})

process.on('uncaughtException', err => {
  // handle the error safely
  winston.error('global uncaughtException', err)
  winston.error('--------------------exception-')
  winston.error('--------------------exception-')
  winston.error('--------------------exception-')
  //temporaly do not reset node app on exception process.exit(1)
})
winston.remove(winston.transports.Console)
winston.add(winston.transports.Console, {'timestamp': true, level: config.loggerDebugLevel})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const httpLogger = {
  stream: {
    write: (message) => winston.info(message)
  }
}
app.use(morgan(':method :url :status :res[content-length] :response-time ms', httpLogger))
app.use('/api', routers)
app.use(express.static(path.join(__dirname, '../dist/')))
app.get('/*', (req, res) => {
  res.sendFile(uiPath + 'index.html')
})

app.listen(config.port, ()=>{
  winston.info(`Your server is running on port ${config.port}.`)
})
