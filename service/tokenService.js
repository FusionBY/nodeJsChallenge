import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from 'config';

class TokenService {
	getAccessToken (payload) {
		return jwt.sign(payload, config.secret, { expiresIn: config.tokenLife });
	}

	getRefreshToken (payload) {
		return jwt.sign(payload, config.secret, { expiresIn: config.refTokenLife });
	}

	async getRefreshId () {
		return await crypto.randomBytes(5).toString('hex');
	}

	async getTokens (payload) {
		return {
			access: this.getAccessToken(payload),
			refresh: this.getRefreshToken(payload),
			refreshId: await this.getRefreshId(),
		};
	}
}

export default new TokenService();
