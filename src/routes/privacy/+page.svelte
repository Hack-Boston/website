<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';

    const sections = [
        { id: 'collect', title: 'What we collect' },
        { id: 'access', title: 'Who sees it' },
        { id: 'health', title: 'Health information' },
        { id: 'choices', title: 'Your choices' }
    ];

</script>

<svelte:head>
    <title>HackBoston - Privacy Policy</title>
    <meta
        name="description"
        content="What HackBoston collects when you pre-register or apply, who sees it, and how to see, fix, or delete your data."
    />
</svelte:head>

<!-- HEADER -->
<PageHeader
    title="Your data, plainly."
    lede="What we collect when you pre-register or apply, who sees it, and when we delete it."
/>

<!-- MAIN CONTENT -->
<div class="privacy-section">
    <Container>
        <div class="privacy-layout">

            <!-- LEFT NAVIGATION -->
            <aside class="sidebar">
                <h2 class="sidebar-heading eyebrow">On this page</h2>

                <nav aria-label="On this page">
                    {#each sections as section}
                        <a
                            class="sidebar-link label-mono"
                            href={'#' + section.id}
                        >
                            {section.title}
                        </a>
                    {/each}
                </nav>

                <div class="sidebar-contact">
                    <p>Last updated [date].</p>
                </div>
            </aside>

            <!-- RIGHT CONTENT -->
            <main class="content">

                <!-- WHAT WE COLLECT -->
                <section id="collect">
                    <h2>What we collect</h2>

                    <p>From pre-register: your name and email.</p>

                    <p>
                        From the application: name, email, phone, age,
                        school, level of study, major, graduation year,
                        country, t-shirt size, food allergies and
                        restrictions, and your short answers.
                    </p>
                </section>

                <!-- WHO SEES IT -->
                <section id="access">
                    <h2>Who sees it</h2>

                    <p>
                        The HackBoston organizing team. If you check the
                        MLH boxes, we share your application with Major
                        League Hacking under their privacy policy.
                    </p>

                    <p>
                        We never sell your data, and we don't give sponsors
                        your contact info unless you opt in.
                    </p>
                </section>

                <!-- HEALTH INFORMATION -->
                <section id="health">
                    <h2>Health information</h2>

                    <p>
                        Allergies and dietary needs are health information.
                        Only the people planning food see them, and we use
                        them only for meals.
                    </p>
                </section>

                <!-- YOUR CHOICES -->
                <section id="choices">
                    <h2>Your choices</h2>

                    <p>
                        Email
                        <a href="mailto:privacy@hackboston.dev"
                        >privacy@hackboston.dev</a>
                        to see, fix, or delete your data at any time.
                    </p>
                </section>

            </main>
        </div>
    </Container>
</div>

<style>
    /* MAIN LAYOUT */

    .privacy-section {
        background-color: var(--bg-paper);
        color: var(--text-ink);
        padding: 65px 0 100px;
    }

    .privacy-layout {
        display: grid;
        grid-template-columns: 230px minmax(0, 1fr);
        gap: 60px;
    }

    /* SIDEBAR */

    .sidebar-heading {
        color: var(--accent-green);
        margin: 0 0 20px;
    }

    .sidebar nav {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .sidebar-link {
        color: var(--text-ink);
        text-decoration: none;
        text-underline-offset: 3px;
        transition: color 0.2s ease;
    }

    .sidebar-link:hover {
        color: var(--accent-green);
        text-decoration: underline;
    }

    .sidebar-link:focus-visible {
        outline: 2px solid var(--accent-green);
        outline-offset: 3px;
    }

    .sidebar-contact {
        border-top: 1px solid var(--bg-paper-deep);
        margin-top: 25px;
        padding-top: 20px;
        color: var(--text-muted);
        font-family: var(--font-body);
        font-size: 14px;
        line-height: 1.5;
    }

    .sidebar-contact p {
        margin: 0;
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
        font-family: var(--font-body);
        font-size: 27px;
        font-weight: 400;
        line-height: 1.25;
        margin: 0 0 12px;
    }

    .content p {
        font-family: var(--font-body);
        font-size: 16px;
        line-height: 1.5;
        margin: 0 0 14px;
    }

    /* MOBILE */

    @media (max-width: 700px) {
        .privacy-section {
            padding: 40px 0 70px;
        }

        .privacy-layout {
            grid-template-columns: 1fr;
            gap: 35px;
        }

        .content h2 {
            font-size: 25px;
        }
    }
</style>