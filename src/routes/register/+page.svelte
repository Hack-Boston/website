<script lang="ts">
	import { onMount } from "svelte";
	import { SvelteSet } from 'svelte/reactivity';
	import { type RegistrationForm, validateRegistration } from '$lib/registration.ts';

	const SCHOOLS_CSV_URL =
		"https://raw.githubusercontent.com/MLH/mlh-policies/main/schools.csv";

	let form = $state<RegistrationForm>({
		firstName: "",
		lastName: "",

		school: "",

		major: "",
		gradYear: "",

		email: "",
		dob: "",

		allergies: [],
		allergiesOther: "",

		tshirtSize: "",

		projectIdea: ""
	});

	let otherSelected: boolean = $state(false);
	let otherSchoolName: string = $state("");
	let schools: string[] = $state([]);
	let schoolsLoading = $state(true);
	let schoolsError: string | null = $state(null);

	const commonAllergies = [
		"Peanuts",
		"Tree nuts",
		"Dairy",
		"Eggs",
		"Gluten / Wheat",
		"Shellfish",
		"Soy",
		"Sesame"
	];

	const tshirtSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];


	const currentYear = new Date().getFullYear();
	const gradYears = Array.from({ length: 9 }, (_, i) => String(currentYear + i));

	const MAX_WORDS = 250;
	let projectWordCount = $state(0);
	let projectTooLong = $state(false);

	$effect(() => {
		projectWordCount = countWords(form.projectIdea);
		projectTooLong = projectWordCount > MAX_WORDS;

		console.log(`Project idea word count: ${projectWordCount}`);
	});

	function countWords(text: string) {
		return text
			.trim()
			.split(/\s+/)
			.filter(Boolean).length;
	}

	function toggleAllergy(name: string) {
		const set = new SvelteSet(form.allergies);
		if (set.has(name)) set.delete(name);
		else set.add(name);
		form.allergies = Array.from(set);
	}

	async function loadSchools() {
		schoolsLoading = true;
		schoolsError = null;

		try {
			const res = await fetch(SCHOOLS_CSV_URL);
			if (!res.ok) throw new Error(`Failed to fetch schools.csv (${res.status})`);
			const csv = await res.text();

			const lines = csv.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

			const parsed = lines
				.map((line) => {
					if (line.startsWith('"')) {
						const endQuote = line.indexOf('",');
						return endQuote > 0 ? line.slice(1, endQuote) : line.replace(/^"|"$/g, "");
					}
					return line.split(",")[0];
				})
				.map((s) => s.trim())
				.filter(Boolean);

			const cleaned =
				parsed.length && parsed[0].toLowerCase().includes("school")
					? parsed.slice(1)
					: parsed;
			schools = Array.from(new Set(cleaned)).sort((a, b) => a.localeCompare(b));
		} catch (e: any) {
			schoolsError = e?.message ?? "Unknown error loading schools.";
			schools = [];
		} finally {
			schoolsLoading = false;
			console.log("Finished loading schools.");
		}
	}

	onMount(loadSchools);

	async function handleSubmit() {
		if (projectTooLong) return;
		if (otherSelected) form.school = otherSchoolName;

		const result = validateRegistration(form);

		if (!result.ok) {
			alert(
				"There are some errors with your submission:\n\n" +
				Object.values(result.errors).join("\n")
			);
			return;
		}

		const res = await fetch("/api/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form)
		});

		const data = await res.json().catch(() => null);

		if (!res.ok) {
			console.error("Server validation failed:", data);
			alert("Submit failed. Check console for validation errors.");
			return;
		}

		alert(`Submitted! id = ${data.id}`);
	}



	const images = [
		{
			image: { src: "/images/hack-identity.png", alt: "blabla1" }
		},
		{
			image: { src: "/images/hack-school.png", alt: "blabla2" }
		},
		{
			image: { src: "/images/hack-food.png", alt: "blabla3" }
		}
	];

	$effect(() => {
		if (form.school === "__OTHER__") {
			otherSelected = true;
		}else if (schools.includes(form.school)) {
			otherSelected = false;
		}
	});
</script>

<svelte:head>
	<title>Registration Form</title>
</svelte:head>

