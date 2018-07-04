import { tokenService } from 'service';
import userModel from 'mongoose-models/user.model';

export default async (req, res, next) => {
	const { username, password } = req.body;

	try {
		const newUser = new userModel({
			username,
			password,
		});
		// get user id for putting to jwt
		const preparedUser = await newUser.saveWithHash();
		const tokens = await tokenService.getTokens({ username, id: preparedUser._id });
		preparedUser.refreshTokens = [{ id: tokens.refreshId, refreshToken: tokens.refresh }];
		const user = await preparedUser.save();

		const token = {
			access: tokens.access,
			refresh: tokens.refresh,
		};

		res.status(200).json({
			code: 200,
			data: user,
			token,
		});
	} catch (err) {
		next(err);
	}
};