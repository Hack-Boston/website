<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { registerHref } from '$lib/site';
</script>

<!-- Full-width strip above the Nav. It scrolls away; the Nav stays sticky. -->
<a class="banner" href={resolve(registerHref as Pathname)}>
	<span
		>Registration is now open! Click here to register&nbsp;<span
			class="banner__arrow"
			aria-hidden="true">→</span
		></span
	>
</a>

<style>
	.banner {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px var(--space-gutter);
		background: var(--bg-forest);
		color: var(--text-on-dark);
		font-family: var(--font-label);
		font-weight: 500;
		font-size: 0.875rem;
		line-height: normal;
		text-align: center;
		text-decoration: none;
		text-underline-offset: 3px;
	}

	.banner:hover {
		text-decoration: underline;
	}

	.banner:focus-visible {
		outline: 2px solid var(--text-on-dark);
		outline-offset: -4px;
	}

	.banner__arrow {
		display: inline-block;
		transition: transform 150ms ease;
	}

	.banner:hover .banner__arrow {
		transform: translateX(3px);
	}
</style>
