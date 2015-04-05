angular.module('bconfApp').config(function ($httpProvider) {

  $httpProvider.interceptors.push('HttpInterceptor');

});
