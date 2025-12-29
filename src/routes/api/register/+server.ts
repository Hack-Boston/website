import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { validateRegistration } from "$lib/registration";

const submissions: any[] = [];

export const POST: RequestHandler = async ({ request }) => {
	let body: any;
	try {
		body = await request.json();
	} catch {
		return json({ ok: false, error: "Invalid JSON" }, { status: 400 });
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

export const GET: RequestHandler = async () => {
	// return last 20 for debugging
	return json({ ok: true, count: submissions.length, submissions: submissions.slice(-20).reverse() });
};
