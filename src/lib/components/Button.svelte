<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'secondary';
	type Size = 'md' | 'sm';

	type Props = {
		/** Figma "Button / Primary" (forest fill) or "Button / Secondary" (ink outline). */
		variant?: Variant;
		/** "md" is the Figma 50px button. "sm" is 34px, for tight spots like the collapsed Nav. */
		size?: Size;
		children: Snippet;
		class?: string;
	} & (
		| ({ href: string } & Omit<HTMLAnchorAttributes, 'class' | 'children'>)
		| ({ href?: undefined } & Omit<HTMLButtonAttributes, 'class' | 'children'>)
	);

	let {
		variant = 'primary',
		size = 'md',
		children,
		class: className = '',
		...rest
	}: Props = $props();
</script>

{#if rest.href !== undefined}
	<a class="btn btn--{variant} btn--{size} {className}" {...rest as HTMLAnchorAttributes}>
		{@render children()}
	</a>
{:else}
	<button
		class="btn btn--{variant} btn--{size} {className}"
		type="button"
		{...rest as HTMLButtonAttributes}
	>
		{@render children()}
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 16px 24px;
		border-radius: var(--radius-pill);
		font-family: var(--font-label);
		font-weight: 500;
		font-size: 0.875rem;
		line-height: normal;
		white-space: nowrap;
		text-decoration: none;
		cursor: pointer;
		transition:
			background-color 150ms ease,
			color 150ms ease,
			border-color 150ms ease;
	}

	.btn--sm {
		padding: 8px 18px;
	}

	.btn--primary {
		border: 0;
		background: var(--bg-forest);
		color: var(--text-on-dark);
	}

	.btn--primary:hover {
		background: var(--accent-green);
	}

	/* Figma: the 2px border adds to the size (54px tall, primary is 50px). */
	.btn--secondary {
		border: 2px solid var(--text-ink);
		background: var(--bg-paper);
		color: var(--text-ink);
	}

	.btn--secondary:hover {
		background: var(--bg-paper-deep);
	}

	.btn:focus-visible {
		outline: 2px solid var(--accent-green);
		outline-offset: 3px;
	}

	.btn:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>
