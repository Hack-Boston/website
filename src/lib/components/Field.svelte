<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ControlProps {
		id: string;
		/** Pass to aria-describedby on the control. */
		describedby: string | undefined;
		invalid: boolean;
	}

	interface Props {
		/** The control's id. The label points at it. */
		id: string;
		label: string;
		/** Extra guidance between the label and the control, for example an alternate prompt. */
		hint?: string;
		/** Help text under the control. An error replaces it. */
		help?: string;
		error?: string;
		class?: string;
		/** The control. Spread the props onto it: id, aria-describedby and aria-invalid. */
		children: Snippet<[ControlProps]>;
	}

	let { id, label, hint, help, error, class: className = '', children }: Props = $props();

	const describedby = $derived(
		[hint && `${id}-hint`, error ? `${id}-error` : help && `${id}-help`]
			.filter(Boolean)
			.join(' ') || undefined
	);
</script>

<!-- Figma "Register / Field states" (79:621): mono label, control, then help or error. -->
<div class="field {className}">
	<label class="field__label" for={id}>{label}</label>
	{#if hint}
		<p id="{id}-hint" class="field__help">{hint}</p>
	{/if}
	{@render children({ id, describedby, invalid: Boolean(error) })}
	{#if error}
		<p id="{id}-error" class="field__error">{error}</p>
	{:else if help}
		<p id="{id}-help" class="field__help">{help}</p>
	{/if}
</div>

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-width: 0;
	}

	.field__label {
		font-family: var(--font-label);
		font-weight: 500;
		font-size: 0.75rem;
		line-height: normal;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--text-ink);
	}

	.field__help,
	.field__error {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.field__help {
		color: var(--text-muted);
	}

	.field__error {
		color: var(--state-error);
	}
</style>
