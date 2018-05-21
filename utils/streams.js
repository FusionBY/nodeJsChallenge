// ######
// node ./utils/streams.js --action=reverse || transform
// node ./utils/streams.js --action=outputFile || -f=./data.test.csv
// node ./utils/streams.js --action=outputFile -f=./data.test.csv
// node ./utils/streams.js --action=buildCSS -p=./css

const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');
const through2 = require('through2');
const minimistArgv = require('minimist')(process.argv.slice(2), {
	alias: { action: 'a', file: 'f', path: 'p', help: 'h' },
});

const csv = '.csv';
const cyan = '\x1b[36m%s\x1b[0m';
const redError = '\x1b[41m%s\x1b[0m';
const actions = {
	reverse: { cb: reverse, msg: '\nType text for revese: ' },
	transform: { cb: transform, msg: '\nType text for transform: ' },
	outputFile: { cb: outputFile, msg: '\nRead stream working...\n' },
	convertFromFile: { cb: convertFromFile, msg: '\nConvert from csv working...\n' },
	convertToFile: { cb: convertToFile, msg: '\nConvert from csv to file working...\n' },
	buildCSS: { cb: buildCSS, msg: '\nCSS starts building...\n' },
};

function fileExistMiddlware (filePath, callback) {
	if (!filePath) {
		return callback();
	}

	try {
		fs.statSync(filePath);
		callback(filePath);
	} catch (err) {
		console.log(redError, err);
		return;
	}
}

(() => {
	const { action, file, path } = minimistArgv;
	const [first] = process.argv.slice(2);
	const firstIsHelp = first && first.search(/--help|-h/);

	if (firstIsHelp !== -1) {
		if (!firstIsHelp) {
			console.log('******* You should send at least one argument! *******');
		}
		return console.log('******* HELP ******* \n ** Message **');
	}

	const { cb, msg } = actions[action];

	if (!cb) {
		return console.log('*** action not found ***');
	}

	console.log(cyan, msg);
	cb && fileExistMiddlware(file || path, cb);
})();

function reverse () {
	process.stdin
		.pipe(
			through2((chunk, enc, next) => {
				const str = chunk
					.toString()
					.split('')
					.reverse()
					.join('');
				next(null, str);
			})
		)
		.pipe(
			through2((str) => {
				process.stdout.write(str + '\n');
				process.exit();
			})
		);
}

function transform () {
	const stream = through2(
		function (chunk, enc, next) {
			const result = chunk.toString().toUpperCase();
			this.push(result);
			next();

			// or
			// next(null, result);
		},
		function () {
			console.log('end'); // Doesn't work.
		}
	);

	process.stdin.pipe(stream).pipe(process.stdout);
}

function outputFile (filePath) {
	const stream = fs.createReadStream(filePath);

	stream
		.pipe(
			through2(
				function (chunk, enc, callback) {
					callback(null, chunk);
				},
				function () {
					console.log(cyan, '\n>>> Stream reading end. <<<\n');
				}
			)
		)
		.pipe(process.stdout);
}

function convertFromFile (filePath) {
	const json = {};

	if (path.extname(filePath) !== csv) {
		throw new Error('\nPlease check file extension.\n');
	}
	fs
		.createReadStream(filePath)
		.pipe(csvParser())
		.pipe(
			through2.obj(function (chunk, enc, next) {
				for (const title in chunk) {
					if (title === null) return;
					if (!json[title]) json[title] = [];

					json[title].push(chunk[title]);
				}
				next(null, chunk);
			})
		)
		.on('finish', () => console.log(json));
}

function convertToFile (filePath) {
	if (path.extname(filePath) !== csv) {
		throw new Error('\nPlease check file extension.\n');
	}

	const writeStream = fs.createWriteStream(filePath.replace(/\.csv$/, '.json'));

	const json = {};

	fs
		.createReadStream(filePath)
		.pipe(csvParser())
		.pipe(
			through2.obj(function (chunk, enc, next) {
				for (const title in chunk) {
					if (title === null) return;
					if (!json[title]) json[title] = [];

					json[title].push(chunk[title]);
				}
				next(null, chunk);
			})
		)
		.on('finish', () => writeStream.write(JSON.stringify(json)));
}

function buildCSS (dirPath) {
	const writeStream = fs.createWriteStream(dirPath + '/bundle.css');

	writeStream.on('open', () => {
		fs
			.readdirSync(dirPath)
			.map((path) => dirPath + '/' + path)
			.filter((path) => fs.statSync(path).size)
			.forEach((filePath) => {
				if (filePath.indexOf('nodejs-homework3.css') !== -1) {
					return setImmediate(() => readStream(filePath));
				}
				readStream(filePath);
			});
	});

	writeStream.on('finish', function () {
		console.log(' ---- Writing end ----');
	});

	function readStream (readPath) {
		const readStream = fs
			.createReadStream(readPath)
			.on('end', () => console.log(`Stream read end... [${readPath}]`));
		readStream.pipe(writeStream);
	}
}
