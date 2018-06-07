import http from 'http';
import url from 'url';
const port = 3042;

const requestHandler = (req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const { pathname, query: { message } } = parsedUrl;
	if (pathname === '/echo' && message) {
		res.setHeader('Content-Type', 'text/plain');
		res.end(message);
	}

	res.statusCode = 404;
	res.end('Page not found');
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
	if (err) {
		return console.log('something went wrong', err);
	}
	console.log(`server is listening on ${port}`);
});
