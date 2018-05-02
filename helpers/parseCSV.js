export default function parseCSV (data, offset = 1, withHeaders = true) {
	const string = data.toString();
	let headers = [];
	const result = string.replace(/[\r]/g, '').split(/[\n]/g).reduce((result, curLine, i) => {
		if (offset && i === offset - 1) {
			return result;
		}

		const stringToArr = curLine.split(',').map((elem) => elem.replace(/"/g, ''));

		if (withHeaders && i === 1) {
			headers = stringToArr;
			return result;
		}

		const curObj = stringToArr.reduce((parsedElem, elem, index) => {
			const header = headers[index];
			parsedElem[header] = elem;
			return parsedElem;
		}, {});
		result.push(curObj);
		return result;
	}, []);

	return JSON.stringify(result, null, 2);
}