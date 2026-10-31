<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import Button from '$lib/components/Button.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import Section from '$lib/components/Section.svelte';
</script>

<Meta />

<!-- Placeholder until the Home page lands. Nav and Footer come from +layout.svelte. -->
<Section>
	<div
		class="flex flex-col items-center gap-4 rounded-card border-2 border-dashed border-text-ink/40 bg-bg-green-wash px-6 py-16 text-center sm:py-20"
	>
		<span class="eyebrow text-accent-green">Spring 2027&ensp;/&ensp;Boston</span>
		<h2 id="weekend-heading" class="display-l text-text-ink">Under Construction</h2>
		<p class="max-w-[520px] text-lede text-text-muted">
			Check back soon for more updates or subscribe to our email notifications.
		</p>
		<Button href={resolve('/notify' as Pathname)} variant="secondary">Subscribe to email notifications</Button>
	</div>
</Section>

<!-- <Section>
	<div class="flex flex-col items-start gap-8">
		<h1 class="display-xl">Build something<br />bold this spring.</h1>
		<div class="flex flex-wrap gap-4">
			<Button href={resolve('/sponsors' as Pathname)}>Become a sponsor</Button>
		</div>
	</div>
</Section> -->