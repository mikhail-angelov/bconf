'use strict';

angular.module('bconfApp')
  .controller('MainController', function ($scope, $state, Auth, User, $mdSidenav, $rootScope, ChatModel, ContactsModel) {

    $scope.user = {};
    $scope.friends = [];
    $scope.chat = ChatModel;
    $scope.contacts = ContactsModel;

    if (Auth.getToken()) {
      loadUser();
    } else {
      $state.go('welcome');
    }

    function loadUser() {
      var userId = Auth.getUserId() || 0;
      User.getUserInfo(userId).then(function () {
        $scope.user = User.get();

        // $scope.user.id = util.randomToken(); //temp

        ChatModel.init($scope.user.id);
        $scope.linkToShare = User.getLinkToShare();

        //load friends
        ContactsModel.loadFriendsList($scope.user.id);
      }, function () {
        console.log('user is not loaded, can not show main view, go to welcome');
        $state.go('welcome');
      });
    }

    $scope.onLogout = function () {
      Auth.logout();
      $state.go('welcome');
    };

    //$scope.toggleContacts = function () {
    //  $mdSidenav('contacts').toggle()
    //    .then(function () {
    //      console.log("toggle RIGHT is done");
    //    });
    //};

    $scope.activeChatMenu = function (selectedKey) {
      angular.forEach($scope.chat.list, function (value, key) {
        if (key != selectedKey) value.menuActive = false;
      });
      $scope.chat.list[selectedKey].menuActive = !$scope.chat.list[selectedKey].menuActive;
    };
    $scope.onSelectChat = function (key) {
      ChatModel.selectChat(key);
      $scope.session = {
        id: key,
        user: {},//todo
        chat: ChatModel.getActiveChat()
      }
    };
    $scope.closeChat = function (key) {
      ChatModel.closeChat(key);
    };

    $scope.onSend = function () {
      ChatModel.sendMessage($scope.newMessage);
      $scope.newMessage = '';
    };

    $scope.onContact = function (index) {
      var contacts = _.reduce($scope.contacts.list, function (o, c) {
        if (c.status == 'online') {
          o.push(c);
        }
        return o;
      },[]);
      var contact = contacts[index];
      if (contact.status == 'online') {
        ChatModel.startChat(contact.id);
        $scope.session = {
          id: contact.id,
          user: contact,
          chat: ChatModel.getActiveChat()
        }
      }
    };

  });
