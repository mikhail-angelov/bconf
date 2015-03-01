angular.module('bconfApp').config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('welcome', {
      templateUrl: "components/welcome/welcome.html",
      controller: 'WelcomeController'
    })
    .state('main', {
      templateUrl: "components/main/main.html",
      controller: 'MainController'
    })
    .state('redirect', {
      url: "/redirect?token&user",
      templateUrl: "components/main/main.html",
      controller: 'MainController'
    })
    .state('default', {
      url: "/",
      controller: function($state, Auth){
        if(Auth.getToken()){
          $state.go('main');
        }else{
          $state.go('welcome')
        }
      }
    });

});
