<script>
    import PageHeader from '$lib/components/PageHeader.svelte';
    import Section from '$lib/components/Section.svelte';
</script>

<svelte:head>
    <title>HackBoston - Tracks and Prizes</title>
</svelte:head>

<div class="bg-bg-paper font-label">
    <!-- ===== BANNER ===== -->
    <PageHeader
        title="Tracks and prizes"
        lede="Build anything. Then pick the tracks your project fits and compete for those prizes too."
    />
    <Section>
        <!-- Tracks -->
        <div class="gap-6 flex flex-col">
            <div class="gap-2 flex flex-col">
                <span class="font-label text-accent-green text-[12px]">TRACKS</span>
                <span class="font-body text-[28px] sm:text-[34px] lg:text-[40px] text-text-ink">Pick your lane.</span>
                <span class="font-body text-[16px] sm:text-[18px] text-text-muted">Every project is eligible for Best Overall. Enter up to [N] tracks.</span>
            </div>
            <div class="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div class="bg-bg-paper-deep p-5 sm:p-7 rounded-xl gap-3 flex flex-col">
                    <span class="font-body text-[24px] sm:text-[26px]">Innovation</span>
                    <span class="font-body text-[16px] sm:text-[18px]">This year's theme. Bold ideas, solving real problems</span>
                </div>
                <div class="bg-bg-paper-deep p-5 sm:p-7 rounded-xl gap-3 flex flex-col">
                    <span class="font-body text-[24px] sm:text-[26px]">Best Beginner Hack</span>
                    <span class="font-body text-[16px] sm:text-[18px]">Your first or second hackathon? This one’s yours.</span>
                </div>
                <div class="bg-bg-paper-deep p-5 sm:p-7 rounded-xl gap-3 flex flex-col">
                    <span class="font-body text-[24px] sm:text-[26px]">Sponsor track</span>
                    <span class="font-body text-[16px] sm:text-[18px]">[Sponsor] challenge. Details once sponsors confirm.</span>
                </div>
                <div class="bg-bg-paper-deep p-5 sm:p-7 rounded-xl gap-3 flex flex-col">
                    <span class="font-body text-[24px] sm:text-[26px]">Sponsor track</span>
                    <span class="font-body text-[16px] sm:text-[18px]">[Sponsor] challenge. Details once sponsors confirm.</span>
                </div>
            </div>
        </div>
    </Section>
    <Section>
        <!-- Prizes -->
        <div class="gap-6 flex flex-col">
            <div class="gap-2 flex flex-col">
                <span class="font-label text-accent-green text-[12px]">PRIZES</span>
                <span class="font-body text-[28px] sm:text-[34px] lg:text-[40px] text-text-ink">What’s on the line.</span>
                <span class="font-body text-[16px] sm:text-[18px] text-text-muted">Prizes announced as sponsors confirm.</span>
            </div>
            <div class="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-text-on-dark">
                <div class="bg-bg-forest p-5 sm:p-7 rounded-xl gap-3 flex flex-col">
                    <span class="font-body text-[14px] text-accent-green-tint">1st</span>
                    <span class="font-body text-[22px] sm:text-[24px]">Best Overall</span>
                    <span class="font-body text-[16px]">Prize TBA</span>
                </div>
                <div class="bg-bg-forest p-5 sm:p-7 rounded-xl gap-3 flex flex-col">
                    <span class="font-body text-[14px] text-accent-green-tint">2nd</span>
                    <span class="font-body text-[22px] sm:text-[24px]">Runner-up</span>
                    <span class="font-body text-[16px]">Prize TBA</span>
                </div>
                <div class="bg-bg-forest p-5 sm:p-7 rounded-xl gap-3 flex flex-col">
                    <span class="font-body text-[14px] text-accent-green-tint">★</span>
                    <span class="font-body text-[22px] sm:text-[24px]">Best Beginner Hack</span>
                    <span class="font-body text-[16px]">Prize TBA</span>
                </div>
                <div class="bg-bg-forest p-5 sm:p-7 rounded-xl gap-3 flex flex-col">
                    <span class="font-body text-[14px] text-accent-green-tint">★</span>
                    <span class="font-body text-[22px] sm:text-[24px]">Each sponsor track</span>
                    <span class="font-body text-[16px]">Prize TBA</span>
                </div>
            </div>
        </div>
    </Section>
    <Section>
        <!-- Prizes -->
        <div class="gap-6 flex flex-col">
            <div class="gap-2 flex flex-col">
                <span class="font-label text-accent-green text-[12px]">JUDGING</span>
                <span class="font-body text-[28px] sm:text-[34px] lg:text-[40px] text-text-ink">How projects are scored.</span>
                <span class="font-body text-[16px] sm:text-[18px] text-text-muted">Science-fair demos on Sunday. Judges score each project equally on four things.</span>
            </div>
            <div class="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div class="p-5 sm:p-7 rounded-xl gap-3 flex flex-col border-[text-text-ink] border">
                    <span class="font-label text-[14px] text-accent-green">01</span>
                    <span class="font-body text-[20px] sm:text-[22px]">Technical difficulty</span>
                    <span class="font-body text-[16px] text-text-muted">How hard was it to build, and how much works?</span>
                </div>
                <div class="p-5 sm:p-7 rounded-xl gap-3 flex flex-col border-[text-text-ink] border">
                    <span class="font-label text-[14px] text-accent-green">02</span>
                    <span class="font-body text-[20px] sm:text-[22px]">Creativity</span>
                    <span class="font-body text-[16px] text-text-muted">Is it a fresh idea or a fresh take?</span>
                </div>
                <div class="p-5 sm:p-7 rounded-xl gap-3 flex flex-col border-[text-text-ink] border">
                    <span class="font-label text-[14px] text-accent-green">03</span>
                    <span class="font-body text-[20px] sm:text-[22px]">Design</span>
                    <span class="font-body text-[16px] text-text-muted">Is it usable and thought through?</span>
                </div>
                <div class="p-5 sm:p-7 rounded-xl gap-3 flex flex-col border-[text-text-ink] border">
                    <span class="font-label text-[14px] text-accent-green">04</span>
                    <span class="font-body text-[20px] sm:text-[22px]">Impact</span>
                    <span class="font-body text-[16px] text-text-muted">Does it solve a real problem for real people?</span>
                </div>
            </div>
        </div>
    </Section>
    <Section>
        <!-- Prizes -->
        <div class="gap-4 sm:gap-6 grid grid-cols-1">
            <div class="gap-2 flex flex-col">
                <span class="font-label text-accent-green text-[12px]">RULES</span>
                <span class="font-body text-[28px] sm:text-[34px] lg:text-[40px] text-text-ink">The fine prints</span>
            </div>
            <span class="font-body text-[16px] sm:text-[18px] text-text-ink">→  Teams of up to 4.</span>
            <span class="font-body text-[16px] sm:text-[18px] text-text-ink">→  Everything you submit must be built during the event. Open-source libraries and APIs are fine.</span>
            <span class="font-body text-[16px] sm:text-[18px] text-text-ink">→  Submit on [Devpost] before hacking ends Sunday at 10 AM..</span>
            <span class="font-body text-[16px] sm:text-[18px] text-text-ink">→  Follow the Code of Conduct.</span>
        </div>
    </Section>
</div>