import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
	const User = sequelize.define(
		'user',
		{
			username: {
				type: DataTypes.STRING,
				unique: true,
			},
			password: DataTypes.STRING,
			refreshTokens: {
				type: DataTypes.TEXT,
				get () {
					return JSON.parse(this.getDataValue('refreshTokens'));
				},
				set (val) {
					return this.setDataValue('refreshTokens', JSON.stringify(val));
				},
			},
		},
		{}
	);
	User.associate = function (models) {
		// associations can be defined here
	};

	User.comparePassword = async (candidatePassword, hash) => {
		try {
			const isMatched = await bcrypt.compare(candidatePassword, hash);
			if (!isMatched) {
				return Promise.reject();
			} else {
				return Promise.resolve();
			}
		} catch (err) {
			return err;
		}
	};

	User.beforeCreate(async (user) => {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(user.password, salt);
		user.password = hash;
	});

	return User;
};
