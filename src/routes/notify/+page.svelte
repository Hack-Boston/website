<script lang="ts">
	import { tick } from 'svelte';
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { Button, PageHeader, Section } from '$lib';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let submitting = $state(false);

	const values = $derived(form && 'values' in form ? form.values : undefined);
	const error = $derived(form && 'error' in form ? form.error : undefined);
	const errorField = $derived(form && 'field' in form ? form.field : undefined);
	const contactEmail = $derived(form && 'contactEmail' in form ? form.contactEmail : undefined);

	const steps = [
		{ title: 'We lock in the date and venue', body: 'Once both are set, they go on the site.' },
		{
			title: 'You get the first email',
			body: 'Registration opens for the list before we announce it anywhere else.'
		},
		{ title: 'You apply', body: 'The full application takes about five minutes.' }
	];
</script>

<svelte:head>
	<title>Get notified - HackBoston</title>
	<meta name="description" content="Get notified when registration opens for HackBoston." />
</svelte:head>

{#if form?.success}
	<PageHeader
		title="You're on the list."
		lede="We'll email you when registration opens. Nothing else in between."
	/>

	<Section>
		<div class="notify-grid">
			<aside class="flex flex-col gap-1">
				<h2 class="eyebrow text-accent-green">No email?</h2>
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
		<div class="notify-grid">
			<aside class="flex flex-col gap-6">
				<div class="flex flex-col gap-1">
					<h2 class="eyebrow text-accent-green">What you'll get</h2>
					<p class="text-text-muted">
						Big announcements only: dates, venue, and when applications open. Unsubscribe anytime.
					</p>
				</div>
			</aside>

			<form
				method="POST"
				class="flex flex-col gap-8"
				novalidate
				use:enhance={() => {
					submitting = true;
					return async ({ update, result }) => {
						await update();
						submitting = false;
						if (result.type === 'success') {
							await tick();
							window.scrollTo({ top: 0 });
							document.getElementById('main')?.focus();
						}
					};
				}}
			>
				<div class="grid gap-6 sm:grid-cols-2">
					<div class="field">
						<label for="firstName" class="eyebrow">First name</label>
						<input
							id="firstName"
							name="firstName"
							type="text"
							autocomplete="given-name"
							placeholder="Ada"
							required
							maxlength="100"
							value={values?.firstName ?? ''}
							aria-invalid={errorField === 'firstName' || undefined}
							aria-describedby={errorField === 'firstName' ? 'notify-error' : undefined}
						/>
					</div>
					<div class="field">
						<label for="email" class="eyebrow">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							inputmode="email"
							placeholder="you@school.edu"
							required
							value={values?.email ?? ''}
							aria-invalid={errorField === 'email' || undefined}
							aria-describedby={errorField === 'email' ? 'notify-error' : undefined}
						/>
					</div>
				</div>

				{#if error}
					<p id="notify-error" class="text-state-error" role="alert">
						{error}
						{#if contactEmail}
							<a href="mailto:{contactEmail}">{contactEmail}</a>.
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

	.consent {
		display: flex;
		align-items: center;
		gap: 12px;
		cursor: pointer;
	}

	.consent input {
		appearance: none;
		display: grid;
		place-content: center;
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		margin: 0;
		border: 1.5px solid var(--bg-forest);
		border-radius: 4px;
		background: transparent;
		cursor: pointer;
	}

	.consent input:checked {
		background: var(--bg-forest);
	}

	.consent input:checked::after {
		content: '';
		width: 10px;
		height: 6px;
		margin-top: -2px;
		border-left: 2px solid var(--text-on-dark);
		border-bottom: 2px solid var(--text-on-dark);
		transform: rotate(-45deg);
	}

	.consent input[aria-invalid='true'] {
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
