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
		/**For the sponsor page only*/
		sponsor?: boolean;
		/** Optional extra content under the lede, for example Buttons. */
		children?: Snippet;
	}

	let { title, lede, mascot = true, sponsor = false, children }: Props = $props();
</script>

<!-- Figma "Page header": the forest band under the Nav on every inner page. -->
<header class="flex min-h-[356px] items-center bg-bg-forest py-12">
	<Container class="flex items-center justify-between gap-10">
		<div class="flex max-w-[820px] flex-col items-start gap-6">
			<h1 class="display-xl text-text-on-dark">
				{#if sponsor}
					{#each title.split(' ') as word}
						{word}<br />
					{/each}
				{:else}
					{title}
				{/if}
			</h1>
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
		{:else if sponsor}
			<div class="hidden sm:flex w-full max-w-[180px] shrink-0 p-3 sm:max-w-[200px] sm:p-4 md:w-[200px] md:max-w-none md:p-5 lg:w-[230px] lg:p-6 gap-2 rounded-lg bg-bg-paper flex-col justify-center items-center self-center md:self-auto">
				<img
					src="/assets/hackboston-bug-green-on-cream.png"
					class="w-[90px] sm:w-[110px] md:w-[120px] lg:w-[140px]"
					alt=""
				/>
				<img
					src="/assets/hackboston-wordmark.png"
					class="w-full max-w-[150px] sm:max-w-[170px] md:max-w-40 lg:max-w-[182px]"
					alt="HackBoston"
				/>
				<span class="font-label text-accent-green text-center text-[10px] sm:text-[11px] md:text-[11px] lg:text-[12px] w-[82px]">
					SPONSORSHIP PROSPECTUS
				</span>
			</div>
		{/if}
	</Container>
</header>
