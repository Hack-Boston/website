<script lang="ts">
	import type { Snippet } from 'svelte';
	import bugLight from '$lib/assets/bug-light.svg';
	import Container from './Container.svelte';

	interface Props {
		/** Page title. Rendered as the page h1 with Display/XL. */
		title: string;
		/** Optional lede under the title (Newsreader 20, accent-green-tint). */
		lede?: string;
		/** Show the 260px bug mascot on the right. */
		mascot?: boolean;
		/** Optional extra content under the lede, for example Buttons. */
		children?: Snippet;
	}

	let { title, lede, mascot = true, children }: Props = $props();
</script>

<!-- Figma "Page header": the forest band under the Nav on every inner page. -->
<header class="flex min-h-[356px] items-center bg-bg-forest py-12">
	<Container class="flex items-center justify-between gap-10">
		<div class="flex max-w-[820px] flex-col items-start gap-6">
			<h1 class="display-xl text-text-on-dark">{title}</h1>
			{#if lede}
				<p class="max-w-[640px] text-lede text-accent-green-tint">{lede}</p>
			{/if}
			{#if children}
				{@render children()}
			{/if}
		</div>
		{#if mascot}
			<img
				class="hidden size-[200px] shrink-0 md:block lg:size-[260px]"
				src={bugLight}
				alt=""
				width="72"
				height="72"
			/>
		{/if}
	</Container>
</header>
