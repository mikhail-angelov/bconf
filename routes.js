function setup(app, handlers) {
  app.get('/auth/google', handlers.auth.googleSignIn);
  app.get('/auth/google/callback', handlers.auth.googleSignInCallback);
  app.get('/auth/facebook', handlers.auth.facebookSignIn);
  app.get('/auth/facebook/callback', handlers.auth.facebookSignInCallback);
  app.get('/auth/yandex', handlers.auth.yandexSignIn);
  app.get('/auth/yandex/callback', handlers.auth.yandexSignInCallback);
  app.post('/login', handlers.auth.login);
  app.get('/user/:userId', handlers.user.get);
  console.log("Successfully set up routes");
}

exports.setup = setup;
