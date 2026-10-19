<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import bugLight from '$lib/assets/bug-light.svg';
	import { Button, Container } from '$lib';

	const notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{notFound ? 'Page not found' : 'Something went wrong'} | HackBoston</title>
</svelte:head>

<!-- Nav and Footer come from +layout.svelte. The forest band runs into the forest footer,
     so only the bug shows here: the footer already has the full wordmark. -->
<section class="flex min-h-[60dvh] items-center bg-bg-forest py-section text-text-on-dark">
	<Container class="flex flex-col items-start gap-8">
		<img class="error__bug" src={bugLight} alt="" width="500" height="500" />

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
	.error__bug {
		width: 120px;
		height: 120px;
	}

	.error__status {
		color: var(--accent-green-tint);
	}

	.error__lede {
		max-width: 36rem;
		color: var(--accent-green-tint);
	}
</style>
