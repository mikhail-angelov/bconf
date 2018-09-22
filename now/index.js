const micro = require('micro');
const { router, get, post } = require('microrouter');
const cors = require('micro-cors')({ allowMethods: ['GET', 'POST'] });
const fs = require('fs');
const path = require('path');
const auth = require('./auth')
const chat = require('./chat')

const document = path.join(__dirname, 'main.html')
const html = fs.readFileSync(document)

const server = micro(
  cors(
    router(
      get('/index.html', async (req, res) => {
        console.log('Serving index.html')
        res.end(html)
      }),
      post('/auth/login', async (req, res) => {
        try {
          const body = await micro.json(req)
          const response = await auth.login(body)
          micro.send(res, 200, response);
        } catch (e) {
          console.error('login error: ', e)
          micro.send(res, 400, { error: 'incorrect password' })
        }
      }),
      post('/auth/check', (req, res) => {
        try {
          const token = req.headers['authorization']
          const response = await auth.check(token)
          micro.send(res, 200, response);
        } catch (e) {
          console.error('check error: ', e)
          micro.send(res, 400, { error: 'incorrect token' })
        }
      }),
      post('/auth/register', (req, res) => {
        try {
          const body = await micro.json(req)
          const response = await auth.register(body)
          micro.send(res, 200, response);
        } catch (e) {
          console.error('register error: ', e)
          micro.send(res, 400, { error: 'incorrect params' })
        }
      }),
      post('/auth/forget-password', (req, res) => {
        micro.send(res, 200, { status: 'new password is sent to your email' })
      }),
      get('/chat', (req, res) => {
        try {
          const token = req.headers['authorization']
          const user = auth.decodeToken(token)
          const response = await chat.getChats(user)
          micro.send(res, 200, response);
        } catch (e) {
          console.error('get chats error: ', e)
          micro.send(res, 400, { error: 'get chats error' })
        }
      }),
      post('/chat', (req, res) => {
        try {
          const token = req.headers['authorization']
          const user = auth.decodeToken(token)
          const chat = await micro.json(req)
          const response = await chat.createChat({user, chat})
          micro.send(res, 200, response);
        } catch (e) {
          console.error('create chat error: ', e)
          micro.send(res, 400, { error: 'create chat error' })
        }
      }),
      put('/chat', (req, res) => {
        try {
          const token = req.headers['authorization']
          const user = auth.decodeToken(token)
          const chat = await micro.json(req)
          const response = await chat.updateChat({user, chat})
          micro.send(res, 200, response);
        } catch (e) {
          console.error('update chat error: ', e)
          micro.send(res, 400, { error: 'update chat error' })
        }
      }),
      get('/messages/:chatId', (req, res) => {
        try {
          const token = req.headers['authorization']
          const user = auth.decodeToken(token)
          const response = await chat.getMessages(user, req.params.chatId)
          micro.send(res, 200, response);
        } catch (e) {
          console.error('get messages error: ', e)
          micro.send(res, 400, { error: 'get messages error' })
        }
      })
    )
  )
)

chat.init(server)

server.listen(4000, () => console.log('Listening on localhost:4000'))
