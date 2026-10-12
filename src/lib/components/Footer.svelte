<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import {
		contactEmails,
		fiscalSponsorLine,
		footerPageColumns,
		socialLinks,
		type ContactEmail,
		type NavLink,
		type SocialLink
	} from '$lib/site';
	import Container from './Container.svelte';
	import Logo from './Logo.svelte';

	interface Props {
		pageColumns?: NavLink[][];
		contacts?: ContactEmail[];
		/** Social links (#17). The Socials column shows only when this has items or `socialsSlot` is set. */
		socials?: SocialLink[];
		/** Optional custom content for the Socials column, for example icon links. */
		socialsSlot?: Snippet;
	}

	let {
		pageColumns = footerPageColumns,
		contacts = contactEmails,
		socials = socialLinks,
		socialsSlot
	}: Props = $props();

	const year = new Date().getFullYear();
	const showSocials = $derived(Boolean(socialsSlot) || socials.length > 0);
</script>

<footer class="bg-bg-forest pt-12 pb-8 text-text-on-dark">
	<Container class="flex flex-col gap-8">
		<div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
			<div class="pt-2">
				<a href={resolve('/')} class="footer__home" aria-label="HackBoston home">
					<Logo tone="light" size="footer" />
				</a>
			</div>

			<div class="flex flex-col gap-10 sm:flex-row sm:flex-wrap sm:gap-x-24 sm:gap-y-10">
				<nav aria-labelledby="footer-pages" class="flex flex-col gap-3">
					<h2 id="footer-pages" class="footer__heading">Pages</h2>
					<div class="flex gap-12">
						{#each pageColumns as column, i (i)}
							<ul class="flex flex-col gap-2">
								{#each column as link (link.label)}
									<li>
										<a class="footer__link" href={resolve(link.href as Pathname)}>{link.label}</a>
									</li>
								{/each}
							</ul>
						{/each}
					</div>
				</nav>

				<div class="flex flex-col gap-3">
					<h2 class="footer__heading">Contact</h2>
					<dl class="flex flex-col gap-2">
						{#each contacts as contact (contact.email)}
							<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
								<dt class="footer__label">{contact.label}</dt>
								<dd><a class="footer__link" href="mailto:{contact.email}">{contact.email}</a></dd>
							</div>
						{/each}
					</dl>
				</div>

				{#if showSocials}
					<div class="flex flex-col gap-3">
						<h2 class="footer__heading">Socials</h2>
						{#if socialsSlot}
							{@render socialsSlot()}
						{:else}
							<ul class="flex flex-col gap-2">
								{#each socials as social (social.href)}
									<li>
										<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external URLs -->
										<a class="footer__link" href={social.href} rel="me noopener">{social.label}</a>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				{/if}
			</div>
		</div>

		<div
			class="flex flex-col gap-2 border-t border-accent-green pt-6 font-body text-base leading-normal text-accent-green-tint md:flex-row md:items-center md:justify-between md:gap-6"
		>
			<p>{fiscalSponsorLine}</p>
			<p class="shrink-0">© {year} HackBoston</p>
		</div>
	</Container>
</footer>

<style>
	.footer__home {
		display: inline-flex;
		border-radius: 4px;
	}

	.footer__heading {
		margin: 0;
		font-family: var(--font-label);
		font-weight: 500;
		font-size: 0.75rem;
		line-height: normal;
		color: var(--accent-green-tint);
	}

	.footer__label {
		width: 136px;
		font-family: var(--font-label);
		font-weight: 500;
		font-size: 0.75rem;
		line-height: normal;
		color: var(--accent-green-tint);
		/* Figma uses 0.6. 0.75 keeps 12px text above WCAG AA 4.5:1 on bg-forest. */
		opacity: 0.75;
	}

	.footer__link {
		font-family: var(--font-label);
		font-weight: 500;
		font-size: 0.875rem;
		line-height: normal;
		color: var(--text-on-dark);
		text-decoration: none;
		text-underline-offset: 3px;
	}

	.footer__link:hover {
		text-decoration: underline;
	}

	.footer__link:focus-visible,
	.footer__home:focus-visible {
		outline-color: var(--text-on-dark);
	}

	/* Flex removes the body-font line box, so rows match the Figma 8px gap. */
	li,
	dd {
		display: flex;
		margin: 0;
	}
</style>
