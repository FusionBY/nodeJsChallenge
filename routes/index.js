import product from './product';
import users from './users';

export default (app) => {
	app.use('/api/products', product);
	app.use('/api/users', users);
};