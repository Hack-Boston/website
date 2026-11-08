/** Loops form endpoint (Loops > Forms > Settings > Form Endpoint). Public, no API key. */
export const LOOPS_FORM_URL = 'https://app.loops.so/api/newsletter-form/cmvdd4bqn09hl0jvp19ick32l';

/**
 * Where an email stands on the notify list, from /notify/status:
 * - new: not in Loops, so the form signs them up.
 * - pending: signed up but has not clicked the double opt-in link yet.
 * - subscribed: already on the list.
 * - unsubscribed: unsubscribed or declined the opt-in. The form endpoint can't resubscribe them.
 * - unknown: the lookup failed or LOOPS_API_KEY is missing. The form signs them up as normal.
 */
export type NotifyStatus = 'new' | 'pending' | 'subscribed' | 'unsubscribed' | 'unknown';
