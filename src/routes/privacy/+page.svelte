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
        <div class="grid grid-cols-4 gap-20">
            <div class="col-start-1 gap-6 flex flex-col">
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
            <div class="col-start-2 col-end-4">b</div>
        </div>
    </Section>
</div>