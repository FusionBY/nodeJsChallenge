import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import models from 'models';
import config from 'config';

const initPassport = () => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'username',
				passwordField: 'password',
			},
			async (username, password, cb) => {
				try {
					const user = await models.user.findOne({ where: { username } });
					await models.user.comparePassword(password, user.password);
					return cb(null, user, { message: 'Logged In Successfully' });
				} catch (err) {
					return cb(false, null, { message: 'Wrong login or password' });
				}
			}
		)
	);

	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: config.secret,
			},
			async (jwtPayload, cb) => {
				const { username } = jwtPayload;
				try {
					const user = await models.user.findOne({ where: { username } });
					return cb(null, user, { message: 'Logged In Successfully' });
				} catch (err) {
					return cb(false, null, { message: 'Token expired.' });
				}
			}
		)
	);

	passport.use(
		new FacebookStrategy(
			{
				clientID: 1760403607373072,
				clientSecret: '12b0919c7da99797cc9bc0090cd26a3b',
				callbackURL: 'http://localhost:3050/api/auth/facebook',
			},
			(accessToken, refreshToken, profile, cb) => {
				cb(null, profile);
			}
		)
	);
};

export default initPassport;