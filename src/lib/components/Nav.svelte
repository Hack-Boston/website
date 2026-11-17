<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Pathname } from '$app/types';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import bugInk from '$lib/assets/bug-ink.svg';
	import { isActivePath, navLinks, registerHref, type NavLink } from '$lib/site';
	import Button from './Button.svelte';
	import Logo from './Logo.svelte';

	interface Props {
		links?: NavLink[];
		ctaHref?: string;
		ctaLabel?: string;
	}

	let { links = navLinks, ctaHref = registerHref, ctaLabel = 'Register' }: Props = $props();

	let menuOpen = $state(false);
	let menuButton: HTMLButtonElement | undefined = $state();

	/** Scroll progress from 0 to 1. Drives the crawling bug and its trail. */
	let progress = $state(0);
	let scrolling = $state(false);
	/** Past the top of the page: the bar shrinks and the logo bug runs on the track. */
	let collapsed = $state(false);

	/** Scrolled distance (px) that collapses the bar. */
	const COLLAPSE_AT = 24;

	// The logo bug and the track bug are one bug: it hops between the two spots.
	const [send, receive] = crossfade({
		duration: () => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 550),
		easing: cubicInOut
	});

	const pathname = $derived(page.url.pathname);

	// Close the mobile menu after each navigation.
	$effect(() => {
		void pathname;
		menuOpen = false;
	});

	$effect(() => {
		let frame = 0;
		let idleTimer: ReturnType<typeof setTimeout> | undefined;

		const update = () => {
			frame = 0;
			const max = document.documentElement.scrollHeight - window.innerHeight;
			progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
			collapsed = window.scrollY > COLLAPSE_AT;
		};

		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
			scrolling = true;
			clearTimeout(idleTimer);
			idleTimer = setTimeout(() => (scrolling = false), 160);
		};

		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			cancelAnimationFrame(frame);
			clearTimeout(idleTimer);
		};
	});

	function closeMenu(returnFocus = false) {
		menuOpen = false;
		if (returnFocus) menuButton?.focus();
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && menuOpen) closeMenu(true);
	}
</script>

<svelte:window onkeydown={onKeydown} />

