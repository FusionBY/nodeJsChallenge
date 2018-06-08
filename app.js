import express from 'express';

import routes from './routes';
import middlewares from './middlewares';

const app = express();
middlewares(app);
routes(app);

app.get('/', function (req, res) {
	res.send(JSON.stringify(req.parsedQuery || 'You can add some query to url'));
});

export default app;
