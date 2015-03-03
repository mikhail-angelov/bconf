'use strict';

angular.module('bconfApp')
  .controller('MainController', function ($scope, $state, $stateParams, Auth, User, Peer, $mdSidenav) {


    if ($stateParams && $stateParams.token) {
      Auth.setToken($stateParams.token);
      User.storeUserId($stateParams.user);
      loadUser();
    } else if (Auth.getToken()) {
      loadUser();
    } else {
      $state.go('welcome');
    }

    function loadUser() {
      var userId = User.getUserId();
      User.query(userId).then(function () {
        $scope.user = User.get();
      });
      Peer.init(userId);
    }

    $scope.onLogout = function(){
      Auth.logout();
      $state.go('welcome');
    };

    $scope.toggleContacts = function() {
      $mdSidenav('contacts').toggle()
        .then(function(){
          console.log("toggle RIGHT is done");
        });
    };

    $scope.user = {
      display_name:'John Smith',
      provider:'yandex',
      avatar: '/images/john.png'
    };
    $scope.linkToShare = 'http://localhost:3000/redirect?user=1234567890';

    $scope.friends = [
      {name:'vasy pupkin', provider:'facebook', avatar:'/images/yeoman.png'},
      {name:'vasilisa pupkina', provider:'facebook', avatar:'/images/yeoman.png'}
    ];

    $scope.chats=[
      {name:'chat 1', status:1}, {name:'looooooooooong chat name', status:0}
    ];

    $scope.chat ={
      user:{name:'vasy pupkin', provider:'facebook', avatar:'/images/yeoman.png'},
      messages:['hi','watsup', 'h r u?', 'ok']
    }
  });
