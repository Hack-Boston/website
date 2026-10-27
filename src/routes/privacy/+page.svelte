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
        <div class="grid grid-cols-3 gap-20">
            <div class="gap-6 flex flex-col">
                <span class="text-accent-green text-[12px] tracking-[6%]">ON THIS PAGE</span>
                <div class="flex flex-col gap-2.5 text-text-ink text-[14px] text-bold">
                    <span>What we collect</span>
                    <span>Why</span>
                    <span>Who sees it</span>
                    <span>Health information</span>
                    <span>How long we keep it</span>
                    <span>Your choices</span>
                </div>
                <hr class="h-px text-text-ink">
                <span class="font-body text-[16px] leading-[155%] text-text-muted">Last updated [date].</span>
            </div>
            <div class="col-span-2 font-body text-text-ink">
                <div class="gap-12 grid grid-row-6">
                    <div class="gap-3.5 flex flex-col">
                        <span class="text-[30px]">What we collect</span>
                        <span class="text-[18px]">From pre-register: your name and email.</span>
                        <span class="text-[18px]">From the application: name, email, phone, age, school, level of study, major, graduation year, country, t-shirt size, food allergies and restrictions, and your short answers.</span>
                    </div>
                    <div class="gap-3.5 flex flex-col">
                        <span class="text-[30px]">Why</span>
                        <span class="text-[18px]">From pre-register: your name and email.</span>
                    </div>
                    <div class="gap-3.5 flex flex-col">
                        <span class="text-[30px]">Who sees it</span>
                        <span class="text-[18px]">
                            The HackBoston organizing team. If you check the MLH boxes, we share your application with Major League Hacking under their privacy policy. We never sell your data, and we don’t give sponsors your contact info unless you opt in.
                        </span>
                    </div>
                    <div class="gap-3.5 flex flex-col">
                        <span class="text-[30px]">Health information</span>
                        <span class="text-[18px]">
                            Allergies and dietary needs are health information. Only the people planning food see them, and we use them only for meals.
                        </span>
                    </div>
                    <div class="gap-3.5 flex flex-col">
                        <span class="text-[30px]">How long we keep it</span>
                        <span class="text-[18px]">
                            We delete application data [N] months after the event. We keep anonymous totals, like how many schools attended, for sponsor reports.
                        </span>
                    </div>
                    <div class="gap-3.5 flex flex-col">
                        <span class="text-[30px]">Your choices</span>
                        <span class="text-[18px]">
                            Email team@hackboston.dev to see, fix, or delete your data at any time.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </Section>
</div>