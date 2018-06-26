import { Router } from 'express';
import { tokenService } from 'service';
const router = Router();

import models from 'models';

router.post('/', async (req, res, next) => {
	const { username, password } = req.body;

	try {
		const tokens = await tokenService.getTokens({ username });

		const newUser = models.user.build({
			username,
			password,
			refreshTokens: [{ id: tokens.refreshId, refreshToken: tokens.refresh }],
		});

		const token = {
			access: tokens.access,
			refresh: tokens.refresh,
		};
		const user = await newUser.save();

		res.status(200).json({
			code: 200,
			data: user,
			token,
		});
	} catch (err) {
		next(err);
	}
});

export default router;
