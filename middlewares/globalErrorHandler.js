export default (err, req, res, next) => {
	logger.error(err.message);
	res.status(500).json({ message: err.message });
};