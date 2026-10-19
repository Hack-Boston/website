<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Button, Container, Logo } from '$lib';

	const notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{notFound ? 'Page not found' : 'Something went wrong'} | HackBoston</title>
</svelte:head>

<!-- +layout.svelte hides the Nav and Footer on this page, so it fills the screen. -->
<section class="flex min-h-dvh items-center bg-bg-forest py-section text-text-on-dark">
	<Container class="flex flex-col items-start gap-8">
		<a href={resolve('/')} class="error__home" aria-label="HackBoston home">
			<Logo tone="light" size="footer" />
		</a>

		<div class="flex flex-col gap-4">
			<p class="error__status eyebrow">Error {page.status}</p>
			<h1 class="display-xl">
				{#if notFound}
					This page wandered off.
				{:else}
					Something went wrong.
				{/if}
			</h1>
			<p class="error__lede text-lede">
				{#if notFound}
					We could not find the page you asked for. It may have moved, or the link may be wrong.
				{:else}
					We hit a problem loading this page. Try again in a moment.
				{/if}
			</p>
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
</style>
