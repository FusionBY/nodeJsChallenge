import EventEmitter from 'events';
const eventEmitter = new EventEmitter();

import * as config from './config';
import { Product, User, DirWatcher, Importer } from './models';

console.log('config-name:', config.name);

new User();
new Product();
new DirWatcher('data', 30000, eventEmitter);
new Importer(eventEmitter);

eventEmitter.on('log:data', (data) => console.log(data));