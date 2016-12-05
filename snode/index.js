const WebSocket = require('ws')
const app = require('express')()
const server = require('http').createServer(app)
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ server: server })
const port = process.env.PORT || 3333

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//rest
app.get('/api/contact', (req, res) => {
    console.log('/api/contact')
    res.json([{
        firstName: 'Vasya',
        secondName: 'Vasin',
        userId: 'test1',
        info: 'some information about this contact',
        status: 'I`m cool',
        country: 'USA',
        city: 'California',
        phoneNumber: '123456789',
        birthday: '1 march 1994',
        sex: 'male',
        date: new Date()
    },{
        firstName: 'Petya',
        secondName: 'Petin',
        userId: 'test2',
        info: 'some information about this contact',
        status: 'I`m cool',
        country: 'USA',
        city: 'California',
        phoneNumber: '123456789',
        birthday: '1 march 1994',
        sex: 'male',
        date: new Date()
    }])
})

const TOKEN = {
        // firstName:'Ivan',
        secondName:'Trump',
        token:'test token'
    };
app.post('/login', (req, res) => {
    console.log('/login', req.body)
    TOKEN.firstName = req.body.email
    res.json(TOKEN)
})
app.post('/logout', (req, res) => {
    console.log('/logout')

    res.json({})
})
app.post('/validate', (req, res) => {
    console.log('/validate')
    res.json(TOKEN)
})
app.post('/forgotPassword', (req, res) => {
    console.log('/forgotPassword',req.body)
    res.json(TOKEN)
})
app.post('/signIn', (req, res) => {
    console.log('/signIn',req.body)
    res.json(TOKEN)
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
})


