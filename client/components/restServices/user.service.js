'use strict';


export default function ($http) {
    return {
        changePassword: (id, data) => $http({
            method: 'PUT',
            url: '/api/users/' + id + 'password',
            data: data
        })
        ,
        get: (id, data) => $http({
            method: 'GET',
            url: '/api/users/me'
        }).then(response=>response.data),
        save: (data) => $http({
            method: 'POST',
            url: '/api/users',
            data: data
        })
    }
}

