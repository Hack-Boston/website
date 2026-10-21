<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { Button, Section } from '$lib';
</script>

<!-- Placeholder until the Home page (#9) lands. Nav and Footer come from +layout.svelte. -->
<Section>
	<div class="flex flex-col items-start gap-8">
		<h1 class="display-xl">Build something<br />bold this spring.</h1>
		<div class="flex flex-wrap gap-4">
			<Button href={resolve('/notify' as Pathname)}>Get notified</Button>
			<Button href={resolve('/sponsors' as Pathname)} variant="secondary">Become a sponsor</Button>
		</div>
	</div>
</Section>
