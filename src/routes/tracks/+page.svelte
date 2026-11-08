<script>
    import PageHeader from '$lib/components/PageHeader.svelte';
    import Section from '$lib/components/Section.svelte';
</script>

<svelte:head>
    <title>HackBoston - Tracks & prizes</title>
</svelte:head>

<div class="bg-bg-paper font-label">
    <!-- ===== BANNER ===== -->
    <PageHeader
        title="Tracks & prizes"
        lede="Build anything you want. Then enter the tracks that fit your project."
    />
    <Section>
        <!-- Tracks -->
        <div class="gap-6 flex flex-col">
            <div class="gap-2 flex flex-col">
                <span class="font-label text-accent-green text-[12px]">TRACKS</span>
                <span class="font-body text-[28px] sm:text-[34px] lg:text-[40px] text-text-ink">Pick your lane.</span>
                <span class="font-body text-[16px] sm:text-[18px] text-text-muted">
                    Every project is eligible for Best Overall.
                </span>
            </div>
            <div class="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div class="bg-bg-paper-deep p-5 sm:p-7 rounded-xl gap-3 flex flex-col">
                    <span class="font-body text-[24px] sm:text-[26px]">Innovation</span>
                    <span class="font-body text-[16px] sm:text-[18px]">
                        This year’s theme. Bold ideas that solve real problems.
                    </span>
                </div>
                <div class="bg-bg-paper-deep p-5 sm:p-7 rounded-xl gap-3 flex flex-col">
                    <span class="font-body text-[24px] sm:text-[26px]">Best Beginner Hack</span>
                    <span class="font-body text-[16px] sm:text-[18px]">Your first or second hackathon? This one’s yours.</span>
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
                <span class="font-body text-[16px] sm:text-[18px] text-text-muted">Sponsor tracks and prizes will be announced as sponsors confirm.</span>
            </div>
        </div>
    </Section>
    <Section>
        <!-- Judging -->
        <div class="gap-6 flex flex-col">
            <div class="gap-2 flex flex-col">
                <span class="font-label text-accent-green text-[12px]">JUDGING</span>
                <span class="font-body text-[28px] sm:text-[34px] lg:text-[40px] text-text-ink">How projects are scored.</span>
                <span class="font-body text-[16px] sm:text-[18px] text-text-muted">
                    Judges score each project on four criteria, with equal weight.
                </span>
            </div>
            <div class="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div class="p-5 sm:p-7 rounded-xl gap-3 flex flex-col border-text-ink border">
                    <span class="font-label text-[14px] text-accent-green">01</span>
                    <span class="font-body text-[20px] sm:text-[22px]">Technical difficulty</span>
                    <span class="font-body text-[16px] text-text-muted">How hard was it to build, and how much works?</span>
                </div>
                <div class="p-5 sm:p-7 rounded-xl gap-3 flex flex-col border-text-ink border">
                    <span class="font-label text-[14px] text-accent-green">02</span>
                    <span class="font-body text-[20px] sm:text-[22px]">Creativity</span>
                    <span class="font-body text-[16px] text-text-muted">Is it a fresh idea or a fresh take?</span>
                </div>
                <div class="p-5 sm:p-7 rounded-xl gap-3 flex flex-col border-text-ink border">
                    <span class="font-label text-[14px] text-accent-green">03</span>
                    <span class="font-body text-[20px] sm:text-[22px]">Design</span>
                    <span class="font-body text-[16px] text-text-muted">Is it usable and thought through?</span>
                </div>
                <div class="p-5 sm:p-7 rounded-xl gap-3 flex flex-col border-text-ink border">
                    <span class="font-label text-[14px] text-accent-green">04</span>
                    <span class="font-body text-[20px] sm:text-[22px]">Impact</span>
                    <span class="font-body text-[16px] text-text-muted">Does it solve a real problem for real people?</span>
                </div>
            </div>
        </div>
    </Section>
    <Section>
        <!-- Rules -->
        <div class="gap-4 sm:gap-6 grid grid-cols-1">
            <div class="gap-2 flex flex-col">
                <span class="font-label text-accent-green text-[12px]">RULES</span>
                <span class="font-body text-[28px] sm:text-[34px] lg:text-[40px] text-text-ink">The fine print</span>
            </div>
            <span class="font-body text-[16px] sm:text-[18px] text-text-ink">→ Teams of up to 4.</span>
            <span class="font-body text-[16px] sm:text-[18px] text-text-ink">→ Everything you submit must be built during the event. Open-source libraries and APIs are fine.</span>
            <span class="font-body text-[16px] sm:text-[18px] text-text-ink">→ Submit your project before hacking ends Sunday at 10 AM.</span>
            <a href="/conduct" class="font-body text-[16px] sm:text-[18px] text-text-ink hover:underline">→ Follow the Code of Conduct.</a>
        </div>
    </Section>
</div>
