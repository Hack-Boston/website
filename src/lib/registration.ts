/**
 * Register form model and validation (#2, #20).
 * The page and /api/register both use validateRegistration, so the rules match on both sides.
 */
import { countries } from './countries';

export const MAX_WORDS = 250;

/** Select value for "Other" in the school picker. */
export const OTHER_SCHOOL = 'Other';

export const SCHOOLS_CSV_URL =
	'https://raw.githubusercontent.com/MLH/mlh-policies/main/schools.csv';

/** MLH does not allow date of birth, so we ask for age. Applicants must be 18 by the event. */
export const ages = [...Array.from({ length: 13 }, (_, i) => String(18 + i)), '31+'];

/** MLH "Level of Study" list from the organizer guide. Do not change the wording. */
export const levelsOfStudy = [
	'Secondary / High School',
	'Undergraduate University (2 year - community college or similar)',
	'Undergraduate University (3+ year)',
	'Graduate University (Masters, Professional, Doctoral, etc)',
	'Code School / Bootcamp',
	'Other Vocational / Trade Program or Apprenticeship',
	'Post Doctorate',
	'Other',
	'I’m not currently a student',
	'Prefer not to answer'
];

/** Adult unisex sizes. */
export const tshirtSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

/** "None" clears the others. "Other" asks for details in the notes field. */
export const NO_ALLERGIES = 'None';
export const OTHER_ALLERGY = 'Other';
export const allergyOptions = [
	NO_ALLERGIES,
	'Peanuts',
	'Tree nuts',
	'Dairy',
	'Eggs',
	'Gluten / wheat',
	'Shellfish',
	'Soy',
	'Sesame',
	OTHER_ALLERGY
];

const firstGradYear = new Date().getFullYear();
export const gradYears = Array.from({ length: 9 }, (_, i) => String(firstGradYear + i));

/** "Is this your first hackathon?" */
export const firstHackathonOptions = ['Yes', 'No'];

/** "How would you rate your coding experience?" */
export const codingExperienceLevels = ['Beginner', 'Intermediate', 'Advanced'];

/** "Are you applying as an individual or part of a team?" */
export const APPLYING_AS_TEAM = 'Part of a team';
export const applyingAsOptions = ['Individual', APPLYING_AS_TEAM];

/** Teams are up to 4 people: the applicant plus 3 teammates. */
export const MAX_TEAMMATES = 3;

/** "What is your primary role on a team?" */
export const teamRoles = [
	'Frontend',
	'Backend',
	'Full-stack',
	'Mobile',
	'UI/UX Designer',
	'Product Manager',
	'Hardware/Embedded'
];

/** Long-form questions. Each has a MAX_WORDS limit. `hint` shows under the prompt. */
export const shortAnswerQuestions: readonly {
	name: 'projectIdea' | 'proudProject' | 'whyHackBoston' | 'learnedQuickly';
	/** Used in the error summary, for example "Project idea is missing." */
	summaryName: string;
	label: string;
	hint?: string;
	placeholder: string;
}[] = [
	{
		name: 'projectIdea',
		summaryName: 'Project idea',
		label: 'Describe a project you might build at HackBoston.',
		placeholder: 'A few sentences is plenty…'
	},
	{
		name: 'proudProject',
		summaryName: 'Recent project',
		label: 'Describe a recent technical project or hack you are proud of. What did you learn?',
		hint: 'Haven’t built a project yet? Describe a piece of technology that fascinates you and why.',
		placeholder: 'What you built, how, and what you took away from it…'
	},
	{
		name: 'whyHackBoston',
		summaryName: 'Why HackBoston',
		label: 'Why do you want to attend HackBoston, and what do you hope to learn or build?',
		placeholder: 'What draws you to HackBoston…'
	},
	{
		name: 'learnedQuickly',
		summaryName: 'Learning quickly',
		label:
			'Tell us about a time you had to learn a new tool or skill quickly. How did you handle it?',
		placeholder: 'What you had to learn, and how you went about it…'
	}
];

export type ShortAnswerName = (typeof shortAnswerQuestions)[number]['name'];

export type Teammate = { name: string; email: string };

