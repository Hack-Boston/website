/**
 * Site-wide links and settings used by the shared Nav and Footer.
 * Change these values here, not in the components.
 */

export interface NavLink {
	label: string;
	href: string;
}

export interface SocialLink {
	/** Visible name, for example "Instagram". */
	label: string;
	href: string;
}

export interface ContactEmail {
	label: string;
	email: string;
}

/**
 * Set to true when registration opens (milestone "Registration opens").
 * While false, Register links go to the Get notified page.
 */
export const registrationOpen = false;

export const notifyHref = '/notify';

/** Nav links, in Figma order. Register and Contact are footer-only. */
export const navLinks: NavLink[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Team', href: '/team' },
	{ label: 'Schedule', href: '/schedule' },
	{ label: 'Sponsors', href: '/sponsors' },
	{ label: 'FAQ', href: '/faq' }
];

<<<<<<< Updated upstream
=======
/** Footer "Pages" column, split into the two Figma columns. */
export const footerPageColumns: NavLink[][] = [
    [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Team', href: '/team' }
    ],
    [
        { label: 'Sponsors', href: '/sponsors' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Register', href: registerHref },
        { label: 'Code of Conduct', href: '/conduct' }
    ]
];


>>>>>>> Stashed changes
export const contactEmails: ContactEmail[] = [
	{ label: 'General', email: 'team@hackboston.dev' },
	{ label: 'Sponsors', email: 'sponsorship@hackboston.dev' },
	{ label: 'Venue + logistics', email: 'logistics@hackboston.dev' }
];

/** Shown on the error page so visitors can report a broken page. */
export const supportEmail = 'support@hackboston.dev';

/**
 * Social accounts for the footer (#17). Empty until the accounts are confirmed.
 * When this list is empty, the footer hides the Socials column.
 */
export const socialLinks: SocialLink[] = [];

export const fiscalSponsorLine =
	'Fiscally sponsored by Patchwork Labs Inc., a 501(c)(3) nonprofit. EIN 39-3310316.';

/** True when `pathname` is `href` or a child route of `href`. */
export function isActivePath(pathname: string, href: string): boolean {
	if (href === '/') return pathname === '/';
	return pathname === href || pathname.startsWith(`${href}/`);
}
