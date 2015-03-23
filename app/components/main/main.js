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
        ContactsModel.loadContactsList($scope.user.id);
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

    $scope.onSelectChat = function (key) {
      ChatModel.selectChat(key);
      $scope.session = {
        id: key,
        user: ContactsModel.getContact(key),
        chat: ChatModel.getActiveChat()
      };

      angular.forEach($scope.chat.list, function (value, k) {
        if (key != k) value.menuActive = false;
      });
      $scope.chat.list[key].menuActive = true;

    };
    $scope.closeChat = function (key) {
      ChatModel.closeChat(key);
      $scope.session = {};
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
        $scope.onSelectChat(contact.id);
      }
    };

  });
