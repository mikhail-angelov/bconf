var util = require('../util');

let _clients = {};

function onAdd(client){
  _clients[client.id] = client;
}
function onDelete(client){
  _clients[client.id] = null;
}
function getById(clientId) {
  if (_clients[clientId])
    return _clients[clientId];
  else
    return null;
}
function generateUniquId() {
  var clientId = util.randomId();
  while (!!_clients[clientId]) {
    clientId = util.randomId();
  }
  return clientId;
}


module.exports = {
  add: onAdd,
  getById: getById,
  delete: onDelete,
  generateUniquId: generateUniquId
};
