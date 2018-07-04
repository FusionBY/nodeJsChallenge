import app from './app';
import databaseSwitcher from './utils/databaseSwitcher';
import config from 'config';

const port = process.env.PORT || 8080;

databaseSwitcher(config.database).then(() => {
	app.listen(port, () => {
		logger.log(`App listening on port ${port}!`);
	});
});