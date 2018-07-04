import express from 'express';
import logger from 'utils/logger'; // global logger
import globalErrorHandler from 'middlewares/globalErrorHandler';

import routes from './routes';
import middlewares from './middlewares';

const app = express();
middlewares(app);
routes(app);
app.use(globalErrorHandler);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

export default app;
