const User = require('../model/user')
const security = require('../auth/security')

function getUser(id) {
  return User.findById(id)
}

function validUserData(data) {
  return data.email && data.name && data.password
}
function createUser(data) {
  if (validUserData(data)) {
    const user = new User(data)
    return security.encodePassword(data.password)
      .then(password => {
        user.password = password
        return user.save()
      })
  } else {
    return Promise.reject('invalid user data')
  }
}

module.exports = {
  getUser,
  createUser,
}
