<script lang="ts">
	import { onMount, tick, type Snippet } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { Button, Field, PageHeader, Section } from '$lib';
	import { countries } from '$lib/countries';
	import {
		MAX_WORDS,
		NO_ALLERGIES,
		OTHER_ALLERGY,
		OTHER_SCHOOL,
		SCHOOLS_CSV_URL,
		ages,
		allergyOptions,
		countWords,
		emptyRegistration,
		fieldOrder,
		gradYears,
		levelsOfStudy,
		shortAnswerQuestions,
		tshirtSizes,
		validateRegistration,
		type FieldName,
		type RegistrationErrors
	} from '$lib/registration';

	const MLH = {
		codeOfConduct: 'https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md',
		contestTerms: 'https://github.com/MLH/mlh-policies/blob/main/contest-terms.md',
		privacyPolicy: 'https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md'
	};

	// HackBoston policy pages: Code of Conduct (#11), Privacy Policy (#12), waiver and photo release (#21).
	const conductHref = resolve('/conduct' as Pathname);
	const privacyHref = resolve('/privacy' as Pathname);
	const waiverHref = resolve('/waiver' as Pathname);

	let form = $state(emptyRegistration());
	let errors = $state<RegistrationErrors>({});
	/** The summary shows after the first submit, and stays while errors remain. */
	let showSummary = $state(false);
	/** Network or server failure that is not tied to a field. */
	let formError = $state('');
	let submitting = $state(false);
	let summaryEl: HTMLElement | undefined = $state();

	let schools: string[] = $state([]);
	let schoolsFailed = $state(false);

	const summaryItems = $derived(
		fieldOrder.flatMap((field) => {
			const error = errors[field];
			return error ? [{ field, text: error.summary }] : [];
		})
	);

	const fieldId = (field: FieldName) => `field-${field}`;

	async function loadSchools() {
		try {
			const res = await fetch(SCHOOLS_CSV_URL);
			if (!res.ok) throw new Error(`schools.csv ${res.status}`);
			const csv = await res.text();
			const names = csv
				.split(/\r?\n/)
				.map((line) => line.trim().replace(/^"|"$/g, '').replace(/""/g, '"').trim())
				// Line 1 is a note from MLH, not a school.
				.filter((name) => name && !name.startsWith('Below is a list'));
			schools = [...new Set(names)].sort((a, b) => a.localeCompare(b));
		} catch {
			schoolsFailed = true;
		}
	}

	onMount(loadSchools);

	/** Validates one field and shows or clears its error. */
	function check(field: FieldName) {
		const result = validateRegistration(form, { schools });
		const error = result.ok ? undefined : result.errors[field];
		const next = { ...errors };
		if (error) next[field] = error;
		else delete next[field];
		errors = next;
	}

	/** While a field shows an error, check it again on each change so the error clears once fixed. */
	function recheck(field: FieldName) {
		if (errors[field]) check(field);
	}

	/** Validate on blur, then live while the error is showing. */
	const validateOn = (field: FieldName) => ({
		onblur: () => check(field),
		oninput: () => recheck(field)
	});

	/** For chip and checkbox groups: check when focus leaves the whole group. */
	function onGroupFocusout(field: FieldName, event: FocusEvent) {
		const group = event.currentTarget as HTMLElement;
		if (!group.contains(event.relatedTarget as Node | null)) check(field);
	}

	function onSchoolInput() {
		if (form.school !== OTHER_SCHOOL && errors.schoolOther) {
			const next = { ...errors };
			delete next.schoolOther;
			errors = next;
		}
		recheck('school');
	}

	function onAnswerInput(field: FieldName, value: string) {
		// Show "over 250 words" right away, not only on blur.
		if (countWords(value) > MAX_WORDS) check(field);
		else recheck(field);
	}

	function toggleAllergy(option: string, checked: boolean) {
		let next: string[];
		if (option === NO_ALLERGIES) {
			next = checked ? [NO_ALLERGIES] : [];
		} else {
			next = form.allergies.filter((a) => a !== NO_ALLERGIES && a !== option);
			if (checked) next.push(option);
		}
		form.allergies = allergyOptions.filter((a) => next.includes(a));
		recheck('allergies');
		recheck('dietaryNotes');
	}

	function focusField(field: FieldName) {
		const el = document.getElementById(fieldId(field));
		if (!el) return;
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		el.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
		el.focus({ preventScroll: true });
	}

	async function showErrors(next: RegistrationErrors) {
		errors = next;
		showSummary = true;
		await tick();
		const first = fieldOrder.find((field) => next[field]);
		if (first) focusField(first);
	}

	async function showFormError(message: string) {
		formError = message;
		showSummary = true;
		await tick();
		summaryEl?.scrollIntoView({ block: 'center' });
		summaryEl?.focus({ preventScroll: true });
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (submitting) return;
		formError = '';

		const result = validateRegistration(form, { schools });
		if (!result.ok) {
			await showErrors(result.errors);
			return;
		}
		errors = {};

		submitting = true;
		try {
			const res = await fetch('/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form)
			});
			const data = await res.json().catch(() => null);

			if (res.ok && data?.ok) {
				await goto(resolve('/register/submitted'));
				return;
			}
			if (data?.errors && Object.keys(data.errors).length > 0) {
				await showErrors(data.errors as RegistrationErrors);
				return;
			}
			await showFormError(
				"We couldn't send your application. Try again, or email team@hackboston.dev."
			);
		} catch {
			await showFormError(
				"We couldn't reach the server. Check your connection and try again. Your answers are still here."
			);
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>HackBoston - Register</title>
</svelte:head>

<PageHeader
	title="Save your spot."
	lede="Takes about five minutes. We read every application, and you’ll hear back by email."
/>

<Section containerClass="register">
	<aside class="register__aside" aria-label="About applying">
		<div>
			<h2 class="eyebrow text-accent-green">Who can apply</h2>
			<p>Any student 18 or older, at any school, in any major. No experience needed.</p>
		</div>
		<div>
			<h2 class="eyebrow text-accent-green">Cost</h2>
			<p>Free. Food, swag, and a place to build are on us.</p>
		</div>
		<div>
			<h2 class="eyebrow text-accent-green">Questions?</h2>
			<p>Email <a href="mailto:team@hackboston.dev">team@hackboston.dev</a></p>
		</div>
	</aside>

	<form class="register__form" novalidate onsubmit={handleSubmit}>
		{#if showSummary && (summaryItems.length > 0 || formError)}
			<div
				class="summary"
				role="alert"
				tabindex="-1"
				aria-labelledby="summary-title"
				bind:this={summaryEl}
			>
				{#if summaryItems.length > 0}
					<p id="summary-title" class="summary__title">
						Fix {summaryItems.length}
						{summaryItems.length === 1 ? 'thing' : 'things'} before you submit
					</p>
					<ul class="summary__list">
						{#each summaryItems as item (item.field)}
							<li>
								<a
									href="#{fieldId(item.field)}"
									onclick={(event) => {
										event.preventDefault();
										focusField(item.field);
									}}>{item.text}</a
								>
							</li>
						{/each}
					</ul>
				{:else}
					<p id="summary-title" class="summary__title">We couldn’t send your application</p>
					<p class="summary__text">{formError}</p>
				{/if}
			</div>
		{/if}

		<!-- 01 About you -->
		<section class="part" aria-labelledby="part-about">
			<h2 id="part-about" class="part__title">
				<span class="part__num">01</span><span class="display-m">About you</span>
			</h2>
			<div class="grid">
				<Field id={fieldId('firstName')} label="First name" error={errors.firstName?.message}>
					{#snippet children({ id, describedby, invalid })}
						<input
							{id}
							class="control"
							type="text"
							autocomplete="given-name"
							placeholder="Ada"
							maxlength="200"
							required
							aria-describedby={describedby}
							aria-invalid={invalid}
							bind:value={form.firstName}
							{...validateOn('firstName')}
						/>
					{/snippet}
				</Field>

				<Field id={fieldId('lastName')} label="Last name" error={errors.lastName?.message}>
					{#snippet children({ id, describedby, invalid })}
						<input
							{id}
							class="control"
							type="text"
							autocomplete="family-name"
							placeholder="Lovelace"
							maxlength="200"
							required
							aria-describedby={describedby}
							aria-invalid={invalid}
							bind:value={form.lastName}
							{...validateOn('lastName')}
						/>
					{/snippet}
				</Field>

				<Field
					id={fieldId('email')}
					label="Email"
					help="We’ll send your decision and event details here."
					error={errors.email?.message}
				>
					{#snippet children({ id, describedby, invalid })}
						<input
							{id}
							class="control"
							type="email"
							inputmode="email"
							autocomplete="email"
							placeholder="you@school.edu"
							maxlength="200"
							required
							aria-describedby={describedby}
							aria-invalid={invalid}
							bind:value={form.email}
							{...validateOn('email')}
						/>
					{/snippet}
				</Field>

				<Field
					id={fieldId('age')}
					label="Age"
					help="You need to be 18 by the event."
					error={errors.age?.message}
				>
					{#snippet children({ id, describedby, invalid })}
						<div class="select">
							<select
								{id}
								class="control"
								class:control--empty={!form.age}
								required
								aria-describedby={describedby}
								aria-invalid={invalid}
								bind:value={form.age}
								{...validateOn('age')}
							>
								<option value="" disabled>Select your age</option>
								{#each ages as age (age)}
									<option value={age}>{age}</option>
								{/each}
							</select>
							{@render chevron()}
						</div>
					{/snippet}
				</Field>

				<Field
					id={fieldId('phone')}
					label="Phone"
					help="Only for urgent messages during the event."
					error={errors.phone?.message}
				>
					{#snippet children({ id, describedby, invalid })}
						<input
							{id}
							class="control"
							type="tel"
							inputmode="tel"
							autocomplete="tel"
							placeholder="(617) 555-0123"
							maxlength="30"
							required
							aria-describedby={describedby}
							aria-invalid={invalid}
							bind:value={form.phone}
							{...validateOn('phone')}
						/>
					{/snippet}
				</Field>

				<Field id={fieldId('country')} label="Country of residence" error={errors.country?.message}>
					{#snippet children({ id, describedby, invalid })}
						<div class="select">
							<select
								{id}
								class="control"
								autocomplete="country"
								required
								aria-describedby={describedby}
								aria-invalid={invalid}
								bind:value={form.country}
								{...validateOn('country')}
							>
								{#each countries as country (country.code)}
									<option value={country.code}>{country.name}</option>
								{/each}
							</select>
							{@render chevron()}
						</div>
					{/snippet}
				</Field>
			</div>
		</section>

		<!-- 02 School -->
		<section class="part" aria-labelledby="part-school">
			<h2 id="part-school" class="part__title">
				<span class="part__num">02</span><span class="display-m">School</span>
			</h2>
			<div class="grid">
				<Field
					id={fieldId('school')}
					class="col-span-full"
					label="School"
					help={schoolsFailed
						? 'We couldn’t load MLH’s school list. Pick “Other” and type it in.'
						: 'Pulled from MLH’s school list. Not there? Pick “Other” and type it in.'}
					error={errors.school?.message}
				>
					{#snippet children({ id, describedby, invalid })}
						<div class="select">
							<input
								{id}
								class="control"
								type="text"
								list="school-options"
								autocomplete="organization"
								placeholder="Start typing your school…"
								maxlength="200"
								required
								aria-describedby={describedby}
								aria-invalid={invalid}
								bind:value={form.school}
								onblur={() => check('school')}
								oninput={onSchoolInput}
							/>
							{@render chevron()}
						</div>
						<datalist id="school-options">
							<option value={OTHER_SCHOOL}></option>
							{#each schools as school (school)}
								<option value={school}></option>
							{/each}
						</datalist>
					{/snippet}
				</Field>

				{#if form.school === OTHER_SCHOOL}
					<Field
						id={fieldId('schoolOther')}
						class="col-span-full"
						label="Your school"
						error={errors.schoolOther?.message}
					>
						{#snippet children({ id, describedby, invalid })}
							<input
								{id}
								class="control"
								type="text"
								autocomplete="organization"
								placeholder="Full name of your school"
								maxlength="200"
								required
								aria-describedby={describedby}
								aria-invalid={invalid}
								bind:value={form.schoolOther}
								{...validateOn('schoolOther')}
							/>
						{/snippet}
					</Field>
				{/if}

				<Field
					id={fieldId('levelOfStudy')}
					class="col-span-full"
					label="Level of study"
					error={errors.levelOfStudy?.message}
				>
					{#snippet children({ id, describedby, invalid })}
						<div class="select">
							<select
								{id}
								class="control"
								class:control--empty={!form.levelOfStudy}
								required
								aria-describedby={describedby}
								aria-invalid={invalid}
								bind:value={form.levelOfStudy}
								{...validateOn('levelOfStudy')}
							>
								<option value="" disabled>Select your level of study</option>
								{#each levelsOfStudy as level (level)}
									<option value={level}>{level}</option>
								{/each}
							</select>
							{@render chevron()}
						</div>
					{/snippet}
				</Field>

				<Field id={fieldId('major')} label="Major" error={errors.major?.message}>
					{#snippet children({ id, describedby, invalid })}
						<input
							{id}
							class="control"
							type="text"
							placeholder="Computer Science"
							maxlength="200"
							required
							aria-describedby={describedby}
							aria-invalid={invalid}
							bind:value={form.major}
							{...validateOn('major')}
						/>
					{/snippet}
				</Field>

				<Field
					id={fieldId('gradYear')}
					label="Expected graduation"
					error={errors.gradYear?.message}
				>
					{#snippet children({ id, describedby, invalid })}
						<div class="select">
							<select
								{id}
								class="control"
								class:control--empty={!form.gradYear}
								required
								aria-describedby={describedby}
								aria-invalid={invalid}
								bind:value={form.gradYear}
								{...validateOn('gradYear')}
							>
								<option value="" disabled>Select year</option>
								{#each gradYears as year (year)}
									<option value={year}>{year}</option>
								{/each}
							</select>
							{@render chevron()}
						</div>
					{/snippet}
				</Field>
			</div>
		</section>

		<!-- 03 The weekend -->
		<section class="part" aria-labelledby="part-weekend">
			<h2 id="part-weekend" class="part__title">
				<span class="part__num">03</span><span class="display-m">The weekend</span>
			</h2>
			<div class="stack">
				<fieldset
					class="group"
					aria-describedby={errors.tshirtSize ? 'tshirt-error' : undefined}
					onfocusout={(event) => onGroupFocusout('tshirtSize', event)}
				>
					<legend class="group__label">T-shirt size (adult unisex)</legend>
					<div class="chips" class:chips--invalid={errors.tshirtSize}>
						{#each tshirtSizes as size, i (size)}
							<label class="chip">
								<input
									id={i === 0 ? fieldId('tshirtSize') : undefined}
									class="chip__input"
									type="radio"
									name="tshirtSize"
									value={size}
									required
									bind:group={form.tshirtSize}
									onchange={() => check('tshirtSize')}
								/>
								<span class="chip__face">{size}</span>
							</label>
						{/each}
					</div>
					{#if errors.tshirtSize}
						<p id="tshirt-error" class="error-text">{errors.tshirtSize.message}</p>
					{/if}
				</fieldset>

				<fieldset
					class="group"
					aria-describedby={errors.allergies ? 'allergies-error' : 'allergies-help'}
					onfocusout={(event) => onGroupFocusout('allergies', event)}
				>
					<legend class="group__label">Food allergies or restrictions</legend>
					<div class="chips" class:chips--invalid={errors.allergies}>
						{#each allergyOptions as option, i (option)}
							<label class="chip">
								<input
									id={i === 0 ? fieldId('allergies') : undefined}
									class="chip__input"
									type="checkbox"
									value={option}
									aria-invalid={Boolean(errors.allergies)}
									checked={form.allergies.includes(option)}
									onchange={(event) => toggleAllergy(option, event.currentTarget.checked)}
								/>
								<span class="chip__face">{option}</span>
							</label>
						{/each}
					</div>
					{#if errors.allergies}
						<p id="allergies-error" class="error-text">{errors.allergies.message}</p>
					{:else}
						<p id="allergies-help" class="help-text">Pick all that apply.</p>
					{/if}
				</fieldset>

				<Field
					id={fieldId('dietaryNotes')}
					label="Anything else we should know?"
					error={errors.dietaryNotes?.message}
				>
					{#snippet children({ id, describedby, invalid })}
						<input
							{id}
							class="control"
							type="text"
							placeholder="Other allergies or needs"
							maxlength="1000"
							required={form.allergies.includes(OTHER_ALLERGY)}
							aria-describedby={describedby}
							aria-invalid={invalid}
							bind:value={form.dietaryNotes}
							{...validateOn('dietaryNotes')}
						/>
					{/snippet}
				</Field>
			</div>
		</section>

		<!-- 04 Short answers -->
		<section class="part" aria-labelledby="part-answers">
			<h2 id="part-answers" class="part__title">
				<span class="part__num">04</span><span class="display-m">Short answers</span>
			</h2>
			<div class="stack">
				{#each shortAnswerQuestions as question (question.name)}
					{@const words = countWords(form[question.name])}
					<Field
						id={fieldId(question.name)}
						label={question.label}
						help="{MAX_WORDS} words max · {words} / {MAX_WORDS}"
						error={errors[question.name]?.message}
					>
						{#snippet children({ id, describedby, invalid })}
							<textarea
								{id}
								class="control control--area"
								rows="5"
								placeholder={question.placeholder}
								required
								aria-describedby={describedby}
								aria-invalid={invalid}
								bind:value={form[question.name]}
								onblur={() => check(question.name)}
								oninput={(event) => onAnswerInput(question.name, event.currentTarget.value)}
							></textarea>
						{/snippet}
					</Field>
				{/each}
			</div>
		</section>

		<!-- 05 Agreements -->
		<section class="part" aria-labelledby="part-agreements">
			<h2 id="part-agreements" class="part__title">
				<span class="part__num">05</span><span class="display-m">Agreements</span>
			</h2>
			<div class="stack stack--tight">
				<div class="note">
					<p class="eyebrow text-accent-green">MLH partnership</p>
					<p>
						We are currently in the process of partnering with MLH. The following 3 checkboxes are
						for this partnership. If we do not end up partnering with MLH, your information will not
						be shared.
					</p>
				</div>

				{#snippet external(href: string, text: string)}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external URL -->
					<a {href} target="_blank" rel="noopener noreferrer">{text}</a>
				{/snippet}

				{#snippet internal(href: string, text: string)}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- resolved above -->
					<a {href} target="_blank" rel="noopener">{text}</a>
				{/snippet}

				{@render checkbox('agreeMlhCodeOfConduct', true, mlhCodeOfConductText)}
				{#snippet mlhCodeOfConductText()}
					I have read and agree to the {@render external(MLH.codeOfConduct, 'MLH Code of Conduct')}.
				{/snippet}

				{@render checkbox('agreeMlhDataSharing', true, mlhDataSharingText)}
				{#snippet mlhDataSharingText()}
					I authorize you to share my application/registration information with Major League Hacking
					for event administration, ranking, and administration (including the creation of linked
					accounts on MLH and DEV (dev.to)) in line with the {@render external(
						MLH.privacyPolicy,
						'MLH Privacy Policy'
					)}. I further agree to the terms of both the {@render external(
						MLH.contestTerms,
						'MLH Contest Terms and Conditions'
					)} and the {@render external(MLH.privacyPolicy, 'MLH Privacy Policy')}.
				{/snippet}

				{@render checkbox('mlhEmails', false, mlhEmailsText)}
				{#snippet mlhEmailsText()}
					I authorize MLH + DEV to send me occasional emails about relevant events, career
					opportunities, and community announcements.
				{/snippet}

				<hr class="rule" />

				{@render checkbox('agreeHackBostonPolicies', true, policiesText)}
				{#snippet policiesText()}
					I have read and agree to the {@render internal(conductHref, 'HackBoston Code of Conduct')}
					and {@render internal(privacyHref, 'Privacy Policy')}.
				{/snippet}

				{@render checkbox('agreeWaiver', true, waiverText)}
				{#snippet waiverText()}
					I agree to the HackBoston {@render internal(
						waiverHref,
						'photo release and participant waiver'
					)}.
				{/snippet}
			</div>
		</section>

		<div class="submit">
			<Button type="submit" disabled={submitting} aria-busy={submitting}>
				{submitting ? 'Submitting…' : 'Submit application'}
			</Button>
		</div>
	</form>
</Section>

{#snippet chevron()}
	<svg class="select__chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
		<path d="M2 4.5l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" />
	</svg>
{/snippet}

{#snippet checkbox(
	field:
		| 'agreeMlhCodeOfConduct'
		| 'agreeMlhDataSharing'
		| 'mlhEmails'
		| 'agreeHackBostonPolicies'
		| 'agreeWaiver',
	isRequired: boolean,
	text: Snippet
)}
	{@const id = fieldId(field)}
	{@const error = errors[field]?.message}
	<div class="check">
		<span class="check__control">
			<input
				{id}
				class="check__box"
				type="checkbox"
				required={isRequired}
				aria-invalid={Boolean(error)}
				aria-describedby={error ? `${id}-error` : undefined}
				bind:checked={form[field]}
				onchange={() => recheck(field)}
			/>
			<span class="check__face" aria-hidden="true">
				<svg width="20" height="20" viewBox="0 0 20 20">
					<path d="M5 10.5l3.2 3.2L15 7" fill="none" stroke="currentColor" stroke-width="2" />
				</svg>
			</span>
		</span>
		<label class="check__label" for={id}>
			{@render text()}
			{#if isRequired}<span class="check__req" aria-hidden="true">*</span>{/if}
		</label>
		{#if error}
			<p id="{id}-error" class="error-text check__error">{error}</p>
		{/if}
	</div>
{/snippet}

<style>
	/* Figma Register (77:272): 280px sidebar, form column to the right. */
	:global(.register) {
		display: grid;
		gap: 48px;
	}

	@media (min-width: 1024px) {
		:global(.register) {
			grid-template-columns: 280px minmax(0, 1fr);
			column-gap: 96px;
		}
	}

	.register__aside {
		display: flex;
		flex-direction: column;
		gap: 24px;
		align-self: start;
		color: var(--text-muted);
	}

	.register__aside h2 {
		margin: 0 0 8px;
	}

	.register__aside p {
		margin: 0;
	}

	.register__aside a {
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.register__aside a:hover {
		color: var(--accent-green);
	}

	.register__form {
		display: flex;
		flex-direction: column;
		gap: 64px;
		min-width: 0;
	}

	/* Error summary (Field states, 79:621). */
	.summary {
		padding: 16px 20px;
		border: 1.5px solid var(--state-error);
		border-radius: 8px;
		background: color-mix(in srgb, var(--state-error) 8%, var(--bg-paper));
	}

	.summary:focus {
		outline: none;
	}

	.summary:focus-visible {
		outline: 2px solid var(--accent-green);
		outline-offset: 3px;
	}

	.summary__title {
		margin: 0 0 4px;
		font-family: var(--font-label);
		font-weight: 500;
		font-size: 0.875rem;
		color: var(--state-error);
	}

	.summary__text {
		margin: 0;
	}

	.summary__list {
		display: flex;
		flex-wrap: wrap;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.summary__list li:not(:last-child)::after {
		content: '·';
		margin-inline: 10px;
		color: var(--text-muted);
	}

	.summary__list a {
		color: var(--text-ink);
		text-decoration: none;
		text-underline-offset: 3px;
	}

	.summary__list a:hover {
		text-decoration: underline;
	}

	/* Numbered sections: "01 About you" over a hairline. */
	.part__title {
		display: flex;
		align-items: baseline;
		gap: 12px;
		margin: 0 0 24px;
		padding-bottom: 16px;
		border-bottom: 1px solid color-mix(in srgb, var(--text-ink) 15%, transparent);
	}

	.part__num {
		font-family: var(--font-label);
		font-weight: 500;
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.grid {
		display: grid;
		gap: 20px 24px;
	}

	@media (min-width: 640px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.stack--tight {
		gap: 16px;
	}

	/* Text inputs, selects and textareas. */
	.control {
		width: 100%;
		min-height: 48px;
		padding: 12px 16px;
		border: 1.5px solid var(--text-ink);
		border-radius: 8px;
		background: var(--bg-paper);
		color: var(--text-ink);
		font: inherit;
		font-size: 1rem;
		line-height: 1.4;
		transition:
			border-color 150ms ease,
			box-shadow 150ms ease;
	}

	.control::placeholder {
		color: var(--text-muted);
		opacity: 1;
	}

	.control:focus {
		outline: none;
	}

	.control:focus-visible,
	.control:focus {
		border-color: var(--accent-green);
		box-shadow: 0 0 0 3px var(--accent-green-tint);
	}

	.control[aria-invalid='true'] {
		border-color: var(--state-error);
	}

	.control[aria-invalid='true']:focus {
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--state-error) 18%, transparent);
	}

	.control--area {
		min-height: 132px;
		resize: vertical;
	}

	.control--empty {
		color: var(--text-muted);
	}

	.control option {
		color: var(--text-ink);
	}

	.select {
		position: relative;
	}

	.select .control {
		appearance: none;
		padding-right: 44px;
	}

	/* Hide Chrome's datalist arrow; the chevron replaces it. */
	.select input::-webkit-calendar-picker-indicator {
		opacity: 0;
	}

	.select__chevron {
		position: absolute;
		top: 50%;
		right: 16px;
		transform: translateY(-50%);
		color: var(--text-ink);
		pointer-events: none;
	}

	.help-text,
	.error-text {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.help-text {
		color: var(--text-muted);
	}

	.error-text {
		color: var(--state-error);
	}

	/* Chip groups: T-shirt size (radio) and allergies (checkbox). */
	.group {
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-width: 0;
		margin: 0;
		padding: 0;
		border: 0;
	}

	.group__label {
		margin-bottom: 8px;
		padding: 0;
		font-family: var(--font-label);
		font-weight: 500;
		font-size: 0.75rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.chip {
		position: relative;
		display: inline-flex;
	}

	.chip__input {
		position: absolute;
		inset: 0;
		margin: 0;
		opacity: 0;
		cursor: pointer;
	}

	.chip__face {
		display: inline-flex;
		align-items: center;
		min-height: 40px;
		padding: 8px 16px;
		border: 1.5px solid var(--text-ink);
		border-radius: var(--radius-pill);
		background: var(--bg-paper);
		color: var(--text-ink);
		font-family: var(--font-label);
		font-weight: 500;
		font-size: 0.8125rem;
		line-height: 1;
		transition:
			background-color 150ms ease,
			color 150ms ease,
			border-color 150ms ease;
	}

	.chip:hover .chip__face {
		background: var(--bg-paper-deep);
	}

	.chip__input:checked + .chip__face {
		border-color: var(--accent-green);
		background: var(--accent-green);
		color: var(--text-on-dark);
	}

	.chip__input:focus-visible + .chip__face {
		outline: 2px solid var(--accent-green);
		outline-offset: 3px;
	}

	.chips--invalid .chip__input:not(:checked) + .chip__face {
		border-color: var(--state-error);
	}

	/* MLH note and agreements. */
	.note {
		padding: 12px 16px;
		border-radius: 8px;
		background: var(--bg-paper-deep);
	}

	.note p {
		margin: 0;
	}

	.note .eyebrow {
		margin-bottom: 4px;
	}

	.rule {
		margin: 8px 0;
		border: 0;
		border-top: 1px solid color-mix(in srgb, var(--text-ink) 15%, transparent);
	}

	.check {
		display: grid;
		grid-template-columns: 20px minmax(0, 1fr);
		column-gap: 12px;
		row-gap: 4px;
	}

	/* The native checkbox sits invisibly on top of the drawn box, so it keeps keyboard and click. */
	.check__control {
		position: relative;
		width: 20px;
		height: 20px;
		margin-top: 2px;
	}

	.check__box {
		position: absolute;
		inset: 0;
		z-index: 1;
		margin: 0;
		opacity: 0;
		cursor: pointer;
	}

	.check__face {
		display: block;
		width: 100%;
		height: 100%;
		border: 1.5px solid var(--text-ink);
		border-radius: 4px;
		background: var(--bg-paper);
		color: transparent;
	}

	/* Fill the box edge to edge, under the 1.5px border. */
	.check__face svg {
		display: block;
		margin: -1.5px;
		width: calc(100% + 3px);
		height: calc(100% + 3px);
	}

	.check__box:checked + .check__face {
		border-color: var(--accent-green);
		background: var(--accent-green);
		color: var(--text-on-dark);
	}

	.check__box:focus-visible + .check__face {
		outline: 2px solid var(--accent-green);
		outline-offset: 3px;
	}

	.check__box[aria-invalid='true'] + .check__face {
		border-color: var(--state-error);
	}

	.check__label {
		cursor: pointer;
	}

	.check__label a {
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.check__label a:hover {
		color: var(--accent-green);
	}

	.check__req {
		margin-left: 2px;
		color: var(--accent-green);
	}

	.check__error {
		grid-column: 2;
	}

	.submit {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px 24px;
	}
</style>
