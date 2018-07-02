import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
	productName: { type: String },
	reviews: { type: Array },
	lastModifiedDate: { type: Date },
});

export default mongoose.model('Product', ProductSchema);
