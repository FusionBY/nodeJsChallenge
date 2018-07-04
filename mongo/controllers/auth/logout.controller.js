import UserModel from 'mongoose-models/user.model';

export default async (req, res) => {
	const { id, refreshId } = req.user;

	try {
		const user = await UserModel.findById(id);
		user.refreshTokens = user.refreshTokens.filter((token) => {
			return token.id !== refreshId;
		});
		await user.save();
		res.status(200).json({ status: 200, message: 'Log out' });
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Something went wrong' });
	}
};
