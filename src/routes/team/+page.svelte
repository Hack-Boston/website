<script lang="ts">
    import { Button } from "m3-svelte";
</script>

<svelte:head>
	<title>HackWIT - Contact</title>
</svelte:head>

<!-- Header -->
<div class="flex flex-row justify-center items-center mt-12 md:mt-24 px-4 text-center sm:text-left">
    <b><h1 class="roboto-flex-wit-main text-4xl sm:text-6xl md:text-7xl leading-tight s-PalH6l0zoH1z " style="color:rgba(41, 106, 72, 1)">Contact</h1></b>
</div>

<!-- Divider -->
<div class="flex justify-center items-center mt-6 px-4 sm:px-6">
    <hr class="w-full max-w-5xl border-t-[1px] border-gray-300 dark:border-gray-1000 my-6" />
</div>
 
<!-- Members Section -->
<div class="flex justify-center px-4 mt-10">
	<div class="w-full space-y-6">

		<!-- Grid -->
			<!-- 1st -->
			<div class = "grid grid-cols-1 sm:grid-cols-2 gap-2 place-items-center justify-rounded-md">
				<!-- Member 1 -->
				<div class="transform-gpu origin-center transition-transform duration-300 hover:[transform:rotateX(10deg)_rotateY(-10deg)] shadow-xl/30 flex items-center gap-4 bg-[#f4f8f4] border border-[#d6e4dc] rounded-xl p-5 w-full max-w-2xl">
					<div class="shadow-xl/50 w-40 h-40 rounded-full border-2 border-[rgba(0,0,0,1)] overflow-hidden">
						<img src="/img/jasper.jpg" alt="" class="w-full h-full object-cover" /> 
					</div>

					<div>
						<h3 class="text-2xl font-semibold text-[rgba(41,106,72,1)] text-shadow-md">
							Jasper Mayone
						</h3>
        	            <h5 class="text-lg font-semibold text-[rgba(41,106,72,1)]">
        	                · Event Director, Sponsorship Director
            	        </h5>
					
					</div>
				</div>

				<!-- Member 2 -->
				<div class="transform-gpu origin-center transition-transform duration-300 hover:[transform:rotateX(10deg)_rotateY(-10deg)]  shadow-xl/30 flex items-center gap-4 bg-[#f4f8f4] border border-[#d6e4dc] rounded-xl p-5 w-full max-w-2xl">
					<div class="shadow-xl/50 w-40 h-40 rounded-full border-2 border-[rgba(0,0,0,1)] overflow-hidden">
						<img src="/img/logan.jpg" alt="Sosa" class="w-full h-full object-cover" />
					</div>

					<div>
						<h3 class="text-2xl font-semibold text-[rgba(41,106,72,1)] text-shadow-md">
							Logan Lambert 
						</h3>
                	    <h5 class="text-lg font-semibold text-[rgba(41,106,72,1)] ">
                	        · Tech Lead and Judging Coordination Co-Lead
                   		</h5>
					
					</div>                
				</div>
			</div>
			

			<!-- 2nd -->
			<div class = "grid grid-cols-1 sm:grid-cols-3 gap-6 place-items-center">
				<!-- Member 3 -->
				<div class="transform-gpu origin-center transition-transform duration-300 hover:[transform:rotateX(10deg)_rotateY(-10deg)]  shadow-xl/30 flex items-center gap-4 bg-[#f4f8f4] border border-[#d6e4dc] rounded-xl p-5 w-full max-w-2xl">
					<div class="shadow-xl/50 w-40 h-40 rounded-full border-2 border-[rgba(0,0,0,1)] overflow-hidden">
						<img src="/img/daniel.jpg" alt="Daniel Miretsky" class="w-full h-full object-cover" />
					</div>

					<div>
						<h3 class="text-lg font-semibold text-[rgba(41,106,72,1)] text-shadow-md">
							Daniel Miretsky 
						</h3>
						<h5 class="text-lg font-semibold text-[rgba(41,106,72,1)]">
							· Judging Lead and Tech Co-Lead
						</h5>
						
					</div>

					
				</div>

				<!-- Member 4 -->
				<div class="transform-gpu origin-center transition-transform duration-300 hover:[transform:rotateX(10deg)_rotateY(-10deg)]  shadow-xl/30 flex items-center gap-4 bg-[#f4f8f4] border border-[#d6e4dc] rounded-xl p-5 w-full max-w-2xl">
					<div class="shadow-xl/50 w-40 h-40 rounded-full border-2 border-[rgba(0,0,0,1)] overflow-hidden">
						<img src="/img/Volo.jpg" alt="" class="w-full h-full object-cover" />
					</div>

					<div>
						<h3 class="text-2xl font-semibold text-[rgba(41,106,72,1)] text-shadow-md">
							Volo Kotelyak 
						</h3>
						<h5 class="text-lg font-semibold text-[rgba(41,106,72,1)]">
							· Sponsorship Lead
						</h5>
						
					</div>

					
				</div>

				<!-- Member 5 -->
				<div class="transform-gpu origin-center transition-transform duration-300 hover:[transform:rotateX(10deg)_rotateY(-10deg)] shadow-xl/30 flex items-center gap-4 bg-[#f4f8f4] border border-[#d6e4dc] rounded-xl p-5 w-full max-w-2xl ">
					<div class="shadow-xl/50 w-40 h-40 rounded-full border-2 border-[rgba(0,0,0,1)] overflow-hidden">
						<img src="/img/jojo.jpg" alt="Sosa" class="w-full h-full object-cover" />
					</div>

					<div>
						<h3 class="text-shadow-md font-semibold text-[rgba(41,106,72,1)] text-2xl">
							Jojo Dejesus 
						</h3>
						<h5 class="text-lg font-semibold text-[rgba(41,106,72,1)]">
							· Design / Social Media Lead
						</h5>
						
					</div>

					
				</div>
			</div>
            
			<!-- 3rd -->
			<div class = "grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
				<!-- Member 6 -->
				<div class="transform-gpu transition-transform duration-300 hover:[transform:rotateX(10deg)_rotateY(-10deg)] shadow-xl/30 flex items-center gap-4 bg-[#f4f8f4] border border-[#d6e4dc] rounded-xl p-5 w-full max-w-2xl">
					<div class="shadow-xl/50 w-40 h-40 rounded-full border-2 border-[rgba(0,0,0,1)] overflow-hidden">
						<img src="/img/_Thang_.jpg" alt="" class="w-full h-full object-cover object-top" />
					</div>
					<div>
						<h3 class="text-2xl font-semibold text-[rgba(41,106,72,1)] text-shadow-md">
							Thang H Pham
						</h3>
						<h5 class="text-lg font-semibold text-[rgba(41,106,72,1)]">
							· Tech Team
						</h5>
						
					</div>

					
				</div>

				<!-- Member 7 -->
				<div class="transform-gpu origin-center transition-transform duration-300 hover:[transform:rotateX(10deg)_rotateY(-10deg)] shadow-xl/30 flex items-center gap-4 bg-[#f4f8f4] border border-[#d6e4dc] rounded-xl p-5 w-full max-w-2xl">
					<div class="shadow-xl/50 w-40 h-40 rounded-full border-2 border-[rgba(0,0,0,1)] overflow-hidden">
						<img src="/img/Khanh.jpg" alt="Sosa" class="w-full h-full object-cover object-top" />
					</div>

					<div>
						<h3 class="text-2xl font-semibold text-[rgba(41,106,72,1)] text-shadow-md">
							Khanh Tran
						</h3>
						<h5 class="text-lg font-semibold text-[rgba(41,106,72,1)]">
							· Tech Team
						</h5>
						
					</div>

					
				</div>
			</div>

	</div>
</div>

<!-- Contact Information -->
<div class="flex justify-center items-center p-8 px-4 sm:px-6 flex-col gap-4">
    <h2> hackathon@hackwit.org </h2>
    <div class="flex flex-row gap-4">
        <Button square variant="tonal" onclick={() => window.open('https://github.com/WITCodingClub/calendar', '_blank')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z"/></svg>        
            Github
        </Button>
        <Button square variant="tonal" onclick={() => window.open('https://discord.gg/fkeM94snmy', '_blank')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z"/></svg>        
            Discord
        </Button>
        <Button square variant="tonal" onclick={() => window.open('https://www.instagram.com/wit_coding_club/', '_blank')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z"/></svg>        
            Instagram
        </Button>
    </div>
</div>