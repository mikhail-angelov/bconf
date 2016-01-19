'use strict';

class UserServiceRest {
    constructor($http) {
        this.$http = $http;
    }

    changePassword(id, data) {
        return this.$http({
            method: 'PUT',
            url: '/api/users/' + id + 'password',
            data: data
        });
    }

    get(id, data) {
        return this.$http({
            method: 'GET',
            url: '/api/users/me'
        }).then(response=>response.data);
    }

    save(data) {
        return this.$http({
            method: 'POST',
            url: '/api/users',
            data: data
        });
    }
}

export default UserServiceRest