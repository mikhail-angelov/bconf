angular.module('bconfApp').config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('welcome', {
      url: "/",
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
    });

});
