import logger from 'utils/logger';

export default (err, req, res, next) => {
	logger.error(err);

	if (err.code === 11000) {
		res.status(500).json({ msg: 'Ошибка: такой пользователь уже существует.' });
	}
};