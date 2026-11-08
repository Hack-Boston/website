import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import type { NotifyStatus } from '$lib/notify';
import type { RequestHandler } from './$types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LOOPS_FIND_URL = 'https://app.loops.so/api/v1/contacts/find';

interface LoopsContact {
	subscribed: boolean;
	optInStatus: 'accepted' | 'pending' | 'rejected' | null;
}

/** Looks up an email in Loops. The API key must stay server-side, so the page calls this. */
export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch(() => null);
	const email = String(body?.email ?? '')
		.trim()
		.toLowerCase();
	if (!EMAIL_PATTERN.test(email) || email.length > 254) {
		return json({ error: 'Invalid email' }, { status: 400 });
	}

	const status = (s: NotifyStatus) => json({ status: s });

	if (!env.LOOPS_API_KEY) {
		console.warn('[notify] LOOPS_API_KEY is not set, skipping signup check');
		return status('unknown');
	}

	try {
		const res = await fetch(`${LOOPS_FIND_URL}?email=${encodeURIComponent(email)}`, {
			headers: { Authorization: `Bearer ${env.LOOPS_API_KEY}` }
		});
		if (!res.ok) {
			console.error('[notify] Loops lookup failed:', res.status, await res.text());
			return status('unknown');
		}

		const [contact] = (await res.json()) as LoopsContact[];
		if (!contact) return status('new');
		if (contact.optInStatus === 'pending') return status('pending');
		if (contact.optInStatus === 'rejected' || !contact.subscribed) return status('unsubscribed');
		return status('subscribed');
	} catch (err) {
		console.error('[notify] Loops lookup failed:', err);
		return status('unknown');
	}
};
