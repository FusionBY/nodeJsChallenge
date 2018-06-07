export default class Product {
	constructor (id = Date.now(), reviews = {}) {
		this._id = id;
		this.reviews = reviews;
	}
}
