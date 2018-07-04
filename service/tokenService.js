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

	async getNewRefreshId () {
		return await crypto.randomBytes(5).toString('hex');
	}

	async getTokens (payload, refreshId) {
		if (!payload.username || !payload.id) {
			throw new Error('Check getTokens interface');
		}
		if (!refreshId) {
			refreshId =  await this.getNewRefreshId();
		};
		return {
			access: this.getAccessToken(payload),
			refresh: this.getRefreshToken({ ...payload, refreshId }),
			refreshId,
		};
	}
}

export default new TokenService();
