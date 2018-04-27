import csv from 'csvtojson';

export default class Importer {
	constructor (eventEmitter) {
		this.eventEmitter = eventEmitter;
		eventEmitter.on('dirWathcer:changed', (filePath) => this.import(filePath));
	}

	import (path) {
		return new Promise((resolve) => {
			csv()
				.fromFile(path)
				.on('json', (jsonObj) => {
					resolve(this.emitData(jsonObj));
				});
		});
	}

	importSync (path) {
		return csv()
			.fromFile(path)
			.on('json', (jsonObj) => {
				return this.emitData(jsonObj);
			});
	}

	emitData (promise) {
		return this.eventEmitter.emit('log:data', promise);
	}
}
