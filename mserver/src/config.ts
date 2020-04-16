import * as fs from 'fs'

let httpsKeyFile = './ssl/le-key.pem'
let httpsCertFile = './ssl/le-crt.pem'
let useHttps = fs.existsSync(httpsKeyFile)
export let serverOptions = {
  hostName: 'localhost',
  listenPort: process.env.PORT ? +process.env.PORT : 3000,
  useHttps,
  httpsKeyFile,
  httpsCertFile,
}

export let listenIps =
  process.env.NODE_ENV === 'production'
    ? [{ ip: '0.0.0.0', announcedIp: '195.201.137.198' }]
    : [{ ip: '127.0.0.1', announcedIp: null }]
    
