export default function parseCSV (data, withHeaders = true) {
	const string = data.toString();
	let headers = [];
	const result = string.replace(/[\r]/g, '').split(/[\n]/g).slice(0, -1).reduce((result, curLine, i) => {
		const stringToArr = curLine.split(/,(?!\s)/).map((elem) => elem.replace(/"/g, ''));
		if (withHeaders && i === 0) {
			headers = stringToArr;
			return result;
		}
		const curObj = stringToArr.reduce((parsedElem, elem, index) => {
			if (!elem) {
				return parsedElem;
			}

			const header = headers[index];
			parsedElem[header] = elem;
			return parsedElem;
		}, {});
		result.push(curObj);
		return result;
	}, []);

	return JSON.stringify(result, null, 2);
}
