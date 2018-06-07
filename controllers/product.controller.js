import fs from 'fs';
import through2 from 'through2';
import Product from 'models/Product';

const dataPath = 'data/fakeDataBase.js';
export default {
	getAll (req, res) {
		fs
			.createReadStream(dataPath)
			.pipe(
				through2((chunk, enc, next) => {
					const parsedData = JSON.parse(chunk.toString());
					next(null, JSON.stringify(parsedData.products));
				})
			)
			.pipe(res);
	},

	getById (req, res) {
		const { id } = req.params;
		fs
			.createReadStream(dataPath)
			.pipe(
				through2((chunk, enc, next) => {
					const parsedData = JSON.parse(chunk.toString());
					next(null, JSON.stringify(parsedData.products[id] || {}));
				})
			)
			.pipe(res);
	},

	getReviewsById (req, res) {
		const { id } = req.params;
		fs
			.createReadStream(dataPath)
			.pipe(
				through2((chunk, enc, next) => {
					const parsedData = JSON.parse(chunk.toString());
					const productById = parsedData.products[id];
					const reviews = productById && productById.reviews;
					next(null, JSON.stringify(reviews || {}));
				})
			)
			.pipe(res);
	},

	addProduct (req, res) {
		const newProduct = new Product();
		res.send(newProduct);
	},
};
