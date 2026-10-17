<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { Button, PageHeader, Section } from '$lib';

	const steps = [
		{ title: 'We read it', text: 'The team reviews every application by hand.' },
		{
			title: 'You hear back',
			text: 'Decisions go out by email once the date and venue are set.'
		},
		{
			title: 'Confirm your spot',
			text: 'Accepted? Confirm by the deadline in the email so we can plan food and swag.'
		}
	];
</script>

<svelte:head>
	<title>HackBoston - Application submitted</title>
</svelte:head>

<!-- Figma "Register / Submitted" (79:472). -->
<PageHeader
	title="You’re in the queue."
	lede="Your application is in. We sent a copy to your email."
/>

<Section containerClass="submitted">
	<aside class="submitted__aside">
		<h2 class="eyebrow text-accent-green">What happens next</h2>
		<p>
			Didn’t get the email? Check spam, then write to
			<a href="mailto:team@hackboston.dev">team@hackboston.dev</a>.
		</p>
	</aside>

	<div class="flex flex-col gap-12">
		<ol class="steps">
			{#each steps as step, i (step.title)}
				<li class="step">
					<span class="step__num">{String(i + 1).padStart(2, '0')}</span>
					<div class="flex flex-col gap-1">
						<h3 class="display-m">{step.title}</h3>
						<p class="text-text-muted">{step.text}</p>
					</div>
				</li>
			{/each}
		</ol>

		<div class="flex flex-wrap gap-4">
			<Button href={resolve('/')}>Back to home</Button>
			<Button href={resolve('/faq' as Pathname)} variant="secondary">Read the FAQ</Button>
		</div>
	</div>
</Section>

<style>
	:global(.submitted) {
		display: grid;
		gap: 48px;
	}

	@media (min-width: 1024px) {
		:global(.submitted) {
			grid-template-columns: 280px minmax(0, 1fr);
			column-gap: 96px;
		}
	}

	.submitted__aside {
		color: var(--text-muted);
	}

	.submitted__aside h2 {
		margin: 0 0 8px;
	}

	.submitted__aside p {
		margin: 0;
	}

	.submitted__aside a {
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.steps {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.step {
		display: flex;
		gap: 24px;
		padding: 24px 0;
		border-top: 1px solid var(--text-ink);
	}

	.step:first-child {
		padding-top: 20px;
	}

	.step__num {
		padding-top: 6px;
		font-family: var(--font-label);
		font-weight: 500;
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.step h3,
	.step p {
		margin: 0;
	}
</style>
