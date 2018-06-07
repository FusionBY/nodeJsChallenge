import EventEmitter from 'events';
const eventEmitter = new EventEmitter();

import * as config from './config';
import { Product, User } from './models';
import { DirWatcher, Importer } from './modules';

console.log('config-name:', config.name);

new User();
new Product();
new DirWatcher('data', 300000, eventEmitter);
new Importer(eventEmitter);

eventEmitter.on('log:data', (data) => console.log(data));

// Express Server

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
