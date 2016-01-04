'use strict';

class MainController {

  constructor($http, $scope, $state) {
    this.menuOpen = false;
    this.showJoin = false;
    this.$state = $state;
  }



  onShowJoin(){
    this.showJoin = true;
  }
  onLogin(){
    console.log('to login')
    this.$state.go('login')
  }
}


export default MainController;
