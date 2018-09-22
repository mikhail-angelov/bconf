const database = require('./db')

async function login(credentials){
  const {email, password} = credentials
  if(!email || !password){
    return Promise.reject('invalid params')
  }
  const db = await database.db()
  const user = await db.collection("users").findOne({email})
  if(!user){
    return Promise.reject('invalid params')
  }
  if(user.password === password){
    return {token:'test', user}
  }else{
    return Promise.reject('invalid username or password')
  }
}

module.exports = {
  login,
}
