'use strict';

export default function ($scope, $state, Auth, User, $rootScope, ChatModel, ContactsModel, $mdToast, Property, constant, $mdDialog) {

    $scope.user = {};
    $scope.friends = [];
    $scope.chat = ChatModel;
    $scope.contacts = ContactsModel;
    $scope.callInfo = null;

    var callToast = {
      controller: 'VoiceCall',
      templateUrl: 'components/voiceCall/voiceCall.html',
      hideDelay: false,
      position: 'top right',
      parent: angular.element(document.querySelector('#messageList'))
    };

    //if (Auth.getToken()) {
      loadUser();
    //} else {
    //  $state.go('redirect');
    //}

    function loadUser() {
      Auth.getCurrentUser().then(user=>{
        $scope.user = user;

        // $scope.user.id = util.randomToken(); //temp

        ChatModel.init($scope.user.id);
        $scope.linkToShare = Property.getLinkToShare($scope.user);

        //load friends
        ContactsModel.loadContactsList($scope.user.id);
      });
    }

    $scope.openCallDialog = function (callInfo) {
      $scope.callInfo = callInfo;
    };
    $scope.connectedCall = function () {
      $scope.callInfo.state = constant.CALL_STATE.CONNECTED;
    };
    $scope.closeCall = function () {
      $scope.callInfo = null;
    };
    $rootScope.$on('incomingCall', function (scope, call) {
      console.log('on incoming call');
      var contactId = call.peer;
      $scope.$apply(function () {
        $scope.openCallDialog({
          state: constant.CALL_STATE.INCOMING,
          incomingCall: call,
          contact: User.getContact(contactId)
        });
      });
    });
    $rootScope.$on('closedCall', function () {
      console.log('on closed call');
      $scope.$apply(function () {
        $scope.callInfo = null;
        $scope.closeCall();
      });
    });
    $rootScope.$on('connectedCall', function () {
      console.log('on connected call');
      $scope.$apply(function () {
        $scope.callInfo.state = constant.CALL_STATE.CONNECTED;
      });
    });
    $rootScope.$on('errorCall', function () {
      console.log('on error call');
      $scope.$apply(function () {
        $scope.callInfo = null;
        $scope.closeCall();
      });
    });
    $scope.onCall = function () {
      ChatModel.startCall($scope.session.id).then(function () {
        console.log('connecting...');
        $scope.openCallDialog({
          state: constant.CALL_STATE.DIALLING,
          incomingCall: {},
          contact: User.getContact($scope.session.id)
        });
      }, function () {
        console.log('error');
      });
    };

    $scope.onLogout = function () {
      Auth.logout();
      //$state.go('redirect');
    };

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
      }, []);
      var contact = contacts[index];
      if (contact.status == 'online') {
        ChatModel.startChat(contact.id);
        $scope.onSelectChat(contact.id);
      }
    };
    $scope.onAddContact = function () {
      $mdDialog.show({
        controller: 'FindContactController',
        templateUrl: 'components/findContact/findContact.html'
      }).then(function (answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.alert = 'You cancelled the dialog.';
      });
    };


  };
