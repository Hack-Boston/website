<script lang="ts">
    import { Button } from "m3-svelte";
</script>

<svelte:head>
	<title>HackWIT - About</title>
</svelte:head>

<div class="flex flex-row justify-center items-center mt-12 md:mt-24 px-4 text-center sm:text-left">
    <h1 class="roboto-flex-wit-main text-4xl sm:text-6xl md:text-7xl leading-tight">About</h1>
</div>

<div class="flex flex-wrap justify-center items-center mt-4 peak gap-3 sm:gap-4 px-4">
    <h1 class="russo-one-regular text-3xl sm:text-3xl md:text-4xl leading-tight"><b><u>Theme:</u> Innovation</b></h1>
</div>

<div class="flex justify-center items-center mt-6 px-4 sm:px-6">
    <hr class="w-full max-w-5xl border-t-[1px] border-gray-300 dark:border-gray-1000 my-6" />
</div>

<div class="flex justify-center items-center gap-8 mt-8 px-4 sm:px-6">
    <img src="https://wit.edu/sites/default/files/styles/780w_520h/public/2021-12/i.jpeg?itok=t9jWH582" alt="Ira Allen Building" class="w-full max-w-[400px] h-auto aspect-16/10 object-cover rounded-xl shadow-lg" />
    <p class="text-left text-lg font-medium text-secondary">
        <u>Event Details:</u>
        <br>
        3 Day Event
        <br>
        March 13th ~ 15th, 2026
        <br>
        Friday Evening ~ Sunday Afternoon
        <br>
        Location: Ira Allen Building + CEIS as breakout spaces
    </p>
</div>

<div class="flex justify-center items-center mt-12 px-4 sm:px-6">
    <hr class="w-full max-w-5xl border-t-[1px] border-gray-300 dark:border-gray-1000 my-6" />
</div>

<div class="flex flex-col justify-center items-center mt-4 peak gap-3 sm:gap-4 px-4">
    <h1 class="russo-one-regular text-3xl sm:text-3xl md:text-4xl leading-tight"><u><b>What is a hackathon?</b></u></h1>
</div>

<div class="flex flex-col items-center gap-6 mt-6 px-4 sm:px-6">
    <p class="text-left text-lg font-medium text-secondary max-w-4xl sm:w-2/3">
        A hackathon is a fast-paced event — typically 24 to 72 hours — where people with different skills form teams to design and build functional prototypes
        such as apps, games, or websites. Unlike a regular coding session, it combines problem‑solving, creativity, and rapid execution around a specific challenge or theme.
        Participants, often including programmers, designers, and subject matter experts, form teams to brainstorm ideas, develop prototypes, and present their solutions
        for a chance to win prizes, and attend workshops and panels to pick up new skills. Hackathons foster creativity, innovation, and teamwork, providing a platform for learning new skills, networking, and showcasing talent.
    </p>
</div>

<div class="flex flex-wrap justify-center items-center mt-12 peak gap-3 sm:gap-4 px-4">
    <img src="src/lib/assets/stock-photo/hack club assemble/Hack_Club_Assemble_LTNJ_00104.JPG" alt="Hack Club Assemble" class="w-full max-w-[400px] h-auto aspect-16/10 object-cover rounded-xl shadow-lg" />
    <img src="src/lib/assets/stock-photo/hack club assemble/Hack_Club_Assemble_LTNJ_00517.JPG" alt="Hack Club Assemble" class="w-full max-w-[400px] h-auto aspect-16/10 object-cover rounded-xl shadow-lg" />
</div>

<div class="flex justify-center items-center mt-12 px-4 sm:px-6">
    <img src="src/lib/assets/stock-photo/hack club summit/_BMT5361.jpg" alt="Hack Club Summit" class="w-full max-w-[400px] h-auto aspect-16/10 object-cover rounded-xl shadow-lg" />
</div>

<div class="flex justify-center items-center mt-12 px-4 sm:px-6">
    <hr class="w-full max-w-5xl border-t-[1px] border-gray-300 dark:border-gray-1000 my-6" />
</div>

<div class="flex flex-col justify-center items-center mt-4 peak gap-3 sm:gap-4 px-4">
    <h1 class="russo-one-regular text-3xl sm:text-3xl md:text-4xl leading-tight"><u><b>What is HackWIT?</b></u></h1>
</div>

<div class="flex flex-col items-center gap-6 mt-6 px-4 sm:px-6">
    <p class="text-left text-lg font-medium text-secondary max-w-4xl sm:w-2/3">
        HackWIT will unite students from Wentworth Institute of Technology, the <a href="https://www.colleges-fenway.org/about/" target="_blank"><u>Colleges of the Fenway consortium</u></a>,
        and other institutions for three days of collaborative coding, networking, and skill development. To support newcomers, we aim to offer introductory coding workshops led by Wentworth
        professors. The event will feature hands-on coding challenges, interactive team projects, and opportunities to network with peers and industry mentors.
        Whether participants are new to coding or already experienced, HackWIT will foster an inclusive environment where students can expand their skills, connect with professionals,
        and explore career paths in technology. By bringing together these diverse perspectives, HackWIT will encourage creativity, problem-solving, and collaboration that lasts
        beyond the event.
    </p>
</div>

<div class="flex justify-center items-center mt-12 px-4 sm:px-6">
    <hr class="w-full max-w-5xl border-t-[1px] border-gray-300 dark:border-gray-1000 my-6" />
</div>

<div class="flex flex-col justify-center items-center mt-4 peak gap-3 sm:gap-4 px-4">
    <h1 class="russo-one-regular text-3xl sm:text-3xl md:text-4xl leading-tight"><u><b>Who can participate in HackWIT?</b></u></h1>
</div>

<div class="flex flex-col items-center gap-6 mt-6 px-4 sm:px-6">
    <p class="text-left text-lg font-medium text-secondary max-w-4xl sm:w-2/3">
        Any college student is eligible to participate. You don't need to be a tech expert or an experienced programmer.
        Our event will have experienced mentors to guide you, answer questions, and help you find the right direction when you're stuck.
    </p>
</div>

<div class="flex justify-center items-center mt-12 px-4 sm:px-6">

</div>

<style>
    .roboto-flex-wit-main {
        font-family: "Roboto Flex", sans-serif;
        color: var(--color-primary);
        font-optical-sizing: 144;
        font-weight: 900;
        font-style: normal;
        font-variation-settings:
            "slnt" 0,
            "wdth" 129,
            "GRAD" 0,
            "XOPQ" 140,
            "XTRA" 468,
            "YOPQ" 51,
            "YTAS" 750,
            "YTDE" -203,
            "YTFI" 738,
            "YTLC" 514,
            "YTUC" 712;
    }

    .russo-one-regular {
        font-family: "Russo One", sans-serif;
        font-weight: 400;
        font-style: normal;
    }
</style>