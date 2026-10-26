<script lang="ts">
	import { tick } from 'svelte';
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { Button, PageHeader, Section } from '$lib';
	import type { NotifyStatus } from '$lib/notify';

	/** Loops form endpoint (Loops > Forms > Settings > Form Endpoint). Public, no API key. */
	const LOOPS_FORM_URL = 'https://app.loops.so/api/newsletter-form/cmvdd4bqn09hl0jvp19ick32l';
	const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const CONTACT_EMAIL = 'team@hackboston.dev';

	let firstName = $state('');
	let email = $state('');
	let submitting = $state(false);
	let done = $state(false);
	let error = $state<string>();
	let errorField = $state<'firstName' | 'email'>();
	/** Show the contact email after the error, for failures the visitor can't fix. */
	let showContact = $state(false);
	/** Set when the email is already in Loops, so we don't sign them up again. */
	let existing = $state<Exclude<NotifyStatus, 'new' | 'unknown'>>();

	/** Asks our server whether the email is already signed up. Never blocks a signup if it fails. */
	async function checkStatus(address: string): Promise<NotifyStatus> {
		try {
			const res = await fetch(resolve('/notify/status'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: address })
			});
			if (!res.ok) return 'unknown';
			return ((await res.json()) as { status: NotifyStatus }).status;
		} catch {
			return 'unknown';
		}
	}

	function setError(message: string, field?: 'firstName' | 'email', contact = false) {
		error = message;
		errorField = field;
		showContact = contact;
	}

	async function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		if (submitting) return;

		const name = firstName.trim();
		const address = email.trim().toLowerCase();
		if (!name) return setError('Add your first name.', 'firstName');
		if (!EMAIL_PATTERN.test(address)) return setError('Enter a valid email address.', 'email');

		error = undefined;
		errorField = undefined;
		existing = undefined;
		submitting = true;

		try {
			const status = await checkStatus(address);
			if (status !== 'new' && status !== 'unknown') {
				existing = status;
				return;
			}

			const res = await fetch(LOOPS_FORM_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({
					firstName: name,
					email: address,
					source: 'Website: notify page'
				})
			});

			if (res.ok) {
				done = true;
				await tick();
				window.scrollTo({ top: 0 });
				document.getElementById('main')?.focus();
			} else if (res.status === 429) {
				setError('Too many signups from your network. Try again in a minute.');
			} else {
				const data = await res.json().catch(() => null);
				console.error('[notify] Loops rejected signup:', res.status, data);
				setError(
					data?.message ?? 'We could not save your email. Try again later, or write to',
					undefined,
					!data?.message
				);
			}
		} catch (err) {
			// Loops' rate limiter answers without CORS headers, so it surfaces as a network error.
			console.error('[notify] Loops request failed:', err);
			setError(
				'We could not reach our mailing list. Try again in a minute, or write to',
				undefined,
				true
			);
		} finally {
			submitting = false;
		}
	}

	const steps = [
		{
			title: 'You confirm your email',
			body: 'Click the link in the email we just sent. We only email you after you confirm.'
		},
		{
			title: 'We lock in the date and venue',
			body: 'Once both are set, they go on the site.'
		},
		{
			title: 'You get the first email',
			body: 'Registration opens for the list before we announce it anywhere else.'
		}
	];
</script>

<svelte:head>
	<title>Get notified - HackBoston</title>
	<meta name="description" content="Get notified when registration opens for HackBoston." />
</svelte:head>

