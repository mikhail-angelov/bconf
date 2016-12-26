const WebSocket = require('ws')
const app = require('express')()
const server = require('http').createServer(app)
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ server: server })
const port = process.env.PORT || 9001
const user = require('./user')
const createPeerServer = require('./peer')
const fakeWebRTCClient = require('./fake.webrtc.client.js')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

app.use(function(req, res, next) {
  const token = req.headers['x-access-token'];
  if(token){
      const decoded = user.decode(token);
      req.decoded = decoded;
  }
  next();
});


//rest
app.get('/api/contact', (req, res) => {
    const contacts = user.getContacts(req.decoded.id);
    console.log('/api/contact', contacts);
    res.json(contacts)
})
app.post('/api/contact', (req, res) => {
    const contacts = user.addContact(reqdecoded.id, req.body);
    res.json(contacts)
})

app.post('/login', (req, res) => {
    console.log('/login', req.body)
    const data = user.auth(req.body);
    const response = data.user;
    response.token = data.token;
    res.json(response)
})
app.post('/logout', (req, res) => {
    console.log('/logout')
    res.json({})
})

app.post('/loginGuest', (req, res) => {
    console.log('/loginGuest', req.body)
    const data = user.authGuest();
    res.json(data)
})

app.post('/validate', (req, res) => {
    console.log('/validate')
    if(req.decoded){
        res.status(200).end()
    }else{
        res.status(401).end()
    }
})
app.post('/forgotPassword', (req, res) => {
    console.log('/forgotPassword',req.body)
    const url = user.resetPassword(req.body)
    res.json({url:url})
})
app.post('/signUp', (req, res) => {
    console.log('/signUp',req.body)
    const newUser = user.createUser(req.body)
    res.json(newUser)
})

//ws
wss.on('connection', function connection(ws) {
    console.log('on connect')
    ws.on('message', function message(data) {
        console.log('on message')
        // Broadcast to everyone else.
        wss.clients.forEach(function each(client) {
            if (client == ws) client.send(data);
        })
    })
})



const serv = server.listen(port, function () {
    console.log('Express server listening on %d, in %s mode', port, app.get('env'));
    fakeWebRTCClient.init();
})

createPeerServer(serv)




