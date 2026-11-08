<script lang="ts">
	import '../main.css';
	import '../app.css';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import { Footer, Nav } from '$lib';

	let { children } = $props();

	// The error page (+error.svelte) is a full-screen page with no Nav or Footer.
	const chrome = $derived(!page.error);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a href="#main" class="skip-link">Skip to content</a>

<div class="flex min-h-dvh flex-col">
	{#if chrome}
		<Nav />
	{/if}
	<main id="main" tabindex="-1" class="flex-1 focus:outline-none">
		{@render children()}
	</main>
	{#if chrome}
		<Footer />
	{/if}
</div>

<style>
	.skip-link {
		position: absolute;
		top: 8px;
		left: 8px;
		z-index: 100;
		padding: 12px 16px;
		border-radius: var(--radius-pill);
		background: var(--bg-forest);
		color: var(--text-on-dark);
		font-family: var(--font-label);
		font-size: 0.875rem;
		transform: translateY(-200%);
	}

	.skip-link:focus {
		transform: none;
	}
</style>
