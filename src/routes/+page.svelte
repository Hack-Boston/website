<script lang="ts">
	import { resolve } from '$app/paths';
	import bug from '$lib/assets/bug-ink.svg';
	import Button from '$lib/components/Button.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import Section from '$lib/components/Section.svelte';
	import { contactEmails } from '$lib/site';

	const teamEmail = contactEmails.find((contact) => contact.label === 'General')?.email;
	const logisticsEmail = contactEmails.find(
		(contact) => contact.label === 'Venue + logistics'
	)?.email;
	const stats = [
		{ value: '~200', label: 'students expected' },
		{ value: '1st', label: 'year of HackBoston' },
		{ value: '1', label: 'weekend of building' },
		{ value: '100%', label: 'student-run' }
	];
	const photos = [
		{
			src: '/images/home/teamwork.webp',
			alt: 'Students collaborating on a laptop',
			width: 290,
			height: 246
		},
		{
			src: '/images/home/hardware-workshop.webp',
			alt: 'Participant working on a hardware project',
			width: 173,
			height: 246
		},
		{
			src: '/images/home/project-presentations.webp',
			alt: 'Students presenting projects to an audience',
			width: 540,
			height: 430
		},
		{
			src: '/images/home/hardware-prototype.webp',
			alt: 'Hands holding a working breadboard prototype',
			width: 700,
			height: 440
		}
	];
	const tiers = [
		{ name: 'Dewdrop', price: '$500+' },
		{ name: 'Crystal', price: '$1,000+' },
		{ name: 'Aurora', price: '$5,000+' },
		{ name: 'Cosmic', price: '$10,000+' }
	];

	let gallery: HTMLDivElement | undefined = $state();
	let dragging = $state(false);
	let dragStart: { pointerId: number; x: number; scrollLeft: number } | undefined;

	function scrollGallery(direction: number) {
		if (!gallery) return;
		gallery.scrollBy({
			left: direction * gallery.clientWidth * 0.75,
			behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
		});
	}

	function startDrag(event: PointerEvent) {
		if (!gallery || event.pointerType !== 'mouse' || event.button !== 0) return;
		const bounds = gallery.getBoundingClientRect();
		const x = event.clientX - bounds.left - gallery.clientLeft;
		const y = event.clientY - bounds.top - gallery.clientTop;
		if (x < 0 || x >= gallery.clientWidth || y < 0 || y >= gallery.clientHeight) return;
		dragStart = {
			pointerId: event.pointerId,
			x: event.clientX,
			scrollLeft: gallery.scrollLeft
		};
		dragging = true;
		gallery.focus({ preventScroll: true });
		gallery.setPointerCapture(event.pointerId);
		event.preventDefault();
	}

	function moveDrag(event: PointerEvent) {
		if (!gallery || !dragStart || event.pointerId !== dragStart.pointerId) return;
		gallery.scrollLeft = dragStart.scrollLeft + dragStart.x - event.clientX;
	}

	function endDrag(event: PointerEvent) {
		if (!dragStart || event.pointerId !== dragStart.pointerId) return;
		dragStart = undefined;
		dragging = false;
		if (gallery?.hasPointerCapture(event.pointerId)) gallery.releasePointerCapture(event.pointerId);
	}

	function onGalleryKeydown(event: KeyboardEvent) {
		if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
		event.preventDefault();
		scrollGallery(event.key === 'ArrowRight' ? 1 : -1);
	}

	function keyboardNavigation(node: HTMLDivElement) {
		node.tabIndex = 0;
		node.addEventListener('keydown', onGalleryKeydown);
		return {
			destroy: () => node.removeEventListener('keydown', onGalleryKeydown)
		};
	}
</script>

<Meta />

<Section aria-labelledby="home-heading">
	<div class="grid items-center gap-12 md:grid-cols-[1.15fr_1fr] lg:gap-20">
		<div>
			<p class="eyebrow text-accent-green">Spring 2027 / Boston, MA</p>
			<h1 id="home-heading" class="mt-4 display-xl">
				Build something<br />bold this spring.
			</h1>
			<p class="mt-6 max-w-[520px] text-lede text-text-muted">
				A new student hackathon in Boston. A weekend to learn new tech, find your people, and turn
				an idea into something real.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<Button href={resolve('/notify')} class="gap-3"
					>Pre-register <span aria-hidden="true">↗</span></Button
				>
				<Button href={resolve('/sponsors')} variant="secondary">Become a sponsor</Button>
			</div>
			<p class="mt-5 font-label text-xs leading-relaxed text-text-muted">
				Exact date + venue TBD.<br />Pre-register to hear when details are ready.
			</p>
		</div>
		<div class="hero-photo">
			<img
				class="hero-photo__image"
				src="/images/home/collaboration.webp"
				alt="Two students collaborating on a project"
				width="600"
				height="600"
				fetchpriority="high"
			/>
			<div class="hero-photo__mascot" aria-hidden="true">
				<img src={bug} alt="" width="120" height="120" />
			</div>
		</div>
	</div>
