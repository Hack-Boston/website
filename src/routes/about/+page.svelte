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

</div>


<div class="flex justify-center items-center gap-8 mt-8 px-4 sm:px-6">
    <img src = "https://wit.edu/sites/default/files/styles/780w_520h/public/2021-12/i.jpeg?itok=t9jWH582" alt="Ira Allen Building" class="w-full max-w-[720px] h-auto aspect-16/10 object-cover rounded-xl shadow-lg" />
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
    <p class="text-left text-lg font-medium text-secondary max-w-4xl">
        HackWIT will unite students from Wentworth Institute of Technology, the Colleges of the Fenway consortium, and other institutions for three days of collaborative coding,
        networking, and skill development. To support newcomers, we aim to offer introductory coding workshops led by Wentworth professors.
        The event will feature hands-on coding challenges, interactive team projects, and opportunities to network with peers and industry mentors.
        Whether participants are new to coding or already experienced, HackWIT will foster an inclusive environment where students can expand their skills, connect with professionals,
        and explore career paths in technology. By bringing together these diverse perspectives, HackWIT will encourage creativity, problem-solving, and collaboration that lasts beyond the event.
    </p>
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
</style>