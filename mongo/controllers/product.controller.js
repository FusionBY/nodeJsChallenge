import ProductModel from 'mongoose-models/product.model';

export default {
	async getAll (req, res) {
		const users = await ProductModel.find({});
		res.status(200).json({ status: 200, data: users, message: 'success' });
	},
	async addProduct (req, res, next) {
		const { productName } = req.body;
		try {
			const newProduct = new ProductModel({ productName });
			const product = await newProduct.save();
			res.status(200).json({ status: 200, data: product, message: 'success' });
		} catch (err) {
			return next(err);
		}
	},
	async getById (req, res, next) {
		const { id } = req.params;
		try {
			const product = await ProductModel.findById(id);
			res.status(200).json({
				status: 200,
				data: product,
			});
		} catch (err) {
			next(err);
		}
	},
	async getReviewsById (req, res, next) {
		const { id } = req.params;
		try {
			const product = await ProductModel.findById(id);
			res.status(200).json({
				status: 200,
				data: product.reviews,
			});
		} catch (err) {
			next(err);
		}
	},
	async deleteById (req, res, next) {
		const { id } = req.params;
		try {
			await ProductModel.findByIdAndRemove(id);
			res.status(200).json({
				status: 200,
				message: 'removed successfully',
			});
		} catch (err) {
			next(err);
		}
	},
};
