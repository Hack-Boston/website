<script lang="ts">
	import bugInk from '$lib/assets/bug-ink.svg';
	import bugLight from '$lib/assets/bug-light.svg';
	import wordmarkInk from '$lib/assets/wordmark-ink.svg';
	import wordmarkLight from '$lib/assets/wordmark-light.svg';

	interface Props {
		/** "ink" for light backgrounds, "light" for bg-forest. */
		tone?: 'ink' | 'light';
		/** "nav": bug 52px + wordmark 170px. "footer": bug 72px + wordmark 280px. */
		size?: 'nav' | 'footer';
		/** Set false to render the wordmark only (Nav animates its own bug). */
		bug?: boolean;
		class?: string;
	}

	let { tone = 'ink', size = 'nav', bug: showBug = true, class: className = '' }: Props = $props();

	const bug = $derived(tone === 'ink' ? bugInk : bugLight);
	const wordmark = $derived(tone === 'ink' ? wordmarkInk : wordmarkLight);
</script>

<!-- Decorative images: the parent link or heading gives the accessible name. -->
<span class="logo logo--{size} {className}">
	{#if showBug}
		<img class="logo__bug" src={bug} alt="" width="500" height="500" />
	{/if}
	<img class="logo__wordmark" src={wordmark} alt="" width="400" height="43.4836" />
</span>

<style>
	.logo {
		display: inline-flex;
		align-items: center;
		gap: 16px;
	}

	.logo img {
		display: block;
		flex-shrink: 0;
	}

	.logo--nav .logo__bug {
		width: 52px;
		height: 52px;
	}

	.logo--nav .logo__wordmark {
		width: 170px;
		height: auto;
		aspect-ratio: 170 / 18.481;
	}

	.logo--footer .logo__bug {
		width: 72px;
		height: 72px;
	}

	.logo--footer .logo__wordmark {
		width: 280px;
		height: auto;
		aspect-ratio: 280 / 30.438;
	}

	@media (max-width: 639px) {
		.logo--nav .logo__bug {
			width: 40px;
			height: 40px;
		}

		.logo--nav .logo__wordmark {
			width: 140px;
		}

		.logo--footer .logo__bug {
			width: 56px;
			height: 56px;
		}

		.logo--footer .logo__wordmark {
			width: 220px;
		}
	}
</style>
