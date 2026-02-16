import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		rules: {
			// Relax overly strict rules for SvelteKit
			'svelte/no-navigation-without-resolve': 'off',
			'svelte/no-at-html-tags': 'warn',
			'svelte/require-each-key': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_|^\\$\\$(props|restProps|slots|events)'
				}
			],
			'@typescript-eslint/no-explicit-any': 'warn'
		}
	},
	{
		files: ['**/*.d.ts', 'src/lib/types/**'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off'
		}
	},
	{
		ignores: [
			'build/',
			'.svelte-kit/',
			'dist/',
			'.netlify/',
			'node_modules/',
			'*.config.js',
			'*.config.ts',
			'playwright-report/',
			'test-results/'
		]
	}
];