export type RegistrationForm = {
	firstName: string;
	lastName: string;
	email: string;
	age: string;
	phone: string;
	/** ISO 3166-1 alpha-2 code. */
	country: string;

	/** A name from the MLH school list, or OTHER_SCHOOL. */
	school: string;
	/** The typed school name when school is OTHER_SCHOOL. */
	schoolOther: string;
	levelOfStudy: string;
	major: string;
	gradYear: string;

	/** "Yes" or "No". */
	firstHackathon: string;
	codingExperience: string;
	/** Optional. Stored as a full https:// URL. */
	githubUrl: string;
	/** Optional. Stored as a full https:// URL. */
	portfolioUrl: string;
	/** Optional. Stored as a full https:// URL. */
	linkedinUrl: string;

	applyingAs: string;
	/** Only kept when applyingAs is APPLYING_AS_TEAM. */
	teammates: Teammate[];
	primaryRole: string;

	tshirtSize: string;
	allergies: string[];
	/** Details when allergies includes OTHER_ALLERGY. */
	allergiesOther: string;
	/** "Anything else we should know?" Optional. */
	dietaryNotes: string;

	projectIdea: string;
	proudProject: string;
	whyHackBoston: string;
	learnedQuickly: string;

	agreeMlhCodeOfConduct: boolean;
	agreeMlhDataSharing: boolean;
	/** Optional. MLH requires the checkbox on the form. */
	mlhEmails: boolean;
	agreeHackBostonPolicies: boolean;
	agreeWaiver: boolean;
};

export type FieldName = keyof RegistrationForm;

/** Data we store. School is resolved, so schoolOther is gone. */
export type Registration = Omit<RegistrationForm, 'schoolOther'>;

export type FieldError = {
	/** Shown under the field. */
	message: string;
	/** Shown in the error summary at the top of the form. */
	summary: string;
};

export type RegistrationErrors = Partial<Record<FieldName, FieldError>>;

export type ValidationResult =
	| { ok: true; data: Registration }
	| { ok: false; errors: RegistrationErrors };

/** Field order on the page. The error summary and "scroll to first error" follow it. */
export const fieldOrder: FieldName[] = [
	'firstName',
	'lastName',
	'email',
	'age',
	'phone',
	'country',
	'school',
	'schoolOther',
	'levelOfStudy',
	'major',
	'gradYear',
	'firstHackathon',
	'codingExperience',
	'githubUrl',
	'portfolioUrl',
	'linkedinUrl',
	'applyingAs',
	'teammates',
	'primaryRole',
	'tshirtSize',
	'allergies',
	'allergiesOther',
	'dietaryNotes',
	'projectIdea',
	'proudProject',
	'whyHackBoston',
	'learnedQuickly',
	'agreeMlhCodeOfConduct',
	'agreeMlhDataSharing',
	'mlhEmails',
	'agreeHackBostonPolicies',
	'agreeWaiver'
];

export function emptyRegistration(): RegistrationForm {
	return {
		firstName: '',
		lastName: '',
		email: '',
		age: '',
		phone: '',
		country: 'US',
		school: '',
		schoolOther: '',
		levelOfStudy: '',
		major: '',
		gradYear: '',
		firstHackathon: '',
		codingExperience: '',
		githubUrl: '',
		portfolioUrl: '',
		linkedinUrl: '',
		applyingAs: '',
		teammates: [],
		primaryRole: '',
		tshirtSize: '',
		allergies: [],
		allergiesOther: '',
		dietaryNotes: '',
		projectIdea: '',
		proudProject: '',
		whyHackBoston: '',
		learnedQuickly: '',
		agreeMlhCodeOfConduct: false,
		agreeMlhDataSharing: false,
		mlhEmails: false,
		agreeHackBostonPolicies: false,
		agreeWaiver: false
	};
}

export function countWords(text: string) {
	return text.trim().split(/\s+/).filter(Boolean).length;
}

const SHORT_TEXT_MAX = 200;
const LONG_TEXT_MAX = 5000;
const countryCodes = new Set(countries.map((c) => c.code));

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
const bool = (value: unknown) => value === true;

/**
 * Turns "github.com/ada" or "https://github.com/ada" into a full https:// URL.
 * Returns null when it is not a web address, or its host is not `host` (or a subdomain of it).
 */
