<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Button, Container, Logo, supportEmail } from '$lib';

	interface ErrorCopy {
		title: string;
		heading: string;
		lede: string;
	}

	/** Copy for the status codes a visitor can hit. Other codes use `fallback`. */
	const copyByStatus: Record<number, ErrorCopy> = {
		400: {
			title: 'Bad request',
			heading: 'That request did not make sense.',
			lede: 'The link or form sent something we could not read. Go back and try again.'
		},
		403: {
			title: 'No access',
			heading: 'This page is off limits.',
			lede: 'You do not have access to this page.'
		},
		404: {
			title: 'Page not found',
			heading: 'This page wandered off.',
			lede: 'We could not find the page you asked for. It may have moved, or the link may be wrong.'
		},
		429: {
			title: 'Too many requests',
			heading: 'Slow down a little.',
			lede: 'We got too many requests from you in a short time. Wait a minute, then try again.'
		},
		503: {
			title: 'Down for maintenance',
			heading: 'We will be right back.',
			lede: 'The site is down for a short time. Try again in a few minutes.'
		}
	};

	const fallback: ErrorCopy = {
		title: 'Something went wrong',
		heading: 'Something broke on our end.',
		lede: 'We hit a problem loading this page. Try again in a moment.'
	};

	const copy = $derived(copyByStatus[page.status] ?? fallback);
	// A 404 is usually a bad link, so only other errors ask the visitor to report it.
	const showSupport = $derived(page.status !== 404);
</script>

<svelte:head>
	<title>{copy.title} | HackBoston</title>
</svelte:head>

<!-- +layout.svelte hides the Nav and Footer on this page, so it fills the screen. -->
<section class="flex min-h-dvh items-center bg-bg-forest py-section text-text-on-dark">
	<Container class="flex flex-col items-start gap-8">
		<a href={resolve('/')} class="error__home" aria-label="HackBoston home">
			<Logo tone="light" size="footer" />
		</a>

		<div class="flex flex-col gap-4">
			<p class="error__status eyebrow">Error {page.status}</p>
			<h1 class="display-xl">{copy.heading}</h1>
			<p class="error__lede text-lede">{copy.lede}</p>
			{#if showSupport}
				<p class="error__lede text-lede">
					If this keeps happening, email us at <a href="mailto:{supportEmail}">{supportEmail}</a>.
				</p>
			{/if}
		</div>

		<Button href={resolve('/')} variant="secondary">Back to home</Button>
	</Container>
</section>

<style>
	.error__home {
		display: inline-flex;
		border-radius: 4px;
	}

	.error__home:focus-visible {
		outline: 2px solid var(--text-on-dark);
		outline-offset: 4px;
	}

	.error__status {
		color: var(--accent-green-tint);
	}

	.error__lede {
		max-width: 36rem;
		color: var(--accent-green-tint);
	}

	/* The site-wide mailto hover (accent-green) is too dark on bg-forest. */
	.error__lede a:hover {
		color: var(--text-on-dark);
	}
</style>
