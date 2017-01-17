'use strict'

const sequrity = require('../security')

module.exports = (dao) => {
    
    function findUser(query){
      return dao.findOne('users', query)
    }
    function getUser(id){
      return dao.findById('users', id)
    }

    function authenticate(user, password){
      if (user && sequrity.validatePassword(password, user.password)) {
          user.token = signToken( user)
          return user
      }else{
          return null
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
                            user.token = signToken( user)
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

    function signToken(user){
        return sequrity.encodeToken(user)
    }

    function setTokenCookie(req, res) {
      if (!req.user) {
        return res.status(404).send('Something went wrong, please try again.')
      }else{
        const token = signToken( req.user)
        return res.redirect('/#auth-redirect='+token)
      }
    }

    return {
        authenticate,
        findUser,
        getUser,
        createUser,
        resetPassword,
        setTokenCookie
    }
}
