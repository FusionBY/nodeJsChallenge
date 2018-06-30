import mongoose, { Schema } from 'mongoose';

const CitySchema = new Schema({
	name: { type: String },
	country: { type: String },
	capital: { type: Boolean },
	location: { type: Object },
});

export default mongoose.model('City', CitySchema);