<main class="container">
	<header class="hero">
		<h1>Registration Form</h1>
	</header>

	<form onsubmit={handleSubmit}>
		<section class="section">
			<section class="zig" data-reverse={false}>
				<div class="zig__content card">
					<div class="grid">
						<label>
							First name *
							<input required autocomplete="given-name" bind:value={form.firstName} />
						</label>

						<label>
							Last name *
							<input required autocomplete="family-name" bind:value={form.lastName} />
						</label>

						<label class="full">
							Email *
							<input
								required
								type="email"
								autocomplete="email"
								inputmode="email"
								bind:value={form.email}
							/>
						</label>

						<label>
							Date of birth *
							<input required type="date" bind:value={form.dob} />
						</label>
					</div>
				</div>

				<div class="zig__media">
					<img src={images[0].image.src} alt={images[0].image.alt} />
				</div>
			</section>

			<section class="zig zig--reverse">
				<div class="zig__media">
					<img src={images[1].image.src} alt={images[1].image.alt} />
				</div>

				<div class="zig__content card">
					{#if schoolsError}
						<p class="error">
							Couldn’t load schools list: {schoolsError}<br />
							You can still select “Other”.
						</p>
					{/if}

					<div class="grid">
						<label class="full">
							School *
							<select required bind:value={form.school}>
								<option value="" disabled selected>Select your school</option>

								{#each schools as s}
									<option value={s}>{s}</option>
								{/each}

								<option value="__OTHER__">Other</option>
							</select>
						</label>

						{#if otherSelected }
							<label class="full">
								Please type your school *
								<input required bind:value={otherSchoolName}/>
							</label>
						{/if}

						<label class="full">
							Major *
							<input required bind:value={form.major}/>
						</label>

						<label>
							Expected graduation year *
							<select required bind:value={form.gradYear}>
								<option value="" disabled selected>Select year</option>
								{#each gradYears as y}
									<option value={y}>{y}</option>
								{/each}
							</select>
						</label>
					</div>
				</div>
			</section>

			<section class="zig">
				<div class="zig__content card">
					<fieldset class="fieldset">
						<legend>Food allergies (select all that apply)</legend>

						<div class="checks">
							{#each commonAllergies as a}
								<label class="check">
									<input
										type="checkbox"
										checked={form.allergies.includes(a)}
										onchange={() => toggleAllergy(a)}
									/>
									<span>{a}</span>
								</label>
							{/each}
						</div>

						<label class="full">
							Other / more info
							<input
								bind:value={form.allergiesOther}
								placeholder="Anything else we should know?"
							/>
						</label>
					</fieldset>

					<label class="full">
						T-shirt size (adult) *
						<select required bind:value={form.tshirtSize}>
							<option value="" disabled selected>Select size</option>
							{#each tshirtSizes as size}
								<option value={size}>{size}</option>
							{/each}
						</select>
					</label>
				</div>

				<div class="zig__media">
					<img src={images[2].image.src} alt={images[2].image.alt} />
				</div>
			</section>
		</section>


		<section class="section">
			<section class="card">
				<label class="full">
					Describe a potential project idea you might work on during the hackathon. (250 words max) *
					<textarea
						required
						rows="8"
						bind:value={form.projectIdea}
						aria-invalid={projectTooLong}
						placeholder="What would you build and why?"
					></textarea>
				</label>

				<div class="row">
          <span class:warn={projectTooLong}>
            {projectWordCount}/{MAX_WORDS} words
          </span>
					{#if projectTooLong}
						<span class="error">Please shorten this to {MAX_WORDS} words or fewer.</span>
					{/if}
				</div>
			</section>
		</section>

		<div class="actions">
			<button type="submit" disabled={projectTooLong}>Submit</button>
		</div>
	</form>
</main>

<style>

    .container {
        width: 100%;
        margin: 2rem auto;
        padding: 0 1rem 3rem;
        font-family: var(--m3-font, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif);
        color: var(--color-on-background);
    }

    .hero {
        text-align: center;
        margin-bottom: 1rem;
    }

    .hero h1 {
        font-size: clamp(2.5rem, 5vw, 3.75rem);
        font-weight: 600;
    }

    .error {
        color: var(--color-error);
    }

    form {
        display: grid;
        gap: 3.5rem;
    }

    .section {
        display: grid;
        gap: 1rem;
    }

		.card {
        border: 1px solid var(--color-outline-variant);
        border-radius: 16px;
        padding: 1.75rem;
				background: var(--color-surface-container);
        color: var(--color-on-surface);
        box-shadow: 0 1px 0 color-mix(in srgb, var(--color-shadow) 25%, transparent);
    }

    label {
        display: grid;
        gap: 0.55rem;
        color: var(--color-on-surface);
    }

    input,
    select,
    textarea,
    button {
        font: inherit;
        border-radius: 12px;
    }

    input,
    select,
    textarea {
        box-sizing: border-box;

        padding: 0.95rem 1rem;

        background-color: var(--color-surface-container-highest);
        color: var(--color-on-surface);

        border: 1px solid var(--color-outline);
        outline: none;

        transition:
                background-color 0.15s ease,
                border-color 0.15s ease,
                box-shadow 0.15s ease;
    }

    textarea {
        line-height: 1.6;
    }

    select,
    textarea{
        width: 100%;
    }

    input::placeholder,
    textarea::placeholder {
        color: color-mix(in srgb, var(--color-on-surface-variant) 70%, transparent);
    }

    input:hover,
    select:hover,
    textarea:hover {
        border-color: color-mix(in srgb, var(--color-outline) 65%, var(--color-on-surface) 35%);
        background-color: var(--color-surface-container-high);
    }

    input:focus,
    select:focus,
    textarea:focus {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 30%, transparent);
        background-color: var(--color-surface-container-highest);
    }

    input:invalid:not(:placeholder-shown),
    select:invalid,
    textarea:invalid:not(:placeholder-shown) {
        border-color: var(--color-error);
    }

    input:disabled,
    select:disabled,
    textarea:disabled {
        background-color: var(--color-surface-container);
        border-color: var(--color-outline-variant);
        color: color-mix(in srgb, var(--color-on-surface) 55%, transparent);
        cursor: not-allowed;
    }


    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 1000px var(--color-surface-container-highest) inset;
        -webkit-text-fill-color: var(--color-on-surface);
        caret-color: var(--color-on-surface);
    }

    .grid {
        display: grid;
        gap: 0.9rem;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .full {
        grid-column: 1 / -1;
    }

    .zig {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 1.5rem;
        align-items: stretch;
        margin-block: 1.5rem;
    }

    .zig--reverse {
        grid-template-columns: 0.8fr 1.2fr;
    }

    .zig__content {
        height: 100%;
    }

    .zig__media {
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid var(--color-outline-variant);
        background: var(--color-surface-container);
        min-height: 260px;
    }

    .zig__media img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

		.fieldset {
        border: 1px dashed var(--color-outline);
        border-radius: 16px;
        padding: 0.9rem;
        margin: 0 0 0.9rem;
        background: color-mix(in srgb, var(--color-surface-container-low) 85%, transparent);
    }

    legend {
        padding: 0 0.4rem;
        color: var(--color-on-surface-variant);
    }

    .checks {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.5rem 1rem;
        margin: 0.5rem 0 0.75rem;
    }

    .check {
        display: flex;
        align-items: center;
        gap: 0.55rem;
        color: var(--color-on-surface);
    }

    .row {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
        margin-top: 0.5rem;
    }

    .warn {
        font-weight: 650;
        color: var(--color-on-surface-variant);
    }

    .actions {
        display: flex;
        justify-content: flex-end;
    }

    button {
        cursor: pointer;
        padding: 0.85rem 1.1rem;

        background: var(--color-primary);
        color: var(--color-on-primary);
        border: 1px solid color-mix(in srgb, var(--color-primary) 65%, var(--color-outline) 35%);

        transition:
                transform 0.08s ease,
                background-color 0.15s ease,
                box-shadow 0.15s ease,
                border-color 0.15s ease;
    }

    button:hover {
        background: color-mix(in srgb, var(--color-primary) 92%, var(--color-on-primary) 8%);
        box-shadow: 0 8px 20px color-mix(in srgb, var(--color-shadow) 20%, transparent);
    }

    button:active {
        transform: translateY(1px);
    }

    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background: var(--color-surface-container-high);
        color: color-mix(in srgb, var(--color-on-surface) 55%, transparent);
        border-color: var(--color-outline-variant);
        box-shadow: none;
    }

		@media (max-width: 900px) {
        .zig,
        .zig--reverse {
            grid-template-columns: 1fr;
        }
        .zig__media {
            display: none;
        }
    }

    @media (max-width: 640px) {
        .grid {
            grid-template-columns: 1fr;
        }
        .checks {
            grid-template-columns: 1fr;
        }
    }
</style>