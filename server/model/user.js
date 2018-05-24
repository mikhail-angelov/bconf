const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  profile: {},
  name: String,
  avatar: String,
})

UserSchema.index({ email: 1 })

module.exports = mongoose.model('User', UserSchema)
