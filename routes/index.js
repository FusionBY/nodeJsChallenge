import signUp from './auth/signUp';
import signIn from './auth/signIn';
import logout from './auth/logout';
import refreshToken from './auth/refreshToken';
import facebook from './auth/facebook';
import users from './users';
import product from './product';
import city from './city';

import isAuth from 'middlewares/isAuth';

export default (app) => {
	app.use('/api/signup', signUp);
	app.use('/api/signin', signIn);
	app.use('/api/logout', isAuth, logout);
	app.use('/api/refreshToken', refreshToken);
	app.use('/api/users', isAuth, users);
	app.use('/api/products', isAuth, product);
	app.use('/api/auth/facebook', facebook);
	app.use('/api/city', city);
};