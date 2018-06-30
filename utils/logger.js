const logger = {
	log: (...msg) => console.log('\x1b[36m%s\x1b[0m', '[LOG]:', ...msg),
	error: (...msg) => console.log('\x1b[31m%s\x1b[0m', '[ERROR]:', ...msg),
	warning: (...msg) => console.log('\x1b[33m%s\x1b[0m', '[WARNING]:', ...msg),
};

global.logger = logger;