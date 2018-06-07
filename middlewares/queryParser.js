const customParser = (url) => {
	const matchQuery = url.match(/\?(.*[^/])/i);
	if (matchQuery) {
		return matchQuery[1].split('&').reduce((result, query) => {
			const [key, value] = query.split('=');
			result[key] = value;
			return result;
		}, {});
	}
};

export default (req, res, next) => {
	const { url } = req;
	req.parsedQuery = customParser(url);
	next();
};

export { customParser };
