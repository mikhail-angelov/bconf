'use strict';

class SignupController {
  //start-non-standard

  //end-non-standard

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;

      this.user = {};
  this.errors = {};
  this.submitted = false;
  }

  register(form) {
    this.submitted = true;
    console.log('register')

    if (form.$valid) {
      this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Account created, redirect to home
        this.$state.go('main');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
}

export default SignupController;
