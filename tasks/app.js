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
