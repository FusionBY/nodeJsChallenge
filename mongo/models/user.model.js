import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { tokenService } from 'service';

const UserSchema = new Schema({
	username: { type: String },
	password: { type: String },
	refreshTokens: { type: Array },
	lastModifiedDate: { type: Date },
});

UserSchema.methods.saveWithHash = async function () {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(this.password, salt);
	this.password = hash;
	return this.save();
};

UserSchema.methods.addRefreshToken = async function () {
	const { username, _id } = this;
	const token = await tokenService.getTokens({ username, id: _id });
	try {
		this.refreshTokens.push({ id: token.refreshId, refreshToken: token.refresh });
		await this.save();
		return Promise.resolve(token);
	} catch (err) {
		return Promise.reject(err);
	}
};

UserSchema.methods.updateTokens = async function (refreshId, annulToken) {
	const { username, _id } = this;
	const tokenIndex = this.refreshTokens.findIndex((token) => token.id === refreshId);
	try {
		if (annulToken) { // remove token, token was stolen
			this.refreshTokens.splice([tokenIndex], 1);
			this.markModified('refreshTokens');
			return await this.save();
		}
		const token = await tokenService.getTokens({ username, id: _id }, refreshId);

		this.refreshTokens[tokenIndex].refreshToken = token.refresh;
		this.markModified('refreshTokens');
		await this.save();
		return Promise.resolve(token);
	} catch (err) {
		return Promise.reject(err);
	}
};

// UserSchema.pre('saveWithHash', async function (next) {
// 	const salt = await bcrypt.genSalt(10);
// 	const hash = await bcrypt.hash(this.password, salt);
// 	this.password = hash;
// 	next();
// });

const UserModel = mongoose.model('User', UserSchema);

UserModel.comparePassword = async (candidatePassword, hash) => {
	try {
		const isMatched = await bcrypt.compare(candidatePassword, hash);
		if (!isMatched) {
			return Promise.reject();
		} else {
			return Promise.resolve();
		}
	} catch (err) {
		return Promise.reject(err);
	}
};

export default UserModel;