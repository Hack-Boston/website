import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// Pages allows 100 rules in _routes.json. The default lists every static file
			// one by one and already reaches 100, so exclude the static folders as globs.
			routes: {
				include: ['/*'],
				exclude: [
					'<build>',
					'<prerendered>',
					'<redirects>',
					'/assets/*',
					'/fonts/*',
					'/images/*',
					'/robots.txt'
				]
			}
		})
	}
};

export default config;
