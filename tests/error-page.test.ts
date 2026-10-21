import { expect, test } from '@playwright/test';

test('unknown path shows the full-screen 404 page', async ({ page }) => {
	const response = await page.goto('/this-page-does-not-exist');

	expect(response?.status()).toBe(404);
	await expect(page).toHaveTitle('Page not found | HackBoston');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page wandered off.');
	await expect(page.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
	// No Nav or Footer on the error page.
	await expect(page.locator('header.nav')).toHaveCount(0);
	await expect(page.locator('footer')).toHaveCount(0);
	// A bad link is not our bug, so no support email.
	await expect(page.getByRole('link', { name: 'support@hackboston.dev' })).toHaveCount(0);
});

test('normal pages still have the Nav and Footer', async ({ page }) => {
	await page.goto('/');

	await expect(page.locator('header.nav')).toHaveCount(1);
	await expect(page.locator('footer')).toHaveCount(1);
});

test('the Pages function bundle is not served as a static file', async ({ request }) => {
	for (const path of ['/_worker.js', '/_routes.json']) {
		const response = await request.get(path);
		expect(response.status(), path).toBe(404);
	}
});

test('missing static files return 404', async ({ request }) => {
	// Pages serves these paths from the static files, not the SvelteKit function.
	for (const path of ['/_app/immutable/does-not-exist.js', '/images/does-not-exist.png']) {
		const response = await request.get(path);
		expect(response.status(), path).toBe(404);
	}
});
