'use strict';

class LoginController {
  //start-non-standard

  //end-non-standard

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
      this.user = {};
  this.errors = {};
  this.submitted = false;
  }

  login(form) {
    console.log('login')
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('main');
      })
      .catch(err => {
        this.errors = err.message;
      });
    }
  }
}

export default LoginController;
