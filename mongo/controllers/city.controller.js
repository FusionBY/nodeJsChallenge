import CityModel from 'mongoose-models/city.model';

export default {
	async all (req, res, next) {
		try {
			const cities = await CityModel.getRandom();
			res.status(200).json({ status: 200, data: cities, message: 'success' });
		} catch (err) {
			next(err);
		}
 	},
	async add (req, res, next) {
		const newCity = new CityModel(...req.body);
		try {
			const city = await newCity.save();
			res.status(200).json({ status: 200, data: city, message: 'success' });
		} catch (err) {
			next(err);
		}
	},
	async updateOrCreate (req, res, next) {
		const { id } = req.params;
		try {
			const matchedCity = await CityModel.findById(id);

			if (!matchedCity) {
				const newCity = new CityModel(...req.body);
				await newCity.save();
				res.status(200).json({ status: 200, data: newCity, message: 'Created successfully' });
			}
			const fields = { ...req.body };
			delete fields._id;
			const updatedCity = await matchedCity.update(fields);

			res.status(200).json({ status: 200, data: updatedCity, message: 'Updated successfully' });
		} catch (err) {
			next(err);
		}
	},
	async removeOne (req, res, next) {
		const { id } = req.params;
		try {
			let message = 'Removed successfully';
			const data = await CityModel.findByIdAndRemove(id);
			if (!data) {
				message = 'Already removed. City not found.';
			}
			res.status(200).json({ status: 200, data, message });
		} catch (err) {
			next(err);
		}
	},
};
