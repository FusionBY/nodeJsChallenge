import EventEmitter from 'eventemitter2';
const eventEmitter = new EventEmitter();

import * as config from './config';
import { Product, User, DirWatcher, Importer } from './models';

console.log('config-name:', config.name);

const user = new User();
const product = new Product();
const dirWatcher = new DirWatcher('data', 3000, eventEmitter);
const importer = new Importer(eventEmitter);

eventEmitter.on('log:data', (data) => console.log(data));