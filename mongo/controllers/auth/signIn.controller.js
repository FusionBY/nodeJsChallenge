import passport from 'passport';

export default (req, res) => {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(404).json({
				message: info ? info.message : 'Not Found',
				data: '',
			});
		}

		req.login(user, { session: false }, async (err) => {
			if (err) {
				res.send(err);
			}
			try {
				const token = await user.addRefreshToken();
				return res.status(200).json({
					code: 200,
					user,
					token,
				});
			} catch (err) {
				return res.status(500).json({
					code: 500,
					data: user,
					message: 'Something went wrong',
					err,
				});
			}
		});
	})(req, res);
};
