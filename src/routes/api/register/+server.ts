import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateRegistration, type Registration } from '$lib/registration';

/**
 * In-memory store until the registration backend is decided (#2).
 * It resets on every deploy and is not shared between Workers, so do not open registration on it.
 */
const submissions: (Registration & { id: string; createdAt: string })[] = [];

export const POST: RequestHandler = async ({ request }) => {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
	}

	const result = validateRegistration(body);
	if (!result.ok) {
		return json({ ok: false, errors: result.errors }, { status: 400 });
	}

	const submission = {
		...result.data,
		id: crypto.randomUUID(),
		createdAt: new Date().toISOString()
	};
	submissions.push(submission);

	return json({ ok: true, id: submission.id });
};
