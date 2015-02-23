var UserDB = require('../models/user')

var AuthHandler = function() {
	this.googleSignIn = googleSignIn;
	this.googleSignInCallback = googleSignInCallback;
	this.facebookSignIn = facebookSignIn;
	this.facebookSignInCallback = facebookSignInCallback;
};

function googleSignIn(req, res, next) {
	passport = req._passport.instance;
	
	passport.authenticate('google',{scope: 'https://www.googleapis.com/auth/userinfo.email',accessType: 'offline', approvalPrompt: 'force'}, function(err, user, info) {
        console.log(info);
        console.log(res);
	})(req,res,next);

}

function googleSignInCallback(req, res, next) {
	passport = req._passport.instance;
	passport.authenticate('google',function(err, user, info) {
		if(err) {
			return next(err);
		}
		if(!user) {
			return res.redirect('http://localhost:8000');
		}
		UserDB.findOne({email: user._json.email},function(err,usr) {
			res.writeHead(302, {
				'Location': 'http://localhost:8000/#/index?token=' + usr.token + '&user=' + usr.email
			});
			res.end();
		});
	})(req,res,next);
}

function facebookSignIn(req, res, next) {
    passport = req._passport.instance;

    passport.authenticate('facebook', function(err, user, info) {
        console.log(info);
        console.log(res);
    })(req,res,next);
}
function facebookSignInCallback(req, res, next) {
    passport = req._passport.instance;
    passport.authenticate('facebook',function(err, user, info) {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.redirect('http://localhost:8001');
        }
        UserDB.findOne({email: user.id},function(err,usr) {
            res.writeHead(302, {
                'Location': 'http://localhost:8001/#/index?token=' + usr.token + '&user=' + usr.email
            });
            res.end();
        });
    })(req,res,next);
}


module.exports = AuthHandler; 
