<script>    
    import Container from '$lib/components/Container.svelte';
    import Nav from '$lib/components/Nav.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import Section from '$lib/components/Section.svelte';
    import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
    <title>HackBoston - Privacy Policy </title>
</svelte:head>

<div class="bg-bg-paper font-label">
    <!-- ===== BANNER ===== -->
    <PageHeader
        title="Your data, plainly."
        lede="What we collect when you pre-register or apply, who sees it, and when we delete it."
    />
    <Section>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20">
            <div class="gap-6 flex flex-col">
                <span class="text-accent-green text-[12px] tracking-[6%]">ON THIS PAGE</span>
                <div class="flex flex-col gap-2.5 text-text-ink text-[14px] text-bold">
                    <span>What we collect</span>
                    <span>Who sees it</span>
                    <span>Health information</span>
                    <span>Your choices</span>
                </div>
                <hr class="h-px text-text-ink w-1/2">
                <span class="font-body text-[16px] leading-[155%] text-text-muted">Last updated [date].</span>
            </div>
            <div class="col-span-1 md:col-span-2 font-body text-text-ink">
                <div class="gap-12 grid grid-row-6">
                    <div class="gap-3.5 flex flex-col">
                        <span class="text-[30px] max-sm:text-[24px]">What we collect</span>
                        <span class="text-[18px] max-sm:text-[16px]">From pre-register: your name and email.</span>
                        <span class="text-[18px] max-sm:text-[16px]">From the application: name, email, phone, age, school, level of study, major, graduation year, country, t-shirt size, food allergies and restrictions, and your short answers.</span>
                    </div>
                    <div class="gap-3.5 flex flex-col">
                        <span class="text-[30px] max-sm:text-[24px]">Who sees it</span>
                        <span class="text-[18px] max-sm:text-[16px]">
                            The HackBoston organizing team. If you check the MLH boxes, we share your application with Major League Hacking under their privacy policy. We never sell your data, and we don’t give sponsors your contact info unless you opt in.
                        </span>
                    </div>
                    <div class="gap-3.5 flex flex-col">
                        <span class="text-[30px] max-sm:text-[24px]">Health information</span>
                        <span class="text-[18px] max-sm:text-[16px]">
                            Allergies and dietary needs are health information. Only the people planning food see them, and we use them only for meals.
                        </span>
                    </div>
                    <div class="gap-3.5 flex flex-col">
                        <span class="text-[30px] max-sm:text-[24px]">Your choices</span>
                        <span class="text-[18px] max-sm:text-[16px]">
                            Email <a href="mailto:privacy@hackboston.dev" class="no-underline hover:underline">privacy@hackboston.dev</a> to see, fix, or delete your data at any time.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </Section>
</div>
