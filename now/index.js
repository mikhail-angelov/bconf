const micro = require('micro');
const { router, get, post } = require('microrouter');
const cors = require('micro-cors')({ allowMethods: ['GET','POST'] });
const fs = require('fs');
const path = require('path');
//const db = require('./db')

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
        const body = await micro.json(req)
        if(body.username === 'anton'){
          micro.send(res, 400, {error:'incorrect password'});
        }else{
          micro.send(res, 200, {token:'token',user:'Valera'});
        }
      }),
      post('/auth/check', (req, res) => {
        micro.send(res, 200, {token:'token',user:'Valera'});
      }),
      post('/auth/register',(req, res) => {
        micro.send(res, 200, {token:'token',user:'Valera'});
      }),
      post('/auth/forget-password',(req, res) => {
        micro.send(res, 200, {status: 'new password is sent to your email'});
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
