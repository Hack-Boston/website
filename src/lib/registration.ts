export type RegistrationForm = {
	firstName: string;
	lastName: string;

	school: string;

	major: string;
	gradYear: string;

	email: string;
	dob: string;

	allergies: string[];
	allergiesOther: string;

	tshirtSize: string;

	projectIdea: string;
};

export type ValidationResult = {
	ok: boolean;
	errors: Record<string, string>;
	data?: RegistrationForm;
};


export function countWords(text: string) {
	return text.trim().split(/\s+/).filter(Boolean).length;
}

export function validateRegistration(payload: RegistrationForm): ValidationResult {
	const errors: Record<string, string> = {};

	const reqStr = (key: keyof RegistrationForm) => {
		const v = payload?.[key];
		if (typeof v !== "string" || v.trim().length === 0) errors[String(key)] = "Required";
	};

	reqStr("firstName");
	reqStr("lastName");
	reqStr("email");
	reqStr("dob");
	reqStr("major");
	reqStr("gradYear");
	reqStr("school");
	reqStr("tshirtSize");
	reqStr("projectIdea");

	if (typeof payload?.email === "string" && !/^\S+@\S+\.\S+$/.test(payload.email)) {
		errors.email = "Invalid email";
	}

	if (payload?.school === "__OTHER__") {
		errors.schoolOther = "Please type your school";
	}

	if (payload?.allergies != null) {
		if (!Array.isArray(payload.allergies) || payload.allergies.some((x: any) => typeof x !== "string")) {
			errors.allergies = "Invalid allergies";
		}
	}

	if (typeof payload?.projectIdea === "string") {
		const words = countWords(payload.projectIdea);
		if (words > 250) errors.projectIdea = `Too long (${words}/250 words)`;
	}

	if (Object.keys(errors).length > 0) {
		return { ok: false, errors };
	}

	const data: RegistrationForm = {
		firstName: payload.firstName.trim(),
		lastName: payload.lastName.trim(),
		school: payload.school.trim(),
		major: payload.major.trim(),
		gradYear: payload.gradYear.trim(),
		email: payload.email.trim(),
		dob: payload.dob.trim(),
		allergies: Array.isArray(payload.allergies) ? payload.allergies : [],
		allergiesOther: (payload.allergiesOther ?? "").trim(),
		tshirtSize: payload.tshirtSize.trim(),
		projectIdea: payload.projectIdea.trim()
	};

	return { ok: true, errors: {}, data };
}