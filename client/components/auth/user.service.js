'use strict';


export default function UserResource($http) {
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
    })
  }
}

