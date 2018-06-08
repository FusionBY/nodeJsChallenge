import crypto from 'crypto';
export default class Product {
	constructor (reviews = {}) {
		this._id = crypto.randomBytes(10).toString('hex');
		this.reviews = reviews;
	}
}
