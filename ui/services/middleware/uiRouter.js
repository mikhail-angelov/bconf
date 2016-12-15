const store = require('../../services/store')
const actions = require('../../services/actions/index.js')


module.exports = store => next => action => {
//   console.log('dispatching', action)
  let result = next(action)

  switch(action.type){
    case actions.auth.LOGOUT_COMPLETE:{
        console.log('----------')
         return riot.route('auth');

    }
    case actions.auth.LOGIN_COMPLETE:{
        console.log('----------')
         return riot.route('main')
        
    }
  }
  return result
}