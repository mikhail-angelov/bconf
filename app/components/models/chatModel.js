angular.module('bconfApp').factory('ChatModel', function (Peer, $rootScope, $timeout) {
  var chat = {};
  var activeChat = '';

  var model = {
    list: chat,
    init: function (peerId) {
      Peer.init(peerId);
    },
    startChat: function (chatId) {
      if (!chat.hasOwnProperty(chatId)) {
        chat[chatId] = {
          conn: Peer.startChat(chatId),
          messages: [],
          status: 'active'
        };
        subscribe(chat[chatId].conn, chatId);
      }
      model.selectChat(chatId);
    },
    closeChat: function (chatId) {
      console.log('close chat ' + chatId);
      chat[chatId].status = 'offline';
      //todo implement this
      // delete chat[chatId];
    },
    selectChat: function (chatId) {
      activeChat = chatId;
    },
    getActiveChat: function () {
      return chat[activeChat];
    },
    sendMessage: function (message) {
      var currentChat = chat[activeChat];
      if (currentChat) {
        currentChat.messages.push({type: 'out', msg: message});
        if (currentChat.conn == null) {
          console.log('connection is closed');
        } else {
          currentChat.conn.send(message);
        }
      }
    }
  };
  $rootScope.$on('startChat', function (scope, data) {
    var chatId = data.conn.peer;
    if (!chat.hasOwnProperty(chatId)) {
      chat[chatId] = {
        messages: []
      };
    }
    chat[chatId].conn = data.conn;
    chat[chatId].status = 'active';
    subscribe(chat[chatId].conn, chatId);
    if (_.isEmpty(activeChat)) {
      activeChat = chatId;
    }
  });

  function subscribe(conn, chatId) {
    Peer.subscribe(conn, onOpen(chatId), onMessage(chatId), onClose(chatId));
  }

  function onOpen(chatId) {
    return withApply(function () {
      console.log('open ' + chatId);
      chat[chatId].messages.push({type: 'in', msg: 'connection is opened with ' + chatId});
    });
  }

  function onMessage(chatId) {
    return withApply(function (msg) {
      chat[chatId].messages.push({type: 'in', msg: msg});
    });
  }

  function onClose(chatId) {
    return withApply(function () {
      console.log('closed');
      chat[chatId].messages.push({type: 'in', msg: 'connection is closed with ' + chatId});
      chat[chatId].status = 'offline';
      chat[chatId].conn = null;
    });
  }

  function withApply(f) {
    return function () {
      var args = arguments;
      $timeout(function () {
        f.apply({}, args);
      }); //we have to pass origin arguments to function
    }
  }

  return model;
});
