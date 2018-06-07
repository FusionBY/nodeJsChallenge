import express from 'express';
import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';

import productRouter from './routes/product';
import userRouter from './routes/users';

const app = express();
app.use(cookieParser, queryParser, express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.get('/', function (req, res) {
	res.send(JSON.stringify(req.parsedQuery || 'You can add some query to url'));
});

export default app;
