import models from 'models';

export default {
	async getAll (req, res) {
		try {
			const products = await models.product.findAll({ raw: true });
			res.status(200).json({
				status: 200,
				products,
			});
		} catch (error) {
			logger.log(error);
			res.status(500).json({
				status: 500,
				data: '',
				message: 'Something went wrong',
			});
		}
	},

	async addProduct (req, res) {
		const { productName } = req.body;

		const newProduct = models.product.build({
			productName,
			reviews: '',
		});
		logger.log(newProduct);
		try {
			const product = await newProduct.save();
			logger.log(product);
			res.status(200).json({
				code: 200,
				product,
			});
		} catch (err) {
			res.status(500).json({
				code: 500,
				message: 'Something went wrong',
				err,
			});
		}
	},
};
