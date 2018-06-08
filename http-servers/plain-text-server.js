import http from 'http';

const port = 3042;

const requestHandler = (request, response) => {
	response.setHeader('Content-Type', 'text/plain');
	response.end('Hello World!');
};

const server = http.createServer(requestHandler);
server.listen(port, (err) => {
	if (err) {
		return console.log('something went wrong', err);
	}
	console.log(`server is listening on ${port}`);
});
