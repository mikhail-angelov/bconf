const micro = require('micro')
const { router, get, post, put } = require('microrouter')
const cors = require('micro-cors')({ allowMethods: ['GET', 'POST', 'PUT'] })
const fs = require('fs')
const path = require('path')
const { upload } = require('micro-upload')
const auth = require('./auth')
const chat = require('./chat')
const uploader = require('./uploader')
const _ = require('lodash')

const document = path.join(__dirname, 'main.html')
const html = fs.readFileSync(document)

const server = micro(
  cors(
    router(
      post('/api/auth/login', async (req, res) => {
        try {
          const body = await micro.json(req)
          const response = await auth.login(body)
          micro.send(res, 200, response)
        } catch (e) {
          console.error('login error: ', e)
          micro.send(res, 400, { error: 'incorrect password' })
        }
      }),
      post('/api/auth/check', async (req, res) => {
        try {
          const token = req.headers['authorization']
          const response = await auth.check(token)
          micro.send(res, 200, response)
        } catch (e) {
          console.error('check error: ', e)
          micro.send(res, 400, { error: 'incorrect token' })
        }
      }),
      post('/api/auth/register', async (req, res) => {
        try {
          const body = await micro.json(req)
          const response = await auth.register(body)
          micro.send(res, 200, response)
        } catch (e) {
          console.error('register error: ', e)
          micro.send(res, 400, { error: 'incorrect params' })
        }
      }),
      post('/api/auth/login-profile', async (req, res) => {
        try {
          const body = await micro.json(req)
          const response = await auth.loginViaProvider(body)
          micro.send(res, 200, response)
        } catch (e) {
          console.error('login error: ', e)
          micro.send(res, 400, { error: 'incorrect password' })
        }
      }),
      post('/api/auth/updateUser', async (req, res) => {
        try {
          const token = req.headers['authorization']
          const user = auth.decodeToken(token)
          const body = await micro.json(req)
          const response = await auth.updateUser(user._id, body)
          micro.send(res, 200, response)
        } catch (e) {
          console.error('updateUser error: ', e)
          micro.send(res, 400, { error: 'incorrect params' })
        }
      }),
      post('/api/auth/forget-password', (req, res) => {
        micro.send(res, 200, { status: 'new password is sent to your email' })
      }),
      get('/api/users/search/:text', async (req, res) => {
        try {
          const token = req.headers['authorization']
          const user = auth.decodeToken(token)
          const response = await auth.findUsers({ user, text: req.params.text })
          micro.send(res, 200, response)
        } catch (e) {
          console.error('search error: ', e)
          micro.send(res, 400, { error: 'incorrect params' })
        }
      }),
      get('/api/chat', async (req, res) => {
        try {
          const token = req.headers['authorization']
          const user = auth.decodeToken(token)
          const response = await chat.getChats(user)
          micro.send(res, 200, response)
        } catch (e) {
          console.error('get chats error: ', e)
          micro.send(res, 400, { error: 'get chats error' })
        }
      }),
      get('/api/chat/:chatId', async (req, res) => {
        try {
          const token = req.headers['authorization']
          const user = auth.decodeToken(token)
          const response = await chat.getChat(req.params.chatId)
          micro.send(res, 200, response)
        } catch (e) {
          console.error('get chats error: ', e)
          micro.send(res, 400, { error: 'get chats error' })
        }
      }),
      post('/api/chat', async (req, res) => {
        try {
          const token = req.headers['authorization']
          const user = auth.decodeToken(token)
          const body = await micro.json(req)
          const response = await chat.createChat({ user, request: body })
          micro.send(res, 200, response)
        } catch (e) {
          console.error('create chat error: ', e)
          micro.send(res, 400, { error: 'create chat error' })
        }
      }),
      put('/api/chat', async (req, res) => {
        try {
          const token = req.headers['authorization']
          const user = auth.decodeToken(token)
          const body = await micro.json(req)
          const response = await chat.updateChat({ user, request: body })
          micro.send(res, 200, response)
        } catch (e) {
          console.error('update chat error: ', e)
          micro.send(res, 400, { error: 'update chat error' })
        }
      }),
      post('/api/chat/addUser', async (req, res) => {
        try {
          const token = req.headers['authorization']
          const user = auth.decodeToken(token)
          const body = await micro.json(req)
          const response = await chat.addUser({ user, request: body })
          micro.send(res, 200, response)
        } catch (e) {
          console.error('create chat error: ', e)
          micro.send(res, 400, { error: 'create chat error' })
        }
      }),
      get('/api/messages/:chatId', async (req, res) => {
        try {
          const token = req.headers['authorization']
          const user = auth.decodeToken(token)
          if (req.params.chatId) {
            const query = { timestamp: +_.get(req, 'query.timestamp', 0) }
            console.log('Query for messages is:', query)
            const response = await chat.getMessages({ user, chatId: req.params.chatId, query })
            micro.send(res, 200, response)
          } else {
            throw 'no chat id provided'
          }
        } catch (e) {
          console.error('get messages error: ', e)
          micro.send(res, 400, { error: 'get messages error' })
        }
      }),
      post(
        '/api/upload',
        upload(async (req, res) => {
          try {
            const respose = await uploader.upload(req.files)
            micro.send(res, 200, respose)
          } catch (e) {
            console.error('create chat error: ', e)
            micro.send(res, 400, { error: 'create chat error' })
          }
        })
      ),
      get('/index.html', async (req, res) => {
        console.log('Serving index.html')
        res.end(html)
      }),
      get('/', async (req, res) => {
        console.log('Serving / index.html')
        res.end(html)
      })
    )
  )
)

chat.init(server)
auth.initializeFirebaseAdminApp(process.env.FIREBASE_ACCOUNT_KEY, process.env.FIREBASE_DB_NAME)

server.listen(4000, () => console.log('Listening on localhost:4000'))
