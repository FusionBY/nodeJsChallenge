import mongoose from 'mongoose';

const mongoConnect = () => {
	mongoose.Promise = Promise;
	mongoose
		.connect('mongodb://localhost/myDB', { autoIndex: process.env.NODE_ENV !== 'production' })
		.then(() => logger.log('mongodb connected 200 OK'))
		.catch((e) => logger.log(e));
	mongoose.set('debug', true);
};

export default mongoConnect;