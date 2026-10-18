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
             class="border-text-on-dark bg-transparent text-bg-paper hover:underline!"
        >
            View the prospectus ↗
        </Button>

        <Button
            href="mailto:sponsorship@hackboston.dev"
            variant="secondary"
            class="border-2! border-solid! border-bg-paper! bg-transparent! text-text-on-dark! hover:underline!"
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
   <Section>
        <h2 class="display-l font-display">Sponsorship tiers</h2>
        <div class="grid grid-cols-4 mt-10 border-t-2 border-b-2">
            <div class="py-6 flex flex-col gap-2 border-r">
                <span class="display-s">Dewdrop</span>
                <span class="font-label text-accent-green">$500+</span>
            </div>
            <div class="py-6 flex flex-col gap-2 border-r pl-6">
                <span class="display-s">Crystal</span>
                <span class="font-label text-accent-green">$1,000+</span>
            </div>
            <div class="py-6 flex flex-col gap-2 border-r pl-6">
                <span class="display-s">Aurora</span>
                <span class="font-label text-accent-green">$5,000+</span>
            </div>
            <div class="py-6 flex flex-col gap-2 pl-6">
                <span class="display-s">Cosmic</span>
                <span class="font-label text-accent-green">$10,000+</span>
            </div>
        </div>
        <div class="flex gap-4 my-10">
            <span class="font-body">Every benefit, tier by tier, is in the prospectus.</span>
           <Button
            href="/sponsorship-prospectus.pdf"
            target="_blank"
            variant="secondary"
             class="border-text-on-dark! text-bg-paper p-0! hover:underline! hover:bg-transparent!"
        >
            View the prospectus ↗
        </Button>
    </div>
    <div
        class="flex h-auto flex-col items-start justify-between gap-2 rounded-card bg-bg-green-wash p-10 text-text-ink sm:h-[141px] sm:flex-row sm:items-center"
    >
        <div class="flex flex-col text-left">
            <span class="text-lede text-text-muted">
                Want something custom? Sponsor a meal or an activity, or send mentors, APIs, or hardware, and we’ll put together a package around your goals.
            </span>
        </div>

        <a
            href="mailto:sponsorship@hackboston.dev" target="_blank"
            class="rounded-pill bg-bg-forest px-6 py-4 label-mono text-bg-paper no-underline hover:underline"
        >
            sponsorship@hackboston.dev
        </a>
    </div>
        
   </Section>
</div>