{#if done}
	<PageHeader
		title="Check your inbox."
		lede="We sent you a link to confirm your email. Click it and you're on the list."
	/>

	<Section>
		<div class="notify-grid">
			<aside class="flex flex-col gap-1">
				<h2 class="eyebrow text-accent-green">No confirmation email?</h2>
				<p class="text-text-muted">
					Check spam, then write to
					<a href="mailto:team@hackboston.dev">team@hackboston.dev</a>.
				</p>
			</aside>

			<div class="flex flex-col gap-12">
				<ol class="steps">
					{#each steps as step, i (step.title)}
						<li class="step">
							<span class="label-mono text-xs text-accent-green">0{i + 1}</span>
							<div class="flex flex-col gap-1">
								<h3 class="step__title">{step.title}</h3>
								<p class="text-text-muted">{step.body}</p>
							</div>
						</li>
					{/each}
				</ol>

				<div class="flex flex-wrap gap-4">
					<Button href={resolve('/')}>Back to home</Button>
					<Button href={resolve('/faq' as Pathname)} variant="secondary">Read the FAQ</Button>
				</div>
			</div>
		</div>
	</Section>
{:else}
	<PageHeader
		title="Be the first to know."
		lede="Dates and venue are still being set. Leave your email and we'll tell you the moment registration opens."
	/>

	<Section>
		<div class="notify-grid notify-grid--form">
			<aside class="flex flex-col gap-6">
				<div class="flex flex-col gap-1">
					<h2 class="eyebrow text-accent-green">What you'll get</h2>
					<p class="text-text-muted">
						Big announcements only: dates, venue, and when applications open. Unsubscribe anytime.
					</p>
				</div>
			</aside>

			<!-- Without JavaScript the browser posts straight to Loops, which replies with JSON. -->
			<form method="POST" action={LOOPS_FORM_URL} class="flex flex-col gap-8" novalidate {onsubmit}>
				<div class="flex flex-col gap-6">
					<div class="field flex flex-col gap-1">
						<label for="firstName" class="eyebrow">First name</label>
						<input
							id="firstName"
							name="firstName"
							type="text"
							autocomplete="given-name"
							placeholder="Ada"
							required
							maxlength="100"
							bind:value={firstName}
							aria-invalid={errorField === 'firstName' || undefined}
							aria-describedby={errorField === 'firstName' ? 'notify-error' : undefined}
						/>
						<br>
						<label for="email" class="eyebrow">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							inputmode="email"
							placeholder="you@school.edu"
							required
							maxlength="254"
							bind:value={email}
							aria-invalid={errorField === 'email' || undefined}
							aria-describedby={errorField === 'email' ? 'notify-error' : undefined}
						/>
					</div>
				</div>

				{#if existing === 'subscribed'}
					<p class="text-accent-green" role="status">
						You're already on the list. We'll email you when registration opens.
					</p>
				{:else if existing === 'pending'}
					<p class="text-accent-green" role="status">
						You've already signed up. Click the confirmation link we emailed you (check spam too).
						Can't find it? Write to <a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>.
					</p>
				{:else if existing === 'unsubscribed'}
					<p class="text-accent-green" role="status">
						This email unsubscribed from our updates. To get back on the list, write to
						<a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>.
					</p>
				{/if}

				{#if error}
					<p id="notify-error" class="text-state-error" role="alert">
						{error}
						{#if showContact}
							<a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>.
						{/if}
					</p>
				{/if}

				<div>
					<Button type="submit" disabled={submitting}>
						{submitting ? 'Sending…' : 'Notify me'}
					</Button>
				</div>
			</form>
		</div>
	</Section>
{/if}

<style>
	.notify-grid {
		display: grid;
		gap: 40px;
		padding-block: 16px 32px;
	}

	@media (min-width: 1024px) {
		.notify-grid {
			grid-template-columns: 220px minmax(0, 1fr);
			column-gap: 56px;
		}
	}

	/* Signup view: a narrow centered block, so the fields don't stretch across the page. */
	.notify-grid--form {
		max-width: 400px;
		margin-inline: auto;
	}

	@media (min-width: 1024px) {
		.notify-grid--form {
			max-width: none;
			grid-template-columns: 220px minmax(0, 400px);
			justify-content: center;
		}
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.field input {
		width: 100%;
		height: 48px;
		padding: 0 14px;
		border: 1.5px solid var(--text-ink);
		border-radius: 8px;
		background: transparent;
		color: var(--text-ink);
		font-family: var(--font-body);
		font-size: 1rem;
	}

	.field input::placeholder {
		color: var(--text-muted);
	}

	.field input:focus-visible {
		outline: 2px solid var(--accent-green);
		outline-offset: 2px;
	}

	.field input[aria-invalid='true'] {
		border-color: var(--state-error);
	}

	.steps {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.step {
		display: grid;
		grid-template-columns: 24px 1fr;
		gap: 16px;
		padding-block: 20px 22px;
		border-top: 1px solid var(--text-ink);
	}

	.step > span {
		padding-top: 6px;
	}

	.step__title {
		margin: 0;
		font-family: var(--font-body);
		font-size: 1.5rem;
		font-weight: 400;
		line-height: 1.3;
		color: var(--text-ink);
	}
</style>
