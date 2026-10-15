<script>
	import Container from '$lib/components/Container.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Section from '$lib/components/Section.svelte';
</script>

<svelte:head>
	<title>HackBoston - Sponsors</title>
</svelte:head>

<div class="bg-bg-paper font-label">
   <PageHeader
    title={'Sponsor\nHackBoston.'}

    lede="Put your team in the room with ~200 students who are actively building. Recruit, get your brand in front of hackers, and see how people use your tools firsthand."
    mascot={false}
    >

        <div class="flex flex-wrap gap-3">
            <a
                href="/sponsorship-prospectus.pdf" target="_blank"
                class="rounded-full bg-bg-paper px-6 py-3 font-label text-text-ink hover:underline"
            >
                View the prospectus ↗
            </a>

            <a
                href="mailto:sponsorship@hackboston.dev" target="_blank"
                class="rounded-full border border-bg-paper px-6 py-3 font-label text-text-on-dark hover:underline"
            >
                Get in touch about sponsorship
            </a>

            
        </div>
    </PageHeader>
</div>