import { urlencoded } from 'express';
import cookieParser from './cookieParser';
import queryParser from './queryParser';

export default (app) => {
	app.use(cookieParser);
	app.use(queryParser);
	app.use(urlencoded({ extended: true }));
}