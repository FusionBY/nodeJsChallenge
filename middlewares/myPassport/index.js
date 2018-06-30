import config from 'config';
import psqlPassport from './psqlPassport';
import mongoPassport from './mongoPassport';

if (config.database === 'postgres') {
	psqlPassport();
}


if (config.database === 'mongo') {
	mongoPassport();
}