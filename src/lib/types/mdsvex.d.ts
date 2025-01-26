declare module 'mdsvex' {
	export interface CompileOptions {
		remarkPlugins?: any[];
		rehypePlugins?: any[];
		extension?: string;
	}

	export function compile(
		content: string,
		options?: CompileOptions
	): Promise<{
		code?: string;
		data?: {
			fm?: Record<string, any>;
			imports?: Record<string, any>;
		};
	} | null>;
}
