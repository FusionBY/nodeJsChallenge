import signUp from './auth/signUp';
import signIn from './auth/signIn';
import logout from './auth/logout';
import refreshToken from './auth/refreshToken';
import facebook from './auth/facebook';
import google from './auth/google';
import users from './users';
import product from './product';
import city from './city';

import isAuth from 'middlewares/isAuth';

export default (app) => {
	app.use('/api/signup', signUp);
	app.use('/api/signin', signIn);
	app.use('/api/auth/facebook', facebook);
	app.use('/api/auth/google', google);
	app.use('/api/city', city);

	app.use('/api', isAuth);
	app.use('/api/logout', logout);
	app.use('/api/refreshToken', refreshToken);
	app.use('/api/users', users);
	app.use('/api/products', product);
};