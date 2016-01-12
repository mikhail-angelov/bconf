'use strict';

class MainController {

  constructor($state) {
    this.$state = $state;
  }

  onLogin(){
    this.$state.go('login')
  }
  onLoginGuest(){
    this.$state.go('loginGuest')
  }
}


export default MainController;
