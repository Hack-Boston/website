import { dev } from '$app/environment';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const firstName = String(data.get('firstName') ?? '').trim();
		const email = String(data.get('email') ?? '')
			.trim()
			.toLowerCase();
		const consent = data.get('consent') === 'on';

		const values = { firstName, email, consent };

		if (!firstName) return fail(400, { values, error: 'Add your first name.', field: 'firstName' });
		if (firstName.length > 100) {
			return fail(400, { values, error: 'That name is too long.', field: 'firstName' });
		}
		if (!EMAIL_PATTERN.test(email) || email.length > 254) {
			return fail(400, { values, error: 'Enter a valid email address.', field: 'email' });
		}
		if (!consent) {
			return fail(400, { values, error: 'Tick the box so we can email you.', field: 'consent' });
		}

		// TODO: store the signup. Until then, production refuses signups instead of dropping them.
		if (dev) {
			console.info('[notify] signup not stored:', { firstName, email });
		} else {
			return fail(503, {
				values,
				error: 'We could not save your email. Try again later, or write to team@hackboston.dev.',
				field: null
			});
		}

		return { success: true };
	}
};
