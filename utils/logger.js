const logger = {
	log: (...msg) => console.log('\x1b[36m%s\x1b[0m', '[LOG]:', ...msg),
	error: (...msg) => console.log('\x1b[31m%s\x1b[0m', '[ERROR]:', ...msg),
	warning: (...msg) => console.log('\x1b[33m%s\x1b[0m', '[WARNING]:', ...msg),
	debug: (...msg) => console.log('\x1b[45m%s\x1b[0m', '[DEBUG]:', ...msg),
};

global.logger = logger;