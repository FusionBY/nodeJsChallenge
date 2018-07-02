export default (req, res, next) => {
	req.body.lastModifiedDate = Date.now();
	next();
};