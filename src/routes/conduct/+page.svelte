
<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import bug from '$lib/assets/bug-light.svg';

    const sections = [
        { id: 'short', title: 'The short version' },
        { id: 'covers', title: 'Who it covers' },
        { id: 'violations', title: 'If someone breaks it' },
        { id: 'report', title: 'How to report' },
        { id: 'full', title: 'Full text' }
    ];
</script>

<svelte:head>
    <title>HackBoston - Code of Conduct</title>
    <meta
        name="description"
        content="Learn about the HackBoston Code of Conduct, reporting procedures, and our commitment to a safe and welcoming event."
    />
</svelte:head>

<!-- HEADER -->
<header class="conduct-header">
    <Container>
        <div class="header-layout">
            <div class="header-text">
                <h1>Code of Conduct.</h1>
                <p>
                    HackBoston follows the MLH Code of Conduct.
                    Everyone at the event agrees to it, no exceptions.
                </p>
            </div>

            <img
                src={bug}
                alt="HackBoston mascot"
                class="mascot"
            />
        </div>
    </Container>
</header>

<!-- MAIN CONTENT -->
<div class="conduct-section">
    <Container>
        <div class="conduct-layout">

            <!-- LEFT NAVIGATION -->
            <aside class="sidebar">
                <h2 class="sidebar-heading">ON THIS PAGE</h2>

                <nav aria-label="On this page">
                    {#each sections as section}
                        <a
                            class="conduct-link sidebar-link"
                            href={'#' + section.id}
                        >
                            {section.title}
                        </a>
                    {/each}
                </nav>

                <div class="sidebar-contact">
                    <p>
                        Questions about the policy? Email
                        <a
                            class="conduct-link"
                            href="mailto:team@hackboston.dev"
                        >team@hackboston.dev</a>.
                    </p>
                </div>
            </aside>

            <!-- RIGHT CONTENT -->
            <div class="content">

                <!-- SHORT VERSION -->
                <section id="short">
                    <h2>The short version</h2>

                    <p>
                        Be respectful. Harassment and discrimination
                        aren't tolerated in any form, at the venue,
                        at event socials, or online in our Discord
                        and other channels.
                    </p>
                </section>

                <!-- WHO IT COVERS -->
                <section id="covers">
                    <h2>Who it covers</h2>

                    <p>
                        Everyone: hackers, mentors, judges, sponsors,
                        volunteers, organizers, and MLH staff.
                        It applies for the whole weekend and in
                        every space connected to the event.
                    </p>
                </section>

                <!-- VIOLATIONS -->
                <section id="violations">
                    <h2>If someone breaks it</h2>

                    <p>
                        Organizers can take appropriate action,
                        including a warning, removal from the event
                        without a refund, or a ban from future events.
                        Anyone removed loses prize eligibility.
                    </p>
                </section>

                <!-- REPORTING -->
                <section id="report">
                    <h2>How to report</h2>

                    <p>
                        Find any HackBoston organizer, or email
                        <a
                            class="conduct-link"
                            href="mailto:conduct@hackboston.dev"
                        >conduct@hackboston.dev</a>.
                        We'll keep reports as confidential as we can.
                    </p>

                    <p>
                        You can also reach MLH directly at
                        <a
                            class="conduct-link"
                            href="tel:+14092026060"
                        >+1 409 202 6060</a>
                        or
                        <a
                            class="conduct-link"
                            href="mailto:incidents@mlh.io"
                        >incidents@mlh.io</a>.
                    </p>

                    <p>
                        In an emergency, call 911 first.
                    </p>
                </section>

                <!-- FULL POLICY -->
                <section id="full">
                    <h2>Full text</h2>

                    <p>
                        Read the full MLH Code of Conduct.
                        When you register for HackBoston,
                        you agree to follow it.
                    </p>

                    <div class="buttons">
                        <a
                            class="action-button primary-button"
                            href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read the MLH Code of Conduct ↗
                        </a>

                        <a
                            class="action-button secondary-button"
                            href="mailto:conduct@hackboston.dev"
                        >
                            Report something
                        </a>
                    </div>
                </section>

            </div>
        </div>
    </Container>
</div>

<style>
    /* HEADER */

    .conduct-header {
        background-color: var(--bg-forest, #2d493b);
        color: var(--text-on-dark, #f7f4eb);
        padding: 75px 0;
    }

    .header-layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 220px;
        align-items: center;
        gap: 40px;
        width: 100%;
    }

    .header-text {
        max-width: 600px;
        min-width: 0;
    }

    h1 {
        font-family: Georgia, serif;
        font-size: clamp(40px, 5vw, 58px);
        font-weight: normal;
        line-height: 1.15;
        margin: 0 0 24px;
    }

    .conduct-header p {
        max-width: 550px;
        font-size: 17px;
        line-height: 1.6;
        margin: 0;
    }

    .mascot {
        display: block;
        width: 220px;
        max-width: 100%;
        height: auto;
        justify-self: end;
    }

    /* MAIN LAYOUT */

    .conduct-section {
        background-color: #f7f4eb;
        color: #25382d;
        padding: 65px 0 100px;
    }

    .conduct-layout {
        display: grid;
        grid-template-columns: 230px minmax(0, 1fr);
        gap: 60px;
    }

    /* SIDEBAR */

    .sidebar-heading {
        font-family: var(--font-label, monospace);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 1px;
        color: #426c55;
        margin: 0 0 20px;
    }

    .sidebar nav {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .sidebar-link {
        font-family: var(--font-label, monospace);
        font-size: 13px;
        font-weight: 600;
    }

    .sidebar-contact {
        border-top: 1px solid #d8d8cc;
        margin-top: 25px;
        padding-top: 20px;
        color: #68786e;
        font-size: 14px;
        line-height: 1.5;
    }

    .sidebar-contact p {
        margin: 0;
    }

    /* SHARED LINK STYLING */

    .conduct-link {
        color: inherit;
        text-decoration: none;
        text-underline-offset: 3px;
        text-decoration-skip-ink: none;
    }

    .conduct-link:hover {
        text-decoration: underline;
    }

    .conduct-link:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 3px;
    }

    /* CONTENT */

    .content section {
        margin-bottom: 36px;
        scroll-margin-top: 100px;
    }

    .content section:last-child {
        margin-bottom: 0;
    }

    .content h2 {
        font-family: Georgia, serif;
        font-size: 27px;
        font-weight: normal;
        line-height: 1.25;
        margin: 0 0 12px;
    }

    .content p {
        font-size: 15px;
        line-height: 1.7;
        margin: 0 0 14px;
    }

    /* BUTTONS */

    .buttons {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-top: 40px;
    }

    .action-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-label, monospace);
        font-size: 12px;
        font-weight: 500;
        text-decoration: none;
        text-underline-offset: 3px;
        padding: 14px 20px;
        border: 1px solid #25382d;
        border-radius: 30px;
    }

    .primary-button {
        background-color: #2d493b;
        color: #f7f4eb;
    }

    .secondary-button {
        background-color: transparent;
        color: #25382d;
    }

    .action-button:hover {
        text-decoration: underline;
    }

    .action-button:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 3px;
    }

    /* MOBILE */

    @media (max-width: 700px) {
        .conduct-header {
            padding: 50px 0;
        }

        .header-layout {
            grid-template-columns: 1fr;
            gap: 25px;
        }

        .mascot {
            width: 150px;
            justify-self: start;
        }

        .conduct-section {
            padding: 40px 0 70px;
        }

        .conduct-layout {
            grid-template-columns: 1fr;
            gap: 35px;
        }

        h1 {
            font-size: 42px;
        }

        .content h2 {
            font-size: 25px;
        }

        .buttons {
            gap: 10px;
        }
    }
</style>
