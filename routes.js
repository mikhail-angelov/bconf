function setup(app,handlers) {
	app.get('/auth/google',handlers.auth.googleSignIn);
	app.get('/auth/google/callback',handlers.auth.googleSignInCallback);
	app.get('/auth/facebook',handlers.auth.facebookSignIn);
	app.get('/auth/facebook/callback',handlers.auth.facebookSignInCallback);
	console.log("Successfully set up routes");
}

exports.setup = setup;
