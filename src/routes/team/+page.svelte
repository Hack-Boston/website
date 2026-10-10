<style>
    /* JetBrains Mono */
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap');
   
    /* Newsreader */
    @import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400&display=swap');


    /* Balgin Display */
    @font-face {
        font-family: 'Balgin Display';
        src: url('/fonts/BALGIN%20-%20Studio%20Sun/DISPLAY/BalginDisplay-SemiBold.otf') format('opentype');
        font-weight: 600;
        font-style: normal;
    }
</style>


<svelte:head>
    <title>HackBoston - Team</title>
</svelte:head>


<div class="bg-white " style="font-family: 'JetBrains Mono', monospace; ">


    <!-- ===== NAVIGATION BAR ===== -->
    <div class="flex justify-between py-6 px-20 items-center h-[100px] ">
        <!-- Left Side -->
        <div class="flex flex-col items-center">
            <div class="gap-4 items-center flex justify-center">
                <img src="/svg/mascot_4.svg" alt="Signature logo" class="w-[52px] h-[52px]"/>
                <img src="/svg/wordmark_1.svg" alt="HackBoston word logo" class="w-[170px] h-[18.48px]"/>
            </div>
            <img src="/svg/mascot_4.svg" alt="Signature logo" class="w-10 h-10"/>
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
    <div class="flex h-[356px] justify-between bg-[#2E4A3B] px-20 py-12 items-center">
        <!-- Left Side: Info and description -->
        <div class="flex w-[820px] flex-col gap-6">
            <h1
                class="text-[#F5F2E9] text-[64px] leading-[104%] tracking-[-3%] font-semibold"
                style="font-family: 'Balgin Display', sans-serif;"
            >
                Meet the team.
            </h1>

            <p
                class="text-[#F5F2E9] text-[20px] leading-[150%] w-[640px] h-[60px]"
                style="font-family: 'Newsreader', serif;"
            >
                HackBoston is organized by an independent student team from the
                Boston area. Say hi, we don’t bite.
            </p>
        </div>

        <!-- Right Side: Logo -->
        <div>
            <img
                class="w-[260px] h=[260px]"
                src="/svg/mascot_2.svg"
                alt="Signature logo (in white)"
            />
        </div>
    </div>

    <!-- =====  ORGANIZER ===== -->
    <div class="h-[1243px] pt-6 pb-16 px-20 mb-20 items-center justify-center text-center gap-6">
        <h2 class="text-[#3E6A53] text-[14px] mt-4 " style="">TEAM LEADS</h2>

        <!-- Main organizers -->
        <div class="grid grid-cols-3 justify-items-center justify-self-center gap-6 mt-8 px-30 w-full">

            <!-- 1st Organizer -->
            <div class="grid grid-cols-1 justify-items-center border-[#1F2E26] rounded-3xl border p-6 gap-4 h-[516px] w-[400px]">
                <img src="/images/logan.jpg" alt="Logan Lambert" class="h-[352px] w-[352px] rounded-2xl" />

                <div class="gap-4 flex flex-col">
                    <span class="text-xl leading-[128%] tracking-[-1%] text-[#1F2E26]" style="font-family: 'Balgin Display', sans-serif;">
                        Logan Lambert
                    </span>
                    <span class="text-[#3E6A53] text-[12px] leading-[100%] tracking-[0%]">
                        Co-director · Tech Lead
                    </span>
                    <span class="text-[#5B6B62] text-[16px]" style="font-family: 'Newsreader', serif;">
                        logan@hackboston.dev
                    </span>
                </div>
            </div>

            <!-- 2nd Organizer -->
            <div class="flex flex-col justify-center items-center border-[#1F2E26] rounded-3xl border p-6 gap-4 h-[516px] w-[400px]">
                <img src="/images/jasper.jpg" alt="Jasper Mayone" class="h-[352px] w-[352px] rounded-2xl" />

                <div class="gap-4 flex flex-col">
                    <span class="text-xl leading-[128%] tracking-[-1%] text-[#1F2E26]" style="font-family: 'Balgin Display', sans-serif;">
                        Jasper Mayone
                    </span>
                    <span class="text-[#3E6A53] text-[12px] leading-[100%] tracking-[0%]">
                        Co-director · Ops Lead
                    </span>
                    <span class="text-[#5B6B62] text-[16px]" style="font-family: 'Newsreader', serif;">
                        jasper@hackboston.dev
                    </span>
                </div>
            </div>

            <!-- 3rd Organizer -->
            <div class="flex flex-col justify-center items-center border-[#1F2E26] rounded-3xl border p-6 gap-4 h-[476px] w-[400px]">
                <img src="/images/volo.png" alt="Volo" class="h-[476px] w-[400px] rounded-2xl" />

                <div class="gap-4 flex flex-col">
                    <span class="text-xl leading-[128%] tracking-[-1%] text-[#1F2E26]" style="font-family: 'Balgin Display', sans-serif;">
                        Volo
                    </span>
                    <span class="text-[#3E6A53] text-[12px] leading-[100%] tracking-[0%]">
                        Sponsorship + Finances Lead
                    </span>
                </div>
            </div>

            <!-- 4th Organizer -->
            <div class="flex flex-col justify-center items-center border-[#1F2E26] rounded-3xl border p-6 gap-4 h-[516px] w-[400px]">
                <img src="/images/cj.png" alt="Logan Lambert" class="h-[352px] w-[352px] rounded-2xl" />

                <div class="gap-4 flex flex-col">
                    <span class="text-xl leading-[128%] tracking-[-1%] text-[#1F2E26]" style="font-family: 'Balgin Display', sans-serif;">
                        CJ
                    </span>
                    <span class="text-[#3E6A53] text-[12px] leading-[100%] tracking-[0%]" >
                        CoVenue + Logistics Lead
                    </span>
                </div>
            </div>

            <!-- 5th Organizer -->
            <div class="flex flex-col justify-center items-center border-[#1F2E26] rounded-3xl border p-6 gap-4 h-[516px] w-[400px]">
                <img src="/images/jojo.jpg" alt="Logan Lambert" class="h-[352px] w-[352px] rounded-2xl" />

                <div class="gap-4 flex flex-col">
                    <span class="text-xl leading-[128%] tracking-[-1%] text-[#1F2E26]" style="font-family: 'Balgin Display', sans-serif;">
                        Jojo
                    </span>
                    <span class="text-[#3E6A53] text-[12px] leading-[100%] tracking-[0%]">
                        Design + Socials Lead
                    </span>
                </div>
            </div>

            <!-- 6th Organizer -->
            <div class="flex flex-col justify-center items-center border-[#1F2E26] rounded-3xl border p-6 gap-4 h-[516px] w-[400px]">
                <img src="/images/daniel.jpg" alt="Logan Lambert" class="h-[352px] w-[352px] rounded-2xl" />

                <div class="gap-4 flex flex-col">
                    <span class="text-xl leading-[128%] tracking-[-1%] text-[#1F2E26]" style="font-family: 'Balgin Display', sans-serif;">
                        Daniel Miretsky
                    </span>
                    <span class="text-[#3E6A53] text-[12px] leading-[100%] tracking-[0%]">
                        Judging Lead
                    </span>
                </div>
            </div>
            
        </div>

        <!-- Other Organizer -->
        <div>
            <h2 class="text-[#3E6A53] text-[14px] mt-12" >ALSO ON THE TEAM</h2>
            <div class="flex flex-wrap items-center text-[#5B6B62] text-[18px] mt-2 leading-6 justify-center font-normal" style="font-family: 'Newsreader', serif;">
                <span>Thang Pham</span>
                <span class="mx-5">·</span>
                <span>Organizer Name</span>
                <span class="mx-5">·</span>
                <span>Organizer Name</span>
                <span class="mx-5">·</span>
                <span>Organizer Name</span>
                <span class="mx-5">·</span>
                <span>Organizer Name</span>
                <span class="mx-5">·</span>
                <span>Organizer Name</span>
            </div>
        </div>
    </div>
    
    <!-- =====  FOOTER ===== -->
    <div class="h-[285px] bg-[#2E4A3B] flex flex-col">
        <!-- Upper Info -->
        <div>
            
        </div>

        <!-- Horizontal Line -->
        <hr class="border-0 border-t-2 border-[#3E6A53] mx-20" />

        <!-- Lower Info -->
         <div class="flex justify-between pt-12 pb-8 px-20">
            <p style="font-family: 'Newsreader', serif;" class="text-[#E2EBE6] font-normal leading-[150%] tracking-[0%]">
                Fiscally sponsored by Patchwork Labs Inc., a 501(c)(3) nonprofit. EIN 39-3310316.
            </p>
            <p style="font-family: 'Newsreader', serif;" class="text-[#E2EBE6] font-normal leading-[150%] tracking-[0%]">
                &copy; 2026 HackBoston
            </p>
         </div>
        
    </div>

</div>

