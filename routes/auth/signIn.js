import { Router } from 'express';
import { tokenService } from 'service';
import passport from 'passport';
const router = Router();

router.post('/', (req, res) => {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(404).json({
				message: info ? info.message : 'Not Found',
				data: '',
			});
		}

		req.login(user, { session: false }, async (err) => {
			const { username } = user;
			if (err) {
				res.send(err);
			}
			const token = await tokenService.getTokens({ username });
			const updatedRefreshTokens = [ ...user.refreshTokens, { id: token.refreshId, refreshToken: token.refresh }];
			try {
				await user.update({ refreshTokens: updatedRefreshTokens });
				return res.status(200).json({
					code: 200,
					user,
					token,
				});
			} catch (error) {
				return res.status(500).json({
					code: 500,
					data: user,
					message: 'Something went wrong',
					error,
				});
			}
		});
	})(req, res);
});

export default router;
