const database = process.env.DB;

export default {
	secret: 'turbO',
	tokenLife: '30days',
	refTokenLife: 1000 * 60 * 60 * 24 * 60, // 60 days
	database: database || 'mongo', // postgres or mongo
};