<header class="nav" class:nav--collapsed={collapsed} style:--progress={progress}>
	<div class="nav__bar">
		<div
			class="nav__row mx-auto flex w-full max-w-[calc(var(--content-max)+2*var(--space-gutter))] items-center justify-between gap-6 px-gutter"
		>
			<a href={resolve('/')} class="nav__home" aria-label="HackBoston home">
				<span class="nav__logo-bug">
					{#if !collapsed}
						<img
							src={bugInk}
							alt=""
							width="52"
							height="52"
							in:receive={{ key: 'bug' }}
							out:send={{ key: 'bug' }}
						/>
					{/if}
				</span>
				<Logo tone="ink" size="nav" bug={false} />
			</a>

			<nav aria-label="Main" class="hidden lg:block">
				<ul class="flex gap-10">
					{#each links as link (link.href)}
						<li>
							<a
								href={resolve(link.href as Pathname)}
								class="nav__link"
								aria-current={isActivePath(pathname, link.href) ? 'page' : undefined}
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<div class="hidden lg:block">
				<!-- Small, so the bug can crawl under it on the collapsed bar. -->
				<Button href={resolve(ctaHref as Pathname)} size="sm">{ctaLabel}</Button>
			</div>

			<button
				bind:this={menuButton}
				type="button"
				class="nav__toggle lg:hidden"
				aria-expanded={menuOpen}
				aria-controls="nav-menu"
				onclick={() => (menuOpen = !menuOpen)}
			>
				<span class="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
				<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none">
					{#if menuOpen}
						<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" />
					{:else}
						<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" />
					{/if}
				</svg>
			</button>
		</div>

		<div id="nav-menu" class="nav__menu lg:hidden" hidden={!menuOpen}>
			<nav aria-label="Main mobile">
				<ul class="flex flex-col gap-1 px-gutter py-4">
					{#each links as link (link.href)}
						<li>
							<a
								href={resolve(link.href as Pathname)}
								class="nav__link nav__link--mobile"
								aria-current={isActivePath(pathname, link.href) ? 'page' : undefined}
								onclick={() => closeMenu()}
							>
								{link.label}
							</a>
						</li>
					{/each}
					<li class="pt-3">
						<Button href={resolve(ctaHref as Pathname)} onclick={() => closeMenu()}
							>{ctaLabel}</Button
						>
					</li>
				</ul>
			</nav>
		</div>

		<!-- Scroll progress: the bug crawls along the bottom edge. Decorative only. -->
		<div class="nav__progress" aria-hidden="true">
			<div class="nav__track"></div>
			<div class="nav__trail"></div>
			{#if collapsed}
				<span class="nav__bug" in:receive={{ key: 'bug' }} out:send={{ key: 'bug' }}>
					<img class:nav__bug--moving={scrolling} src={bugInk} alt="" width="40" height="40" />
				</span>
			{/if}
		</div>
	</div>
</header>

<style>
	/*
	 * The header always reserves the full nav height so the page never shifts.
	 * Only the bar inside it shrinks; the space below the collapsed bar lets
	 * clicks through to the page.
	 */
	.nav {
		--progress: 0;
		position: sticky;
		top: 0;
		z-index: 50;
		height: var(--nav-height);
		pointer-events: none;
	}

	.nav__bar {
		position: relative;
		height: var(--nav-height);
		background: var(--bg-paper);
		pointer-events: auto;
		transition: height 300ms ease;
	}

	.nav--collapsed .nav__bar {
		height: var(--nav-height-compact);
	}

	/* Collapsed, the content sits in a shorter row so the bug has a lane below it. */
	.nav__row {
		height: var(--nav-height);
		transition: height 300ms ease;
	}

	.nav--collapsed .nav__row {
		height: var(--nav-row-compact);
	}

	.nav__home {
		display: inline-flex;
		align-items: center;
		border-radius: 4px;
	}

	/* Holds the bug (sizes match Logo size="nav"); it narrows once the bug leaves. */
	.nav__logo-bug {
		--logo-bug-size: 40px;
		display: block;
		flex-shrink: 0;
		width: var(--logo-bug-size);
		height: var(--logo-bug-size);
		margin-right: 16px;
		transition:
			width 300ms ease 150ms,
			margin-right 300ms ease 150ms;
	}

	.nav__logo-bug img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.nav--collapsed .nav__logo-bug {
		width: 0;
		margin-right: 0;
		transition-delay: 0ms;
	}

	@media (min-width: 640px) {
		.nav__logo-bug {
			--logo-bug-size: 52px;
		}
	}

	.nav__link {
		font-family: var(--font-label);
		font-weight: 500;
		font-size: 0.875rem;
		line-height: normal;
		color: var(--text-ink);
		text-decoration: none;
		text-underline-offset: 3px;
	}

	.nav__link:hover {
		color: var(--accent-green);
		text-decoration: underline;
	}

	.nav__link[aria-current='page'] {
		color: var(--accent-green);
		text-decoration: underline;
	}

	.nav__link--mobile {
		display: block;
		padding: 12px 0;
		font-size: 1rem;
	}

	.nav__toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border: 2px solid var(--text-ink);
		border-radius: var(--radius-pill);
		background: transparent;
		color: var(--text-ink);
		cursor: pointer;
	}

	/* Scoped styles beat the lg:hidden utility, so hide the mobile parts here. */
	@media (min-width: 1024px) {
		.nav__toggle,
		.nav__menu {
			display: none;
		}
	}

	.nav__menu {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: var(--bg-paper);
		border-bottom: 2px solid var(--bg-green-wash);
		box-shadow: 0 12px 24px -16px rgb(31 46 38 / 0.35);
	}

	.nav__menu[hidden] {
		display: none;
	}

	.nav__progress {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 2px;
		pointer-events: none;
	}

	.nav__track,
	.nav__trail {
		position: absolute;
		inset: 0;
	}

	.nav__track {
		background: var(--bg-green-wash);
	}

	.nav__trail {
		background: var(--accent-green);
		transform-origin: left center;
		transform: scaleX(var(--progress));
	}

	/*
	 * Figma (40px bug): the nose sits 6px past the trail end, and the bug rests on
	 * the track. Phones use a 28px bug so it does not cover the logo.
	 */
	.nav__bug {
		--bug-size: 28px;
		position: absolute;
		bottom: 0;
		left: clamp(
			0px,
			calc(var(--progress) * 100% - var(--bug-size) * 0.85),
			calc(100% - var(--bug-size))
		);
		width: var(--bug-size);
		height: var(--bug-size);
	}

	.nav__bug img {
		display: block;
		width: 100%;
		height: 100%;
		transform-origin: 50% 90%;
	}

	@media (min-width: 640px) {
		.nav__bug {
			--bug-size: 40px;
		}
	}

	.nav__bug--moving {
		animation: nav-bug-wiggle 180ms ease-in-out infinite alternate;
	}

	@keyframes nav-bug-wiggle {
		from {
			transform: translateY(0) rotate(-3deg);
		}
		to {
			transform: translateY(-1px) rotate(3deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.nav__bug--moving {
			animation: none;
		}
	}
</style>
