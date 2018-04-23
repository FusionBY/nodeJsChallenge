import * as config from './config';
import { Product, User } from './models';

console.log('config-name:', config.name);
const user = new User();
const product = new Product();