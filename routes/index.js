import signUp from './auth/signUp';
import signIn from './auth/signIn';
import facebook from './auth/facebook';
import users from './users';
import product from './product';

export default (app) => {
	app.use('/api/signup', signUp);
	app.use('/api/signin', signIn);
	app.use('/api/users', users);
	app.use('/api/products', product);
	app.use('/api/auth/facebook', facebook);
};