<script lang="ts">
	import { PageHeader, Section } from '$lib';

	const schedule = [
		{
			when: 'Fri 6 PM',
			title: 'Check in + kickoff',
			detail: 'Grab your badge and swag, meet sponsors, and hear the challenges at the opening ceremony.'
		},
		{
			when: 'Fri 8 PM',
			title: 'Form a team',
			detail: 'Come with friends or find people there. Pitch an idea or join one that excites you.'
		},
		{
			when: 'Sat daytime',
			title: 'Learn',
			detail: 'Sit in on sponsor workshops and grab a mentor whenever you get stuck.'
		},
		{
			when: 'Sat + Sun AM',
			title: 'Build',
			detail: 'Hack through the weekend. Six meals and two midnight snacks keep you going.'
		},
		{
			when: 'Sun 11 AM',
			title: 'Demo + judging',
			detail: 'Show what you made to the judges and sponsors.'
		},
		{
			when: 'Sun 2 PM',
			title: 'Closing ceremony',
			detail: 'Winners announced, prizes handed out, and a lot of tired, happy people.'
		}
	];
</script>

<svelte:head>
	<title>About - HackBoston</title>
	<meta
		name="description"
		content="HackBoston is a hackathon run by an independent student team from the Boston area."
	/>
</svelte:head>

<!-- The no-break space keeps "for students." together, so the title breaks after the comma. -->
<PageHeader
	title="Built by students, for&nbsp;students."
	lede="HackBoston is run by an independent student team from the Boston area. We believe creativity is at the core of engineering, and we want to give hackers the chance to build real projects in teams."
/>

<Section class="border-b border-text-ink/40" aria-labelledby="weekend-heading">
	<h2 id="weekend-heading" class="display-l">How the weekend runs</h2>

	<ol class="mt-10 border-t-2 border-text-ink">
		{#each schedule as item (item.title)}
			<li
				class="grid gap-2 border-b border-text-ink/40 py-5 md:grid-cols-[8rem_minmax(14rem,1fr)_minmax(0,2fr)] md:items-baseline md:gap-6"
			>
				<span class="eyebrow text-accent-green">{item.when}</span>
				<h3 class="display-m">{item.title}</h3>
				<p class="text-text-muted">{item.detail}</p>
			</li>
		{/each}
	</ol>

	<p class="mt-8 eyebrow text-text-muted">
		Rough times&ensp;/&ensp;final schedule once the venue is locked in
	</p>
</Section>

<Section aria-labelledby="theme-heading">
	<div class="flex flex-col gap-6 md:flex-row md:items-end md:gap-16">
		<div class="flex shrink-0 flex-col gap-3">
			<p class="eyebrow text-accent-green">This year's theme</p>
			<h2 id="theme-heading" class="display-stat">Innovation.</h2>
		</div>
		<p class="max-w-[640px] text-lede">
			We want bold ideas from students of all backgrounds, built to tackle the challenges people
			face today. Bring a problem you care about and build something new around it.
		</p>
	</div>
</Section>
