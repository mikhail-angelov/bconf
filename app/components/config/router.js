angular.module('bconfApp').config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('main', {
      url: "/",
      templateUrl: "components/main/main.html",
      controller: 'MainController'
    });

});