export function normalizeUrl(value: string, host?: string): string | null {
	const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`;
	let url: URL;
	try {
		url = new URL(withScheme);
	} catch {
		return null;
	}
	if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
	const hostname = url.hostname.toLowerCase();
	if (!hostname.includes('.')) return null;
	if (host && hostname !== host && !hostname.endsWith(`.${host}`)) return null;
	return url.href;
}

/**
 * Validates a Register payload. `input` can be anything (it comes from JSON on the server).
 * Pass `schools` on the client, once the MLH list has loaded, to check the school is on it.
 */
export function validateRegistration(
	input: unknown,
	options: { schools?: readonly string[] } = {}
): ValidationResult {
	const raw = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
	const errors: RegistrationErrors = {};
	const fail = (field: FieldName, message: string, summary: string) => {
		errors[field] ??= { message, summary };
	};

	const text = (field: FieldName, max = SHORT_TEXT_MAX) => {
		const value = str(raw[field]);
		if (value.length > max)
			fail(field, `Keep this under ${max} characters.`, 'An answer is too long.');
		return value;
	};

	const required = (field: FieldName, value: string, message: string, summary: string) => {
		if (!value) fail(field, message, summary);
	};

	// 01 About you
	const firstName = text('firstName');
	required('firstName', firstName, 'Enter your first name.', 'First name is missing.');

	const lastName = text('lastName');
	required('lastName', lastName, 'Enter your last name.', 'Last name is missing.');

	const email = text('email');
	required('email', email, 'Enter your email.', 'Email is missing.');
	if (email && !EMAIL_PATTERN.test(email)) {
		fail('email', 'Use your full email, like you@school.edu.', 'Email needs to be a full address.');
	}

	const age = text('age');
	required('age', age, 'Pick your age. You need to be 18 by the event.', 'Age is missing.');
	if (age && !ages.includes(age)) {
		fail('age', 'You need to be 18 by the event.', 'Age is not valid.');
	}

	const phone = text('phone');
	required('phone', phone, 'Enter your phone number.', 'Phone is missing.');
	const phoneDigits = phone.replace(/\D/g, '').length;
	if (phone && (!/^\+?[\d\s().-]+$/.test(phone) || phoneDigits < 7 || phoneDigits > 15)) {
		fail(
			'phone',
			'Use a full phone number, like (617) 555-0123.',
			'Phone number looks incomplete.'
		);
	}

	const country = text('country');
	required('country', country, 'Pick your country of residence.', 'Country is missing.');
	if (country && !countryCodes.has(country)) {
		fail('country', 'Pick a country from the list.', 'Country is not valid.');
	}

	// 02 School
	let school = text('school');
	const schoolOther = text('schoolOther');
	required('school', school, 'Pick your school, or pick Other.', 'School is missing.');
	if (school === OTHER_SCHOOL) {
		required(
			'schoolOther',
			schoolOther,
			'Type the name of your school.',
			'School name is missing.'
		);
		school = schoolOther;
	} else if (school && options.schools?.length && !options.schools.includes(school)) {
		fail(
			'school',
			'Pick your school from the list. Not there? Pick Other.',
			"School isn't on the list."
		);
	}

	const levelOfStudy = text('levelOfStudy');
	required('levelOfStudy', levelOfStudy, 'Pick your level of study.', 'Level of study is missing.');
	if (levelOfStudy && !levelsOfStudy.includes(levelOfStudy)) {
		fail('levelOfStudy', 'Pick a level of study from the list.', 'Level of study is not valid.');
	}

	const major = text('major');
	required('major', major, 'Enter your major. Undecided is fine.', 'Major is missing.');

	const gradYear = text('gradYear');
	required(
		'gradYear',
		gradYear,
		'Pick your expected graduation year.',
		'Graduation year is missing.'
	);
	if (gradYear && !/^\d{4}$/.test(gradYear)) {
		fail('gradYear', 'Pick a year from the list.', 'Graduation year is not valid.');
	}

	const oneOf = (field: FieldName, options: string[], message: string, summary: string) => {
		const value = text(field);
		if (!value) fail(field, message, summary);
		else if (!options.includes(value)) fail(field, 'Pick an option from the list.', summary);
		return value;
	};

	// 03 Experience
	const firstHackathon = oneOf(
		'firstHackathon',
		firstHackathonOptions,
		'Pick Yes or No.',
		'First hackathon is missing.'
	);
	const codingExperience = oneOf(
		'codingExperience',
		codingExperienceLevels,
		'Pick the level that fits best.',
		'Coding experience is missing.'
	);

	/** Optional link. Blank is fine; anything typed must be a web address on `host`. */
	const link = (field: FieldName, host: string | undefined, example: string, summary: string) => {
		const value = text(field, 500);
		if (!value) return '';
		const url = normalizeUrl(value, host);
		if (!url) fail(field, `Use a full link, like ${example}.`, summary);
		return url ?? value;
	};
	const githubUrl = link(
		'githubUrl',
		'github.com',
		'github.com/your-username',
		'GitHub link is not valid.'
	);
	const portfolioUrl = link(
		'portfolioUrl',
		undefined,
		'yourname.dev',
		'Portfolio link is not valid.'
	);
	const linkedinUrl = link(
		'linkedinUrl',
		'linkedin.com',
		'linkedin.com/in/your-name',
		'LinkedIn link is not valid.'
	);

	// 04 Team
	const applyingAs = oneOf(
		'applyingAs',
		applyingAsOptions,
		'Pick Individual or Part of a team.',
		'Team question is missing.'
	);

	let teammates: Teammate[] = [];
	if (applyingAs === APPLYING_AS_TEAM) {
		const rows: unknown[] = Array.isArray(raw.teammates) ? raw.teammates : [];
		teammates = rows
			.map((row) => {
				const r = (row && typeof row === 'object' ? row : {}) as Record<string, unknown>;
				return { name: str(r.name), email: str(r.email) };
			})
			// Fully blank rows are ignored.
			.filter((t) => t.name || t.email);

		if (teammates.length === 0) {
			fail('teammates', 'Add at least one teammate’s name and email.', 'Teammates are missing.');
		} else if (teammates.length > MAX_TEAMMATES) {
			fail(
				'teammates',
				`Teams can have up to ${MAX_TEAMMATES} teammates besides you.`,
				'Too many teammates.'
			);
		} else if (
			teammates.some(
				(t) =>
					!t.name ||
					t.name.length > SHORT_TEXT_MAX ||
					!EMAIL_PATTERN.test(t.email) ||
					t.email.length > SHORT_TEXT_MAX
			)
		) {
			fail(
				'teammates',
				'Each teammate needs a name and a full email, like you@school.edu.',
				'A teammate’s details are incomplete.'
			);
		}
	}

	const primaryRole = oneOf(
		'primaryRole',
		teamRoles,
		'Pick the role you usually take.',
		'Primary role is missing.'
	);

	// 05 The weekend
	const tshirtSize = text('tshirtSize');
	required('tshirtSize', tshirtSize, 'Pick a T-shirt size.', 'T-shirt size is missing.');
	if (tshirtSize && !tshirtSizes.includes(tshirtSize)) {
		fail('tshirtSize', 'Pick a size from the list.', 'T-shirt size is not valid.');
	}

	const allergies = Array.isArray(raw.allergies)
		? raw.allergies.filter((a): a is string => typeof a === 'string')
		: [];
	if (allergies.length === 0) {
		fail(
			'allergies',
			'Pick None if you have no allergies or restrictions.',
			'Food allergies are missing.'
		);
	} else if (allergies.some((a) => !allergyOptions.includes(a))) {
		fail(
			'allergies',
			'Pick from the list. Use the field below for anything else.',
			'Food allergies are not valid.'
		);
	} else if (allergies.includes(NO_ALLERGIES) && allergies.length > 1) {
		fail('allergies', 'Pick None or your allergies, not both.', 'Food allergies conflict.');
	}

	// Only kept when "Other" is picked; the field is hidden otherwise.
	let allergiesOther = text('allergiesOther', 500);
	if (allergies.includes(OTHER_ALLERGY)) {
		required(
			'allergiesOther',
			allergiesOther,
			'Tell us your other allergies or restrictions.',
			'Other allergies need details.'
		);
	} else {
		allergiesOther = '';
	}

	const dietaryNotes = text('dietaryNotes', 1000);

	// 06 Short answers
	const answers = {} as Record<ShortAnswerName, string>;
	shortAnswerQuestions.forEach((question) => {
		const value = text(question.name, LONG_TEXT_MAX);
		const what = question.summaryName;
		required(question.name, value, 'Write a short answer.', `${what} is missing.`);
		const words = countWords(value);
		if (words > MAX_WORDS) {
			fail(
				question.name,
				`Keep it to ${MAX_WORDS} words. You're at ${words}.`,
				`${what} is over ${MAX_WORDS} words.`
			);
		}
		answers[question.name] = value;
	});

	// 07 Agreements
	const mustAgree = (field: FieldName, summary: string) => {
		const value = bool(raw[field]);
		if (!value) fail(field, 'You need to agree to this to register.', summary);
		return value;
	};

	const agreeMlhCodeOfConduct = mustAgree(
		'agreeMlhCodeOfConduct',
		'Agree to the MLH Code of Conduct.'
	);
	const agreeMlhDataSharing = mustAgree(
		'agreeMlhDataSharing',
		'Agree to share your application with MLH.'
	);
	const agreeHackBostonPolicies = mustAgree(
		'agreeHackBostonPolicies',
		'Agree to the HackBoston Code of Conduct and Privacy Policy.'
	);
	const agreeWaiver = mustAgree('agreeWaiver', 'Agree to the photo release and waiver.');

	if (Object.keys(errors).length > 0) return { ok: false, errors };

	return {
		ok: true,
		data: {
			firstName,
			lastName,
			email,
			age,
			phone,
			country,
			school,
			levelOfStudy,
			major,
			gradYear,
			firstHackathon,
			codingExperience,
			githubUrl,
			portfolioUrl,
			linkedinUrl,
			applyingAs,
			teammates,
			primaryRole,
			tshirtSize,
			allergies,
			allergiesOther,
			dietaryNotes,
			...answers,
			agreeMlhCodeOfConduct,
			agreeMlhDataSharing,
			mlhEmails: bool(raw.mlhEmails),
			agreeHackBostonPolicies,
			agreeWaiver
		}
	};
}
