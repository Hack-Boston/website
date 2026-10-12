<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Container from './Container.svelte';

	type Tone = 'paper' | 'paper-deep' | 'green-wash' | 'forest';

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'class' | 'children'> {
		/** Background token. "forest" switches text to text-on-dark. */
		tone?: Tone;
		children: Snippet;
		class?: string;
		/** Classes for the inner Container. */
		containerClass?: string;
	}

	let {
		tone = 'paper',
		children,
		class: className = '',
		containerClass = '',
		...rest
	}: Props = $props();

	const toneClass: Record<Tone, string> = {
		paper: 'bg-bg-paper text-text-ink',
		'paper-deep': 'bg-bg-paper-deep text-text-ink',
		'green-wash': 'bg-bg-green-wash text-text-ink',
		forest: 'bg-bg-forest text-text-on-dark'
	};
</script>

<!-- Full-width band with 64px vertical padding (Figma sections) and a centered Container. -->
<section class="py-section {toneClass[tone]} {className}" {...rest}>
	<Container class={containerClass}>
		{@render children()}
	</Container>
</section>
