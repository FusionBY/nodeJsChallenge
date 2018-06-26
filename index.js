import app from './app';
import models from './models';

const port = process.env.PORT || 8080;

models.sequelize.sync().then(() => {
	app.listen(port, () => logger.log(`App listening on port ${port}!`));;
});
