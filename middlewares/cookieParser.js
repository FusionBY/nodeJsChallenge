export default (req, res, next) => {
	const cookies = req.headers.cookie;
	if (!cookies) {
		return next();
	}

	req.parsedCookies = cookies.split('; ').reduce((result, cookie) => {
		const [key, value] = cookie.split('=');
		result[key] = value;
		return result;
	}, {});

	next();
};