</Section>

<Section tone="forest" class="py-8! sm:py-10!" aria-label="HackBoston at a glance">
	<dl class="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-8">
		{#each stats as stat (stat.label)}
			<div class="flex flex-col gap-3">
				<dt class="order-2 font-label text-xs text-accent-green-tint">{stat.label}</dt>
				<dd class="display-stat">{stat.value}</dd>
			</div>
		{/each}
	</dl>
</Section>

<Section aria-labelledby="gallery-heading">
	<div class="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
		<h2 id="gallery-heading" class="display-l">
			Laptops, hardware,<br />and midnight snacks.
		</h2>
		<a class="home-link" href={resolve('/tracks')}
			>Explore tracks & prizes <span aria-hidden="true">↗</span></a
		>
	</div>
	<div
		bind:this={gallery}
		use:keyboardNavigation
		class="photo-gallery mt-7"
		class:photo-gallery--dragging={dragging}
		role="region"
		aria-label="Hackathon inspiration photos"
		aria-describedby="gallery-caption"
		onpointerdown={startDrag}
		onpointermove={moveDrag}
		onpointerup={endDrag}
		onpointercancel={endDrag}
		onlostpointercapture={endDrag}
	>
		{#each photos as photo (photo.src)}
			<img
				src={photo.src}
				alt={photo.alt}
				width={photo.width}
				height={photo.height}
				loading="lazy"
				decoding="async"
				draggable="false"
			/>
		{/each}
	</div>
	<div class="mt-4 flex items-center justify-between gap-4">
		<p id="gallery-caption" class="font-label text-[0.625rem] leading-relaxed text-text-muted">
			<span class="uppercase">Photos: Hack Club Summit + Assemble</span><br />
			Inspiration for our first HackBoston · drag to explore
		</p>
		<div class="flex shrink-0 gap-2">
			<button class="gallery-arrow" aria-label="Previous photos" onclick={() => scrollGallery(-1)}
				><span aria-hidden="true">←</span></button
			>
			<button class="gallery-arrow" aria-label="Next photos" onclick={() => scrollGallery(1)}
				><span aria-hidden="true">→</span></button
			>
		</div>
	</div>
</Section>

<Section class="pt-0!" aria-labelledby="participate-heading">
	<h2 id="participate-heading" class="display-l">Three ways to be part of it.</h2>
	<ol class="mt-8 border-b border-text-ink/30">
		<li class="participation-row">
			<span class="participation-number" aria-hidden="true">01</span>
			<div>
				<h3 class="display-m">Come build</h3>
				<p class="mt-2 text-text-muted">
					All backgrounds. All skill levels. Get an email when the date and venue are set.
				</p>
			</div>
			<div class="participation-action">
				<Button href={resolve('/notify')} class="gap-3"
					>Come build <span aria-hidden="true">↗</span></Button
				>
			</div>
		</li>
		<li class="participation-row">
			<span class="participation-number" aria-hidden="true">02</span>
			<div>
				<h3 class="display-m">Sponsor the weekend</h3>
				<p class="mt-2 text-text-muted">
					Meet student builders and put your tools in their hands. Tiers from $500.
				</p>
			</div>
			<a class="home-link participation-action" href={resolve('/sponsors')}
				>Sponsor tiers <span aria-hidden="true">↗</span></a
			>
		</li>
		<li class="participation-row">
			<span class="participation-number" aria-hidden="true">03</span>
			<div>
				<h3 class="display-m">Mentor or help</h3>
				<p class="mt-2 text-text-muted">
					Share your time, APIs, or hardware. Help students take their next step.
				</p>
			</div>
			<a class="home-link participation-action" href="mailto:{teamEmail}"
				>Mentor with us <span aria-hidden="true">↗</span></a
			>
		</li>
	</ol>
</Section>

<Section tone="green-wash" aria-labelledby="sponsorship-heading">
	<div class="flex items-start justify-between gap-8">
		<div class="max-w-[640px]">
			<p class="eyebrow text-accent-green">Invest in Boston’s next builders</p>
			<h2 id="sponsorship-heading" class="mt-3 display-l">Help make the first one happen.</h2>
			<p class="mt-4 text-lede text-text-muted">
				Sponsorship goes directly to the venue, food, swag, and the hacker experience.
			</p>
		</div>
		<div class="sponsor-mascot hidden sm:flex" aria-hidden="true">
			<img src={bug} alt="" width="72" height="72" />
		</div>
	</div>
	<ul class="sponsor-tiers mt-8">
		{#each tiers as tier (tier.name)}
			<li>
				<a href={resolve('/sponsors')}>
					<span class="display-s">{tier.name}</span>
					<span class="mt-2 font-label text-sm text-accent-green">{tier.price}</span>
				</a>
			</li>
		{/each}
	</ul>
	<div class="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
		<a class="home-link" href={resolve('/sponsors')}
			>Explore sponsorship <span aria-hidden="true">↗</span></a
		>
		<a class="home-link" href="mailto:{logisticsEmail}"
			>Have a venue? Let’s talk <span aria-hidden="true">↗</span></a
		>
	</div>
</Section>

<!-- Placeholder until the Home page lands. Nav and Footer come from +layout.svelte. -->
<!-- <Section>
	<div class="flex flex-col items-start gap-8">
		<h1 class="display-xl">Build something<br />bold this spring.</h1>
		<div class="flex flex-wrap gap-4">
			<Button href={resolve('/sponsors' as Pathname)}>Become a sponsor</Button>
		</div>
	</div>
</Section> -->

<style>
	.hero-photo {
		position: relative;
		width: min(100% - 1.5rem, 520px);
		margin: 0 auto 1.5rem;
	}

	.hero-photo__image {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 1.05;
		object-fit: cover;
		border: 2px solid var(--text-ink);
		border-radius: var(--radius-card);
	}

	.hero-photo__mascot,
	.sponsor-mascot {
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		border: 2px solid var(--text-ink);
		border-radius: var(--radius-pill);
		background: var(--bg-paper);
	}

	.hero-photo__mascot {
		position: absolute;
		bottom: -1.5rem;
		left: -1.5rem;
		display: flex;
		width: clamp(100px, 13vw, 160px);
		aspect-ratio: 1;
	}

	.hero-photo__mascot img,
	.sponsor-mascot img {
		width: 100%;
		height: auto;
	}

	.sponsor-mascot {
		width: 100px;
		aspect-ratio: 1;
	}

	.home-link {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		font-family: var(--font-label);
		font-size: 0.875rem;
		line-height: 1.5;
		text-decoration: none;
	}

	.home-link:hover {
		color: var(--accent-green);
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.photo-gallery {
		display: flex;
		gap: 1rem;
		overflow-x: auto;
		padding-bottom: 0.75rem;
		border-radius: var(--radius-image);
		cursor: grab;
		scrollbar-width: thin;
		scrollbar-color: var(--accent-green) var(--bg-paper-deep);
		user-select: none;
	}

	.photo-gallery--dragging {
		cursor: grabbing;
	}

	.photo-gallery img {
		flex: 0 0 auto;
		width: 250px;
		height: 210px;
		object-fit: cover;
		border-radius: var(--radius-image);
		pointer-events: none;
	}

	.photo-gallery img:nth-child(2) {
		width: 150px;
	}

	.gallery-arrow {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border: 1px solid var(--text-muted);
		border-radius: var(--radius-pill);
		background: transparent;
		color: var(--text-ink);
		font-size: 1.25rem;
		cursor: pointer;
	}

	.gallery-arrow:hover {
		background: var(--bg-paper-deep);
	}

	.participation-row {
		display: grid;
		grid-template-columns: 2rem minmax(0, 1fr);
		gap: 1rem;
		align-items: center;
		padding: 1.75rem 0;
		border-top: 1px solid var(--text-ink);
	}

	.participation-number {
		align-self: start;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.75rem;
		line-height: 1.2;
		color: var(--accent-green);
	}

	.participation-action {
		grid-column: 2;
		justify-self: start;
	}

	.sponsor-tiers {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		border-top: 1px solid var(--text-muted);
		border-bottom: 1px solid var(--text-muted);
	}

	.sponsor-tiers li:nth-child(odd) {
		border-right: 1px solid var(--text-muted);
	}

	.sponsor-tiers li:nth-child(-n + 2) {
		border-bottom: 1px solid var(--text-muted);
	}

	.sponsor-tiers a {
		display: flex;
		flex-direction: column;
		padding: 1.25rem;
		text-decoration: none;
	}

	.sponsor-tiers a:hover {
		background: var(--accent-green-tint);
	}

	@media (min-width: 640px) {
		.photo-gallery {
			gap: 1.5rem;
		}

		.photo-gallery img {
			width: 320px;
			height: 270px;
		}

		.photo-gallery img:nth-child(2) {
			width: 190px;
		}

		.sponsor-tiers {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}

		.sponsor-tiers li:not(:last-child) {
			border-right: 1px solid var(--text-muted);
		}

		.sponsor-tiers li:nth-child(-n + 2) {
			border-bottom: 0;
		}
	}

	@media (min-width: 768px) {
		.hero-photo {
			width: 100%;
		}

		.participation-row {
			grid-template-columns: 3rem minmax(0, 1fr) auto;
			gap: 1.5rem;
		}

		.participation-number {
			align-self: center;
		}

		.participation-action {
			grid-column: 3;
			grid-row: 1;
			justify-self: end;
		}
	}

	@media (min-width: 1024px) {
		.photo-gallery img {
			width: 400px;
			height: 320px;
		}

		.photo-gallery img:nth-child(2) {
			width: 240px;
		}
	}
</style>
