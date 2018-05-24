module.exports = {
  port: process.env.PORT || 4000,
  authToken: 'some token',
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/bconf',
}