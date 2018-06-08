import http from 'http';

const port = 3042;

const requestHandler = (request, response) => {
	const product = {
		id: 1,
		name: 'Supreme T-Shirt',
		brand: 'Supreme',
		price: 99.99,
		options: [{ color: 'blue' }, { size: 'XL' }],
	};

	response.setHeader('Content-Type', 'application/json');
	response.end(JSON.stringify(product));
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
	if (err) {
		return console.log('something went wrong', err);
	}
	console.log(`server is listening on ${port}`);
});
