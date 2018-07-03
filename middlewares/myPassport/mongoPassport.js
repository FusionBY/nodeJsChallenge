import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import UserModel from 'mongoose-models/user.model';

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
					const user = await UserModel.findOne({ username });
					await UserModel.comparePassword(password, user.password);
					return cb(null, user, { message: 'Logged In Successfully' });
				} catch (err) {
					return cb(false, null, { message: 'Wrong login or password' });
				}
			}
		)
	);
};

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.secret,
			passReqToCallback: true,
		},
		async (req, jwtPayload, cb) => {
			const [, token] = req.headers.authorization.split(' '); // original token from headers
			try {
				return cb(null, jwtPayload, { message: 'Logged In Successfully', token });
			} catch (err) {
				return cb(false, null, { message: 'Token expired.' });
			}
		}
	)
);

passport.use(
	new GoogleStrategy(
		{
			clientID: '1004263443248-oa6sg12k08tp9eau38914rp2p16h7gle.apps.googleusercontent.com',
			clientSecret: 'MbYqTBfzyrpZ2Q4356PH4gi4',
			callbackURL: 'http://localhost:3050/api/auth/google/callback',
		},
		(accessToken, refreshToken, profile, cb) => {
			cb(null, profile);
		}
	)
);

export default initPassport;
