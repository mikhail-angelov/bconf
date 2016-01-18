'use strict';

class LoginGuestController {

    constructor(Auth, $state) {
        this.Auth = Auth;
        this.$state = $state;
        this.capture = '12';
        this.errors = null;
        this.submitted = false;
    }

    login(form) {
        console.log('loginGuest')
        this.submitted = true;
        this.errors = null;

        if (form.$valid) {
            this.Auth.loginGuest({
                capture: this.capture
            })
                .then(() => {
                    // Logged in, redirect to home
                    this.$state.go('redirect');
                })
                .catch(err => {
                    this.errors = err.data.message;
                });
        }
    }

    onClose(){
        this.Auth.logout();
        this.$state.go('main');
    }



}

export default LoginGuestController;
