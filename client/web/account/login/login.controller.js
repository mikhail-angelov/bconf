'use strict';

class LoginController {

    constructor(Auth, $state) {
        this.Auth = Auth;
        this.$state = $state;
        this.user = {};
        this.errors = {};
        this.submitted = false;
        this.type = 'login';

        this.facebookLink = 'facebook';
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
                    this.$state.go('redirect');
                })
                .catch(err => {
                    this.errors = err.message;
                });
        }
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

    resetPassword(form) {

        alert('not implemented')
    }

    setViewType(type) {
        this.type = type;
    }

    isViewType(type) {
        return this.type === type;
    }
}

export default LoginController;
