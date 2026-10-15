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
	'Less than Secondary / High School',
	'Secondary / High School',
	'Undergraduate University (2 year - community college or similar)',
	'Undergraduate University (3+ year)',
	'Graduate University (Masters, Professional, Doctoral, etc)',
	'Code School / Bootcamp',
	'Other Vocational / Trade Program or Apprenticeship',
	'Post Doctorate',
	'Other',
	"I'm not currently a student",
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

/** Long-form questions. Q1 is set. Q2 and Q3 are not decided yet (#2). */
export const shortAnswerQuestions = [
	{
		name: 'projectIdea',
		label: 'Describe a project you might build at HackBoston',
		placeholder: 'A few sentences is plenty…'
	},
	{ name: 'question2', label: 'Question 2', placeholder: 'Prompt TBD' },
	{ name: 'question3', label: 'Question 3', placeholder: 'Prompt TBD' }
] as const;

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

	tshirtSize: string;
	allergies: string[];
	/** "Anything else we should know?" */
	dietaryNotes: string;

	projectIdea: string;
	question2: string;
	question3: string;

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
	'tshirtSize',
	'allergies',
	'dietaryNotes',
	'projectIdea',
	'question2',
	'question3',
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
		tshirtSize: '',
		allergies: [],
		dietaryNotes: '',
		projectIdea: '',
		question2: '',
		question3: '',
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

const str = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
const bool = (value: unknown) => value === true;

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
	if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

	// 03 The weekend
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

	const dietaryNotes = text('dietaryNotes', 1000);
	if (allergies.includes(OTHER_ALLERGY)) {
		required(
			'dietaryNotes',
			dietaryNotes,
			'You picked Other. Tell us what it is.',
			'Other allergy needs details.'
		);
	}

	// 04 Short answers
	const answers = {} as Record<(typeof shortAnswerQuestions)[number]['name'], string>;
	shortAnswerQuestions.forEach((question, i) => {
		const value = text(question.name, LONG_TEXT_MAX);
		const what = i === 0 ? 'Project idea' : `Question ${i + 1}`;
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

	// 05 Agreements
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
			tshirtSize,
			allergies,
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
