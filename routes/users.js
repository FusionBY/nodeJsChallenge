import { Router } from 'express';
import isAuth from 'middlewares/isAuth';
import models from 'models';
const router = Router();

router.get('/', isAuth, async (req, res) => {
	try {
		const users = await models.user.findAll({ raw: true });
		res.status(200).json({
			status: 200,
			users: users,
		});
	} catch (error) {
		logger.log(error);
		res.status(500).json({
			status: 500,
			data: '',
			message: 'Something went wrong',
		});
	}
});

export default router;
