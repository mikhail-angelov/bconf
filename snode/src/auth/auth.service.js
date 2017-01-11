'use strict'

const sequrity = require('../security')

module.exports = (dao) => {
    
    function login(credentials) {
        return findUser({ email: credentials.email })
            .then(user => {
                if (user && sequrity.validatePassword(credentials.password, user.password)) {
                    user.token = signToken( user.id)
                    return user
                } else {
                    return Promise.reject('Invalid password')
                }
            })
    }

    function findUser(query){
      return dao.findOne('users', query)
    }

    function authenticate(user, password){
      if (sequrity.validatePassword(password, user.password)) {
          user.token = signToken( user.id)
          return user
      }
    }

    function createUser(user, query) {
        return dao.findOne('users', query)
            .then(exist => {
                if (!exist) {
                    user.password = sequrity.encodePassword(user.password)
                    return dao.create('users', user)
                        .then(result => {
                            const user = result.ops[0]
                            user.token = signToken( user.id)
                            return user
                        })
                } else {
                    return Promise.reject('The user with this email is already exist.')
                }
            })
    }

    function resetPassword(email) {
        return Promise.resolve('/fake-url') //todo: implement
    }

    function signToken(userId){
        return sequrity.encodeToken({
                    id: userId
                })
    }

    function setTokenCookie(req, res) {
      if (!req.user) {
        return res.status(404).send('Something went wrong, please try again.');
      }else{
        const token = signToken( req.user.id)
        res.cookie('token', token);
        res.redirect('/');
      }
    }

    return {
        login,
        authenticate,
        findUser,
        createUser,
        resetPassword,
        setTokenCookie
    }
}
