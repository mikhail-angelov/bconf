'use strict';

/**
 * @ngdoc function
 * @name bconfApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bconfApp
 */
angular.module('bconfApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
