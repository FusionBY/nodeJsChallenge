import passport from 'passport';

export default (req, res, next) => {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		if (err || !user) {
			res.status(401).json({
				status: 401,
				data: false,
				message: info.message,
			});
		}
		if (user) {
			req.user = user;
			req.user.refreshToken = info.token;
			next();
		}
	})(req, res, next);
};
