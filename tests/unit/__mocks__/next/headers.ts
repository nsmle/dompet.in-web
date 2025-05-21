export const cookies = jest.fn(() => {
	const store = new Map();
	return {
		set: jest.fn((key, value, options) => store.set(key, { value, options })),
		get: jest.fn((key) => store.get(key)),
	};
});
