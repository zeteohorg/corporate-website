// Minimal Node.js polyfills for browser environment
export const fs = {
	readFileSync: () => '',
	existsSync: () => false,
	readdirSync: () => [],
	statSync: () => ({
		isDirectory: () => false,
		isFile: () => false
	})
};

export const path = {
	join: (...parts: string[]) => parts.join('/'),
	resolve: (...parts: string[]) => parts.join('/'),
	dirname: (p: string) => p.split('/').slice(0, -1).join('/'),
	basename: (p: string) => p.split('/').pop() || '',
	extname: (p: string) => {
		const base = path.basename(p);
		const i = base.lastIndexOf('.');
		return i < 0 ? '' : base.slice(i);
	}
};

export const process = {
	cwd: () => '/',
	env: { NODE_ENV: 'production' }
};

export const Buffer = {
	from: (data: string) => ({ toString: () => data })
};

export const util = {
	promisify: (fn: Function) => fn,
	types: {
		isPromise: (obj: any) => obj && typeof obj.then === 'function'
	}
};
