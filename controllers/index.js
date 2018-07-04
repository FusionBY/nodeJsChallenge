import psqlControllers from 'postgres-controllers';
import mongoControllers from 'mongo-controllers';
import config from 'config';

let controllers;

if (config.database === 'postgres') {
	controllers = psqlControllers;
}

if (config.database === 'mongo') {
	controllers = mongoControllers;
}

class Controllers {
	constructor (controllers) {
		for (const controller in controllers) {
			this[controller] = controllers[controller];
		}
	}

	getIn (...arr) {
		const controller = arr.reduce((controller, path) => {
			if (!controller) {
				return controller = this[path];
			} else {
				return controller = controller && controller[path];
			}
		}, '');

		if (controller) {
			return controller;
		} else {
			logger.warning(`${config.database} api does not support`, `'${arr.join('/')}'`);
			return (req, res) => res.status(404).json({ message: 'Api does not support' });
		}
	}
}

export default new Controllers(controllers);
