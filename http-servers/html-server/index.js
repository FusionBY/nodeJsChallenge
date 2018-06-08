import http from 'http';
import fs from 'fs';
import through2 from 'through2';

const port = 3042;

const requestHandler = (request, response) => {
	const stream = fs.createReadStream(__dirname + '/index.html');
	response.setHeader('Content-Type', 'text/html');

	stream
		.pipe(
			through2((chunk, enc, next) => {
				const result = chunk.toString().replace(/\{message\}/, 'Any Placeholder');
				next(null, result);
			})
		)
		.pipe(response);
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
	if (err) {
		return console.log('something went wrong', err);
	}
	console.log(`server is listening on ${port}`);
});
