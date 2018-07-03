import mongoose, { Schema } from 'mongoose';

const CitySchema = new Schema({
	name: { type: String },
	country: { type: String },
	capital: {
		type: Boolean,
		required: true,
	},
	location: { type: Object },
	lastModifiedDate: { type: Date },
});

CitySchema.statics.getRandom = async function () {
	const count = await this.count();
	const random = Math.floor(Math.random() * count);
	return await this.findOne().skip(random);
};

export default mongoose.model('City', CitySchema);
