<script>
    import Container from '$lib/components/Container.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import Section from '$lib/components/Section.svelte';

    const faqs = [
        {
            question: 'What is a hackathon?',
            answer: "A hackathon is a fast-paced event — typically 24 to 72 hours — where people with different skills form teams to design and build functional prototypes such as apps, games, or websites. Unlike a regular coding session, it combines problem solving, creativity, and rapid execution around a specific challenge or theme. Participants, often including programmers, designers, and subject matter experts, form teams to brainstorm ideas, develop prototypes, and present their solutions for a chance to win prizes, and attend workshops and panels to pick up new skills. Hackathons foster creativity, innovation, and teamwork, providing a platform for learning new skills, networking, and showcasing talent."
        },
        {
            question: 'When and where is it?',
            answer: "Spring 2027 in the Boston area. We're finalizing the exact date and venue now. Got a space? Reach out to",
            email: "logistics@hackboston.dev"
        },
        {
            question: 'Who can come?',
            answer: "Students from across the Boston area, of all backgrounds and skill levels."
        },
        {
            question: 'Who runs HackBoston?',
            answer: "An independent student team from Boston. We're fiscally sponsored by Patchwork Labs Inc., a 501(c)(3) nonprofit."
        },
        {
            question: 'What is the theme?',
            answer: "This year's theme is",
            bold: "Innovation.",
            rest: "We want bold ideas from students of all backgrounds, built to tackle the challenges people face today. Bring a problem you care about and build something new around it."
        },
        {
            question: 'What will there be to eat?',
            answer: "Six main meals and two midnight snacks throughout the weekend."
        },
        {
            question: 'How can my company get involved?',
            answer: "Support HackBoston by sponsoring a tier, meal, or activity, or by contributing mentors, APIs, or hardware. Reach out to",
            email: "sponsorship@hackboston.dev"

        },
        {
            question: 'Where does sponsor money go?',
            answer: "Straight into the venue, food, swag, and anything else that makes the weekend better for hackers."
        }
    ];
</script>

<svelte:head>
    <title>HackBoston - FAQ</title>
</svelte:head>


<header class="faq-header">
    <Container>
        <h1>Everything you<br />wanted to ask.</h1>
        <p>
            Dates, venue, food, and how to get involved.
            Tap a question to expand it on the live site.
        </p>
    </Container>
</header>

<section class="faq-section">
    <Container>
        <div class="faq-layout">
            <aside class="contact">
                <p>Didn't find it?</p>
                <span>Email </span>
                <a href="mailto:team@hackboston.dev">
                    team@hackboston.dev
                </a>
            </aside>

            <div class="questions">
                {#each faqs as faq}
                    <details>
                        <summary>{faq.question}</summary>
                        <p>
                            {faq.answer}
                            {#if faq.bold}
                                <strong>{faq.bold}</strong>
                                {faq.rest}
                            {/if}
                        
                            {#if faq.email}
                                <a href={"mailto:" + faq.email}>
                                    {faq.email}
                                </a>
                            {/if}
                        </p>
                    </details>
                {/each}
            </div>

        </div>
    </Container>
</section>

<style>
    .faq-header {
        background-color: #2d493b;
        color: #f7f4eb;
        padding: 60px 0;
    }

    h1 {
        font-size: clamp(40px, 5vw, 72px);
        font-weight: 800;
        line-height: 1.05;
        letter-spacing: -2px;
        max-width: 650px;
    }

    .faq-header p {
        margin-top: 25px;
        max-width: 550px;
        font-size: 17px;
    }

    .faq-section {
        background-color: #f7f4eb;
        padding: 55px 0;
    }

    .faq-layout {
        display: grid;
        grid-template-columns: 1fr 2.4fr;
        gap: 50px;
    }

    .contact {
        color: #68786e;
    }

    .contact a {
        text-decoration: none;
        text-decoration-skip-ink: none;
        color: inherit;
    }

    .contact a:hover {
        text-decoration: underline;
    }

    .questions a {
        color: inherit;
        text-decoration: none;
    }

    .questions a:hover {
        text-decoration: underline;
        text-decoration-skip-ink: none;
    }

    .questions details {
        border-top: 2px solid #30463a;
        padding: 20px 0;
    }

    .questions details:last-child {
        border-bottom: 2px solid #30463a;
    }

    summary {
        cursor: pointer;
        font-size: 18px;
        font-weight: bold;
        color: #25382d;
        list-style: none;
        display: flex;
        justify-content: space-between;
        gap: 16px;
    }

    summary::-webkit-details-marker {
        display: none;
    }

    summary::after {
        content: '+';
        color: #426c55;
    }

    details[open] summary::after {
        content: '−';
    }

    details p {
        margin-top: 15px;
        color: #68786e;
        line-height: 1.6;
    }

    @media (max-width: 700px) {
        .faq-layout {
            grid-template-columns: 1fr;
            gap: 30px;
        }
    }
</style>
