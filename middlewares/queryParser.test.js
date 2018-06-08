import { customParser } from './queryParser';

describe('queryPareser test:', () => {
	it('should return object with query', () => {
		expect(
			customParser('/?param=test', null, () => {
				return null;
			})
		).toEqual({ param: 'test' });
	});
	it('should return object with query', () => {
		expect(
			customParser('/?param=test&param2=turbo', null, () => {
				return null;
			})
		).toEqual({ param: 'test', param2: 'turbo' });
	});
	it('should return object with query', () => {
		expect(
			customParser('/api/products?param=test&param2=turbo', null, () => {
				return null;
			})
		).toEqual({ param: 'test', param2: 'turbo' });
	});
	it('should return undefined', () => {
		expect(
			customParser('/', null, () => {
				return null;
			})
		).toEqual(undefined);
	});
	it('should return undefined', () => {
		expect(
			customParser('', null, () => {
				return null;
			})
		).toEqual(undefined);
	});
});