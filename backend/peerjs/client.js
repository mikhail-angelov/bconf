
function create (socket, id, token, ip, onMessage, onClose, onError) {
  var client = null;
  if(!socket){
    return null;
  }
  if (!id || !token || !ip || !onMessage || !onClose) {
    socket.send(JSON.stringify({ type: 'ERROR', payload: { msg: 'No id, token, or key supplied to websocket server' } }));
    socket.close();
    return;
  }
  client = {
    socket: socket,
    id: id,
    token: token,
    ip: ip,
    sendMessage: sendMessage
  };

  socket.send(JSON.stringify({ type: 'OPEN' }));

  socket.on('close', function() {
    console.log('client Socket closed:', client.id);
    onClose(client);
  });

  socket.on('message', function(data) {
    try {
      var message = JSON.parse(data);

      if (['LEAVE', 'CANDIDATE', 'OFFER', 'ANSWER'].indexOf(message.type) !== -1) {
        onMessage(client, {
          type: message.type,
          src: id,
          dst: message.dst,
          payload: message.payload
        });
      } else {
        console.log('Message unrecognized');
      }
    } catch(e) {
      console.log('Invalid message', data);
      throw e;
    }
  });
  return client;
}

function sendMessage(message){
  try{
    this.socket.send(message);
  }catch (e){
    console.log('error due sending message, maybe socket is closed');
  }
}

module.exports = {
  create: create
};
