import userModel from 'mongoose-models/user.model';

export default async (req, res) => {
	const users = await userModel.find({});
	res.status(200).json({ status: 200, data: users, message: 'success' });
};
