'use strict';

angular.module('bconfApp')
  .controller('MainController', function ($scope, $state,  Auth, User, Peer, $mdSidenav, $rootScope) {


    if (Auth.getToken()) { 
      loadUser();
    } else  {
      $state.go('welcome');
    }

    function loadUser() {
      var userId = User.getUserId() || 0;
      User.query(userId).then(function () {
        $scope.user = User.get();

        $scope.user.id = util.randomToken(); //temp

        Peer.init($scope.user.id);
        $scope.linkToShare = Peer.getLinkToShare();
        //Peer.poolList(function(chats){
        //  $scope.chats = chats;
        //});
      }, function () {
        console.log('user is not loaded, can not show main view, go to welcome');
        $state.go('welcome');
      });
    }

    $scope.onLogout = function () {
      Auth.logout();
      $state.go('welcome');
    };

    $scope.toggleContacts = function () {
      $mdSidenav('contacts').toggle()
        .then(function () {
          console.log("toggle RIGHT is done");
        });
    };

    $scope.onSelectChat=function(index){
      var chatId = $scope.chats[index];
      $scope.startChat(chatId);
    };
    $scope.startChat = function(chatId){
      if(chatId != $scope.chat.id){
        $scope.conn = Peer.startChat(chatId);
        Peer.subscribe($scope.conn,onOpen, onMessage, onClose);
      }
    };
    $rootScope.$on('startChat', function(scope, data){
      $scope.conn = data.conn;
      Peer.subscribe($scope.conn,onOpen, onMessage, onClose);
      $scope.chat.id = $scope.conn.peer;
    });

    function onOpen (){
      console.log('open');
      $scope.chat.messages.push({type:'in',msg:'connection is opened with '+$scope.chat.id});
    }
    function onMessage(msg){
      $scope.$apply(function() {
        $scope.chat.messages.push({type: 'in', msg: msg});
      });
    }
    function onClose(){
      console.log('closed');
      $scope.chat.messages.push({type:'in',msg:'connection is closed with '+$scope.chat.id});
      $scope.chat.id = 0;
      $scope.conn = null;
    }
    $scope.conn = null;
    $scope.onSend = function () {
      var message = $scope.newMessage;
      if (message) {
        $scope.chat.messages.push({type:'out',msg:message});
        if ($scope.conn == null) {
          console.log('connection is closed');
          $scope.startChat(message);
        }else if(message == 'close'){
          $scope.conn.close();
          $scope.conn = null;
        }else{
          $scope.conn.send(message);
        }
      }
      $scope.newMessage ='';
    };
    //$scope.user = {
    //  display_name:'John Smith',
    //  provider:'yandex',
    //  avatar: '/images/john.png',
    //  friends :[
    //    {name:'vasy pupkin', provider:'facebook', avatar:'/images/yeoman.png'},
    //    {name:'vasilisa pupkina', provider:'facebook', avatar:'/images/yeoman.png'}
    //  ]
    //};
    //$scope.linkToShare = 'http://localhost:3000/redirect?user=1234567890';


    //$scope.chats = [
    //  'chat 1', 'looooooooooong chat name'
    //];

    $scope.chat = {
      id: null,
      user: {name: 'vasy pupkin', provider: 'facebook', avatar: '/images/anonymous.png'},
      messages: []
    }
  });
