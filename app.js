import express from 'express';
import logger from 'utils/logger'; // global logger

import routes from './routes';
import middlewares from './middlewares';

const app = express();
middlewares(app);
routes(app);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

export default app;
