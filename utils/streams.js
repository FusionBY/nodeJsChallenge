// ######
// node ./utils/streams.js --action=reverse || transform
// node ./utils/streams.js --action=outputFile || -f=./data.test.csv
// node ./utils/streams.js --action=outputFile -f=./data.test.csv
// node ./utils/streams.js --action=buildCSS -p=./css


const csvParser = require('csv-parser');
const fs = require('fs');
const through2 = require('through2');

const cyan = '\x1b[36m%s\x1b[0m';
const redError = '\x1b[41m%s\x1b[0m';
const actions = {
	reverse: { action: reverse, msg: '\nType text for revese: ' },
	transform: { action: transform, msg: '\nType text for transform: ' },
	outputFile: { action: outputFile, msg: '\nRead stream working...\n' },
	convertFromFile: { action: convertFromFile, msg: '\nConvert from csv working...\n' },
	convertToFile: { action: convertToFile, msg: '\nConvert from csv to file working...\n' },
	buildCSS: { action: buildCSS, msg: '\nCSS starts building...\n' },
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
	let actionName, filePath, dirPath;
	const args = process.argv.slice(2);
	const firstArg = args[0] && args[0].search(/--help|-h/);

	if (firstArg !== -1) {
		if (!firstArg) {
			console.log('******* You should send at least one argument! *******');
		}
		return console.log('******* HELP ******* \n ** Message **');
	}

	process.argv.forEach((arg) => {
		if (arg.search(/--action|-a/) !== -1) {
			return ([, actionName] = arg.split('='));
		}
		if (arg.search(/--file|-f/) !== -1) {
			return ([, filePath] = arg.split('='));
		}
		if (arg.search(/--path|-p/) !== -1) {
			return ([, dirPath] = arg.split('='));
		}
	});

	if (!actions[actionName]) {
		return console.log('*** Action not found ***');
	}

	const { action, msg } = actions[actionName];
	console.log(cyan, msg);
	action && fileExistMiddlware(dirPath || filePath, action);
})();

function reverse () {
	process.stdin.on('data', (str) => {
		process.stdout.write(
			str
				.toString()
				.split('')
				.reverse()
				.join('')
		);
		process.stdout.write('\n');
		process.exit();
	});
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
		.on('data', (data) => console.log(data.toString()));
}

function convertFromFile (filePath) {
	if (!filePath.search(/\.csv$/) === -1) {
		console.log(redError, '\nPlease check file extension.\n');
	}
	fs
		.createReadStream(filePath)
		.pipe(csvParser())
		.on('data', function (data) {
			console.log(data);
		})
		.on('end', () => console.log(cyan, '\n>>> Stream reading end. <<<\n'));
}

function convertToFile (filePath) {
	if (!filePath.search(/\.csv$/) === -1) {
		console.log(redError, '\nPlease check file extension.\n');
	}

	const writeStream = fs.createWriteStream(filePath.replace(/\.csv$/, '.json'));
	fs
		.createReadStream(filePath)
		.pipe(csvParser())
		.on('data', function (data) {
			writeStream.write(JSON.stringify(data) + '\n');
		})
		.on('end', () => console.log(cyan, '\n>>> Stream reading end. <<<\n'));
}


// all files reads parallel?
// Can css become invalid becouse bundle will be write like:
// body { (#fistFile) body{ background: red (#secondFile) ??

function buildCSS (dirPath) {
	const cssArr = fs.readdirSync(dirPath);
	const writeStream = fs.createWriteStream(dirPath + '/bundle.css');

	cssArr.forEach((filePath) => {
		fs.createReadStream(dirPath + '/' + filePath)
			.on('data', function (data) {
				writeStream.write(data);
			})
			.on('end', () => console.log(cyan, '\n>>> Stream reading end. <<<'));
	});
}
