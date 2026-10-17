<script>
	import Container from '$lib/components/Container.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
	<title>HackBoston - Sponsors</title>
</svelte:head>

<div class="bg-bg-paper font-label">
    <PageHeader
    title="Sponsor HackBoston."
    lede="Put your team in the room with ~200 students who are actively building. Recruit, get your brand in front of hackers, and see how people use your tools firsthand."
    mascot={false}
    >
    <div class="flex flex-wrap gap-3">
        <Button
            href="/sponsorship-prospectus.pdf"
            target="_blank"
            variant="secondary"
             class="border-text-on-dark bg-transparent text-bg-paper"
        >
            View the prospectus ↗
        </Button>

        <Button
            href="mailto:sponsorship@hackboston.dev"
            variant="secondary"
            class="border-2! border-solid! border-bg-paper! bg-transparent! text-text-on-dark!"
            target="_blank"

        >
            Get in touch about sponsorship
        </Button>
    </div>
    </PageHeader>
   <Section>
        <h2 class="display-l font-display">Why sponsor us?</h2>
        <div class="mt-10 border-t-2">
            <!-- 01 -->
            <div class="grid grid-cols-12 items-start gap-4 border-b py-6">
                <span class="col-span-1 text-xs text-accent-green">01</span>

                <span class="col-span-4 display-m text-text-ink">
                    Recruit
                </span>

                <span class="col-span-7 font-body text-text-muted">
                    Meet CS and engineering students from across Boston at the sponsor fair and in the hacking spaces. Internships, co-ops, full-time.
                </span>
            </div>

            <!-- 02 -->
            <div class="grid grid-cols-12 items-start gap-4 border-b py-6">
                <span class="col-span-1 text-xs text-accent-green">02</span>

                <span class="col-span-4 display-m text-text-ink">
                    Get seen
                </span>

                <span class="col-span-7 font-body text-text-muted">
                    Your brand on our site, socials, shirts, and banners, and on stage at the opening and closing ceremonies.
                </span>
            </div>

            <!-- 03 -->
            <div class="grid grid-cols-12 items-start gap-4 border-b py-6">
                <span class="col-span-1 text-xs text-accent-green">03</span>

                <span class="col-span-4 display-m text-text-ink">
                    Put your tools in play
                </span>

                <span class="col-span-7 font-body text-text-muted">
                    Pitch your APIs, propose a real-world challenge, run a workshop, and watch students build with what you make.
                </span>
            </div>

            <!-- 04 -->
            <div class="grid grid-cols-12 items-start gap-4 border-b py-6">
                <span class="col-span-1 text-xs text-accent-green">04</span>

                <span class="col-span-4 display-m text-text-ink">
                    Invest in Boston
                </span>

                <span class="col-span-7 font-body text-text-muted">
                    Every dollar goes to venue, food, and swag for the next generation of builders here.
                </span>
            </div>
        </div>
   </Section>
</div>