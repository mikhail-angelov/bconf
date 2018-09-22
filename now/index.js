const micro = require('micro');
const { router, get, post } = require('microrouter');
const cors = require('micro-cors')({ allowMethods: ['GET', 'POST'] });
const fs = require('fs');
const path = require('path');
const auth = require('./auth')

const document = path.join(__dirname, 'main.html');
const html = fs.readFileSync(document);

const server = micro(
  cors(
    router(
      get('/index.html', async (req, res) => {
        console.log('Serving index.html');
        res.end(html);
      }),
      post('/auth/login', async (req, res) => {
        try {
          const body = await micro.json(req)
          const response = await auth.login(body)
          micro.send(res, 200, response);
        } catch (e) {
          console.error('login error: ', e)
          micro.send(res, 400, { error: 'incorrect password' });
        }
      }),
      post('/auth/check', (req, res) => {
        try {
          const body = await micro.json(req)
          const response = await auth.check(body.token)
          micro.send(res, 200, response);
        } catch (e) {
          console.error('check error: ', e)
          micro.send(res, 400, { error: 'incorrect token' });
        }
      }),
      post('/auth/register', (req, res) => {
        try {
          const body = await micro.json(req)
          const response = await auth.register(body)
          micro.send(res, 200, response);
        } catch (e) {
          console.error('register error: ', e)
          micro.send(res, 400, { error: 'incorrect params' });
        }
      }),
      post('/auth/forget-password', (req, res) => {
        micro.send(res, 200, { status: 'new password is sent to your email' });
      })
    )
  )
);

const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', msg => {
    console.log(`message: ${msg}`);
    io.emit('chat message', msg);
  });
});

server.listen(4000, () => console.log('Listening on localhost:4000'));
