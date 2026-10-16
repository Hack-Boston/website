<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Pathname } from '$app/types';
	import bugInk from '$lib/assets/bug-ink.svg';
	import { isActivePath, navLinks, type NavLink } from '$lib/site';
	import Button from './Button.svelte';
	import Logo from './Logo.svelte';

	interface Props {
		links?: NavLink[];
	}

	let { links = navLinks }: Props = $props();

	let menuOpen = $state(false);
	let menuButton: HTMLButtonElement | undefined = $state();

	/** Scroll progress from 0 to 1. Drives the crawling bug and its trail. */
	let progress = $state(0);
	let scrolling = $state(false);

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

<header class="nav" style:--progress={progress}>
	<div
		class="mx-auto flex h-[var(--nav-height)] w-full max-w-[calc(var(--content-max)+2*var(--space-gutter))] items-center justify-between gap-6 px-gutter"
	>
		<a href={resolve('/')} class="nav__home" aria-label="HackBoston home">
			<Logo tone="ink" size="nav" />
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
			<Button href='/register'>Pre-register</Button>
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
					<Button href='/register' onclick={() => closeMenu()}>Pre-register</Button>
				</li>
			</ul>
		</nav>
	</div>

	<!-- Scroll progress: the bug crawls along the bottom edge. Decorative only. -->
	<div class="nav__progress" aria-hidden="true">
		<div class="nav__track"></div>
		<div class="nav__trail"></div>
		<img
			class="nav__bug"
			class:nav__bug--moving={scrolling}
			src={bugInk}
			alt=""
			width="40"
			height="40"
		/>
	</div>
</header>

<style>
	.nav {
		--progress: 0;
		position: sticky;
		top: 0;
		z-index: 50;
		background: var(--bg-paper);
	}

	.nav__home {
		display: inline-flex;
		border-radius: 4px;
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
