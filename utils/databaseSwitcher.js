import postgres from 'postgres';
import mongo from 'mongo';

const databaseSwitcher = (db) => {
	if (db === 'mongo') {
		return Promise.resolve(mongo());
	}

	if (db === 'postgres') {
		return postgres.sequelize.sync();
	}
};

export default databaseSwitcher;