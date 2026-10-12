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
    <div class="flex justify-between pt-6 px-20 items-center">
        <!-- Left Side -->
        <div class="flex flex-col items-center">
            <div class="gap-4 items-center flex justify-center">
                <img src="/svg/mascot_4.svg" alt="Signature logo" class="w-[50px]"/>
                <img src="/svg/wordmark_1.svg" alt="HackBoston word logo" class="w-[180px]"/>
            </div>
            <img src="/svg/mascot_4.svg" alt="Signature logo" class="w-9 ml-20"/>
        </div>
   
        <!-- Middle side (link) -->
        <div class="text-[#1F2E26]-500 text-sm flex no-underline gap-10 text-500 pb-6">
            <a href="#" class="text-[#1F2E26]">About</a>
            <a href="#" class="text-[#3E6A53] underline">Team</a>
            <a href="#" class="text-[#1F2E26]">Sponsors</a>
            <a href="#" class="text-[#1F2E26]">FAQ</a>
        </div>


        <!-- Right Side -->
         <div class="bg-[#2E4A3B] py-4 px-6 rounded-full mb-5">
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
            <div class="flex flex-col justify-center items-center border-[#1F2E26] rounded-3xl border p-6 gap-4 h-[516px] w-[400px]">
                <img src="/images/volo.png" alt="Volo" class="w-full h-auto object-contain rounded-2xl" />

                <div class="gap-4 flex flex-col">
                    <span class="text-xl leading-[170%] tracking-[-1%] text-[#1F2E26] mt-4" style="font-family: 'Balgin Display', sans-serif;">
                        Volo Kotelyak
                    </span>
                    <span class="text-[#3E6A53] text-[12px] leading-[100%] tracking-[0%]">
                        Sponsorship + Finances Lead
                    </span>
                </div>
            </div>

            <!-- 4th Organizer -->
            <div class="flex flex-col justify-center items-center border-[#1F2E26] rounded-3xl border p-6 gap-4 h-[516px] w-[400px]">
                <img src="/images/cj.png" alt="Logan Lambert" class=" w-[352px] rounded-2xl" />

                <div class="gap-4 flex flex-col">
                    <span class="text-xl leading-[128%] tracking-[-1%] text-[#1F2E26]" style="font-family: 'Balgin Display', sans-serif;">
                        CJ Kanne
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
                        Jojo Dejesus
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

        <!-- Question -->
        <div class=" gap-2 p-10 flex justify-between items-center rounded-3xl bg-[#E3E6D9] text-black h-[141px] mx-35 mt-16">
            <div class="flex flex-col text-left">
                <span class="text-xl text-[#1F2E26] leading-[128%] tracking-[-1%] mb-3" style="font-family: 'Balgin Display', sans-serif;">
                    Want to mentor or help run the weekend?
                </span>
                <span class="text-[18px] text-[#5B6B62] leading-[150%] tracking-[0%]" style="font-family: 'Newsreader', serif;">
                    We’re always looking for mentors, judges, and extra hands. Reach out and tell us what you’re into.
                </span>
            </div>
            <div class="w-52 h-[50px] bg-[#2E4A3B] rounded-[999px] px-6 py-4 text-[14px] text-[#F5F2E9]">
                <span>team@hackboston.dev</span>
            </div>
         </div>
    </div>
    
    <!-- =====  FOOTER ===== -->
    <div class=" bg-[#2E4A3B] flex flex-col mt-70">
        <!-- Upper Info -->
        <div class="flex justify-between pt-18 pb-8 px-20 gap-24 flex-row items-start">
            <!-- left Side -->
            <div class="flex items-center gap-5">
                <img src="/svg/mascot_2.svg" alt="" class="w-20">
                <img src="/svg/wordmark_2.svg" alt="" class="w-[250px]">
            </div>
            <!-- Right Side -->
            <div class="text-[#E2EBE6] flex gap-24">
                <!-- Left-Side -->
                <div class="flex flex-col gap-3 text-left">
                    <div>
                        <span class="text-[12px]">Pages</span>
                    </div>
                    <div class="gap-12 flex">
                        <div class="flex flex-col gap-2">
                            <a href="#">Home</a>
                            <a href="#">About</a>
                            <a href="#">Team</a>
                        </div>
                        <div class="flex flex-col gap-2">
                            <a href="#">Sponsors</a>
                            <a href="#">FAQ</a>
                            <a href="#">Contact</a>
                            <a href="#">Register</a>
                        </div>
                    </div>
                </div>

                <!-- Right-Side -->
                <div class="flex flex-col gap-3 text-left">
                    <div>
                        <span class="text-[12px]">Contact</span>
                    </div>
                    <div class="gap-12 flex text-left">
                        <div class="flex flex-col gap-2">
                            <div class="flex gap-24 items-center justify-left">
                                 <span class="text-[12px] text-[#E2EBE6] opacity-60">General</span>
                                <a href="#">team@hackboston.dev</a>
                            </div>
                             <div class="flex gap-22 items-center justify-left">
                                 <span class="text-[12px] text-[#E2EBE6] opacity-60">Sponsors</span>
                                <a href="#">sponsorship@hackboston.dev</a>
                            </div>
                             <div class="flex gap-6 items-center justify-left">
                                 <span class="text-[12px] text-[#E2EBE6] opacity-60">Venue + logistics</span>
                                <a href="#">logistics@hackboston.dev</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Horizontal Line -->
        <hr class="border-0 border-t-2 border-[#3E6A53] mx-20" />

        <!-- Lower Info -->
         <div class="flex justify-between pt-7 pb-8 px-20">
            <p style="font-family: 'Newsreader', serif;" class="text-[#E2EBE6] font-normal leading-[150%] tracking-[0%]">
                Fiscally sponsored by Patchwork Labs Inc., a 501(c)(3) nonprofit. EIN 39-3310316.
            </p>
            <p style="font-family: 'Newsreader', serif;" class="text-[#E2EBE6] font-normal leading-[150%] tracking-[0%]">
                &copy; 2026 HackBoston
            </p>
         </div>
        
    </div>

</div>

