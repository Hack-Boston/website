import { defineConfig } from '@playwright/test';

// Runs against the built site in workerd (wrangler pages dev), the same runtime as production.
export default defineConfig({
	testDir: 'tests',
	use: { baseURL: 'http://localhost:8788' },
	webServer: {
		command: 'npm run build && npx wrangler pages dev .svelte-kit/cloudflare --port 8788',
		url: 'http://localhost:8788',
		reuseExistingServer: !process.env.CI,
		timeout: 120_000
	}
});
