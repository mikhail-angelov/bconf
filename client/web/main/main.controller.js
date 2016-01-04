'use strict';

class MainController {

  constructor($http, $scope, $state) {
    this.$state = $state;
  }


  onLogin(){
    console.log('to login')
    this.$state.go('login')
  }
}


export default MainController;
