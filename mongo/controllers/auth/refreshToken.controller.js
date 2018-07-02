import UserModel from 'mongoose-models/user.model';

export default async (req, res) => {
	const { id, refreshId, refreshToken } = req.user;

	try {
		const user = await UserModel.findById(id);

		const findToken = user.refreshTokens.find((token) => token.id === refreshId);
		const isMatched = findToken && findToken.refreshToken === refreshToken;
		logger.debug(isMatched);
		let newToken;
		if (isMatched) {
			newToken = await user.updateTokens(refreshId);
		} else {
			newToken = await user.updateTokens(refreshId, true);
			throw new Error('[refresh tokens error] Invalid refresh token');
		}
		res.status(200).json({ status: 200, data: newToken, message: 'success refresh' });
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Something went wrong' });
	}
};
