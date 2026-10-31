<script lang="ts">
	import { page } from '$app/state';
	import { siteDescription, siteName, siteUrl } from '../site';

	interface Props {
		/** Page name, shown as "HackBoston - {title}". Leave out on the home page. */
		title?: string;
		/** One or two sentences for search results and link previews. */
		description?: string;
	}

	let { title, description = siteDescription }: Props = $props();

	const fullTitle = $derived(title ? `${siteName} - ${title}` : siteName);
	const url = $derived(`${siteUrl}${page.url.pathname}`);

	// Crawlers need an absolute URL. The file lives in static/assets.
	const image = `${siteUrl}/assets/og-image.png`;
	const imageAlt =
		'HackBoston: Build something bold this spring. Boston, Spring 2027, about 200 student hackers.';
</script>

<!-- Title, description, Open Graph, and Twitter card tags. Use once on every page. -->
<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imageAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={imageAlt} />
</svelte:head>
