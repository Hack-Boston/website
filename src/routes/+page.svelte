<script lang="ts">
    import { Button } from "m3-svelte";
</script>

<style>
    /* JetBrains Mono */
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap');
    
    /* Newsreader */
    @import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400&display=swap');

    /* Balgin Display */
    @font-face {
        font-family: 'BalginDisplay';
        src: url('/static/Font_family/DISPLAY/BalginDisplay-SemiBold.otf') format('otf');
    }
</style>

<svelte:head>
	<title>HackBoston - Team</title>
</svelte:head>

<div class="bg-white" style="font-family: 'JetBrains Mono', monospace;">

    <!-- ===== NAVIGATION BAR ===== -->
	<div class="flex justify-between py-6 px-20 items-center">
		<!-- Left Side -->
		<div class="flex gap-4 items-center">
            <img src="/svg/mascot_4.svg" alt="Signature logo" class="w-[52px] h-[52px]"/>
            <div class="gap-4 items-center flex flex-col justify-center">
                <img src="/svg/wordmark_1.svg" alt="HackBoston word logo" class="w-[170px] h-[18.48px]"/>
                <img src="/svg/mascot_4.svg" alt="Signature logo" class="w-10 h-10"/>
            </div>
		</div>
	
		<!-- Middle side (link) -->
		<div class="text-[#1F2E26]-500 text-sm flex no-underline gap-10 text-500">
			<a href="#" class="text-[#1F2E26]">About</a>
			<a href="#" class="text-[#3E6A53] underline">Team</a>
			<a href="#" class="text-[#1F2E26]">Sponsors</a>
			<a href="#" class="text-[#1F2E26]">FAQ</a>
		</div>

        <!-- Right Side -->
         <div class="bg-[#2E4A3B] py-4 px-6 rounded-full">
            <p class="text-[#F5F2E9] text-500 text-sm ">Get notified</p>
         </div>
	</div>

    <!-- =====  BANNER  ===== -->
    <div class="h-[356px] bg-[#2E4A3B] flex justify-between py-12 px-20">
        <!-- Left Side: Info and description -->
        <div class="gap-6 w-[820px] h-[151px]">
            <div class="font-['BalginDisplay'] text-[64px] leading-[104%] tracking-[-3%]">
                Meet the team.
            </div>
            <div class="font-['Newsreader'] font-normal text-[20px] leading-[150%] tracking-[0%]">
                HackBoston is organized by an independent student team from the <br>Boston area. Say hi, we don’t bite.
            </div>
        </div>
        <!-- Right Side: Logo -->
        <img src="/svg/mascot_2.svg" alt="Signature logo (in white)">
    </div>

</div>