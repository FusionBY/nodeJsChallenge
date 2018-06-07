import parseCSV from '../helpers/parseCSV';
import fs from 'fs';

export default class Importer {
	constructor (eventEmitter) {
		this.eventEmitter = eventEmitter;
		eventEmitter.on('dirWathcer:changed', (filePath) => this.import(filePath));
	}

	import (path) {
		fs.readFile(path, (err, data) => {
			if (err) {
				throw new Error();
			}

			const jsonObj = parseCSV(data);
			this.emitData(jsonObj);
		});
	}

	importSync (path) {
		const data = fs.readFileSync(path);
		const jsonObj = parseCSV(data);
		this.emitData(jsonObj);
	}

	emitData (promise) {
		return this.eventEmitter.emit('log:data', promise);
	}
}
