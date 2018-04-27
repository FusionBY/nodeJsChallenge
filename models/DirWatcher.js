import fs from 'fs';

export default class DirWatcher {
	constructor (path, delay, eventEmitter) {
		this.watchedFiles = [];
		this.eventEmitter = eventEmitter;
		this.watch(path, delay);
	}

	watch (dirPath, delay) {
		const watchInterval = (callback) => setInterval(callback, delay);
		const checkFolder = () =>
			fs.readdir(dirPath, (err, watchingFiles) => {
				if (err) {
					throw new Error(err);
				}

				watchingFiles.forEach((fileName) => {
					if (fileName.indexOf('csv') === -1) {
						return;
					}

					const lastModified = fs.statSync(`${dirPath}/${fileName}`).mtime.getTime();
					const matchedFile = this.watchedFiles.find(({ name }) => name === fileName);
					let matchedFileIndex;
					if (matchedFile) {
						matchedFileIndex = this.watchedFiles.findIndex(({ name }) => name === fileName);
					}
					const isModified = matchedFile && matchedFile.lastModified !== lastModified;

					if (!matchedFile || isModified) {
						const newFile = { name: fileName, lastModified };
						if (isModified) {
							this.watchedFiles[matchedFileIndex] = newFile;
						} else {
							this.watchedFiles.push(newFile);
						}
						const filePath = `${dirPath}/${fileName}`;
						return this.eventEmitter.emit('dirWathcer:changed', filePath);
					}
				});
			});

		watchInterval(checkFolder);
	}
}
