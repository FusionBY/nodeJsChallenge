import city from './city.controller';
import user from './user.controller';
import product from './product.controller';
import signUp from './auth/signUp.controller';
import signIn from './auth/signIn.controller';
import logout from './auth/logout.controller';
import refreshToken from './auth/refreshToken.controller';

export default {
	city,
	user,
	signUp,
	signIn,
	logout,
	refreshToken,
	product,
};