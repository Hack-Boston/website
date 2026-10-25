<script>
	import Container from '$lib/components/Container.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Section from '$lib/components/Section.svelte';
</script>

<svelte:head>
	<title>HackBoston - Team</title>
</svelte:head>

<div class="bg-bg-paper font-label">
	<!-- ===== BANNER ===== -->
	<PageHeader
		title="Meet the team."
		lede="HackBoston is organized by an independent student team from the Boston area. Say hi, we don't bite."
	/>
	<!-- ===== ORGANIZER ===== -->
	<Section>
		<Container>
			<div class="items-center justify-center gap-6 text-center">
				<h2 class="eyebrow text-accent-green">TEAM LEADS</h2>

				<!-- Main organizers -->
				<div
					class="mt-8 grid w-full grid-cols-1 justify-items-center gap-6 justify-self-center sm:grid-cols-2 lg:grid-cols-3"
				>
					<!-- 1st Organizer -->
					<div
						class="grid w-full grid-cols-1 justify-items-center gap-4 rounded-card border border-text-ink p-6"
					>
						<img
							src="/images/logan.png"
							alt="Logan Lambert"
							class="aspect-square w-full rounded-image object-cover"
						/>

						<div class="flex flex-col gap-4">
							<span class="display-m text-text-ink"> Logan Lambert </span>
							<span class="label-mono text-accent-green"> Co-director · Tech Lead </span>
							<span class="font-body text-base text-text-muted"> 
								<a
									href="mailto:logan@hackboston.dev"
								>
									logan@hackboston.dev 
								</a> 
							</span>
						</div>
					</div>

					<!-- 2nd Organizer -->
					<div
						class="flex w-full flex-col items-center justify-center gap-4 rounded-card border border-text-ink p-6"
					>
						<img
							src="/images/jasper.jpg"
							alt="Jasper Mayone"
							class="aspect-square w-full rounded-image object-cover"
						/>

						<div class="flex flex-col gap-4">
							<span class="display-m text-text-ink"> Jasper Mayone </span>
							<span class="label-mono text-accent-green"> Co-director · Ops Lead </span>
							<span class="font-body text-base text-text-muted">  
								<a
									href="mailto:jasper@hackboston.dev"
								>
									jasper@hackboston.dev
								</a> 
							</span>
						</div>
					</div>

					<!-- 3rd Organizer -->
					<div
						class="flex w-full flex-col items-center justify-center gap-4 rounded-card border border-text-ink p-6"
					>
						<img
							src="/images/volo.png"
							alt="Volo Kotelyak"
							class="aspect-square w-full rounded-image object-cover"
						/>

						<div class="flex flex-col gap-4">
							<span class="display-m text-text-ink"> Volo Kotelyak </span>
							<span class="label-mono text-accent-green"> Sponsorship + Finances Lead </span>
							<span class="font-body text-base text-text-muted"> 
								<a
									href="mailto:volo@hackboston.dev"
								>
									volo@hackboston.dev
								</a> 
							</span>
						</div>
					</div>

					<!-- 4th Organizer -->
					<div
						class="flex w-full flex-col items-center justify-center gap-4 rounded-card border border-text-ink p-6"
					>
						<img
							src="/images/cj.png"
							alt="CJ Kanne"
							class="aspect-square w-full rounded-image object-cover"
						/>

						<div class="flex flex-col gap-4">
							<span class="display-m text-text-ink"> CJ Kanne </span>
							<span class="label-mono text-accent-green"> Venue + Logistics Lead </span>
							<span class="font-body text-base text-text-muted"> 
								<a
									href="mailto:cj@hackboston.dev"
								>
									cj@hackboston.dev 
								</a> 
							</span>
						</div>
					</div>

					<!-- 5th Organizer -->
					<div
						class="flex w-full flex-col items-center justify-center gap-4 rounded-card border border-text-ink p-6"
					>
						<img
							src="/images/jojo.jpg"
							alt="Jojo Dejesus"
							class="aspect-square w-full rounded-image object-cover"
						/>

						<div class="flex flex-col gap-4">
							<span class="display-m text-text-ink"> Jojo Dejesus </span>
							<span class="label-mono text-accent-green"> Design + Socials Lead </span>
							<span class="font-body text-base text-text-muted"> 
								<a
									href="mailto:jojo@hackboston.dev"
								>
									jojo@hackboston.dev 
								</a> 
							</span>
						</div>
					</div>

					<!-- 6th Organizer -->
					<div
						class="flex w-full flex-col items-center justify-center gap-4 rounded-card border border-text-ink p-6"
					>
						<img
							src="/images/daniel.jpg"
							alt="Daniel Miretsky"
							class="aspect-square w-full rounded-image object-cover"
						/>

						<div class="flex flex-col gap-4">
							<span class="display-m text-text-ink"> Daniel Miretsky </span>
							<span class="label-mono text-accent-green"> Judging Lead </span>
							<span class="font-body text-base text-text-muted">
								<a
									href="mailto:daniel@hackboston.dev"
								>
									daniel@hackboston.dev
								</a> 
							</span>
						</div>
					</div>
				</div>

				<!-- Other Organizer -->
				<div>
					<h2 class="mt-12 eyebrow text-accent-green">ALSO ON THE TEAM</h2>

					<div class="mt-2 flex flex-wrap items-center justify-center text-lede text-text-muted">
						<span>Thang Pham</span>
						<!-- <span class="mx-5">·</span>
                        <span>Organizer Name</span>
                        <span class="mx-5">·</span>
                        <span>Organizer Name</span>
                        <span class="mx-5">·</span>
                        <span>Organizer Name</span>
                        <span class="mx-5">·</span>
                        <span>Organizer Name</span>
                        <span class="mx-5">·</span>
                        <span>Organizer Name</span> -->
					</div>
				</div>

				<!-- Contact -->
				<div
					class="mt-16 flex h-auto flex-col items-start justify-between gap-2 rounded-card bg-bg-green-wash p-10 text-text-ink sm:h-[141px] sm:flex-row sm:items-center"
				>
					<div class="flex flex-col text-left">
						<span class="mb-3 display-m"> Want to mentor or help run the weekend? </span>

						<span class="text-lede text-text-muted">
							We're always looking for mentors, judges, and extra hands. Reach out and tell us what
							you're into.
						</span>
					</div>

					<a
						href="mailto:team@hackboston.dev"
						class="rounded-pill bg-bg-forest px-6 py-4 label-mono text-bg-paper no-underline hover:underline"
					>
						team@hackboston.dev
					</a>
				</div>
			</div>
		</Container>
	</Section>
</div>
