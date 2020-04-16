import http from 'http'
import https from 'https'
import express from 'express'
import fs from 'fs'
import {serverOptions} from './config'
import {sockets} from './sockets'

const app = express()
const webPort = serverOptions.listenPort
app.use(express.static(process.env.MINI?'../mini/src':'../web/public'))

let webServer = null
let sslOptions: any = {}
if (serverOptions.useHttps) {
    sslOptions.key = fs.readFileSync(serverOptions.httpsKeyFile).toString()
    sslOptions.cert = fs.readFileSync(serverOptions.httpsCertFile).toString()
  }
if (serverOptions.useHttps) {
  // -- https ---
  webServer = https.createServer(sslOptions, app).listen(webPort, function () {
    console.log('Web server start. https://' + serverOptions.hostName + ':' + webServer.address().port + '/')
  })
} else {
  // --- http ---
  webServer = new http.Server(app).listen(webPort, function () {
    console.log('Web server start. http://' + serverOptions.hostName + ':' + webServer.address().port + '/')
  })
}

sockets(webServer)
