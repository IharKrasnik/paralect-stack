<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Loader from '$lib/components/Loader.svelte';
	import globalStyles from '$lib/stores/globalStyles';
	let isLoaded = false;

	onMount(() => {
		setTimeout(() => {
			isLoaded = true;
		}, 1000);
	});

	$globalStyles = { ...$globalStyles, [`--color-brand`]: 'blue !important' };

	let isHovering = false;
</script>

<!-- <div class="relative h-screen">
	<img
		src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Windows_9X_BSOD.png"
		class="mx-auto blur-sm"
		style="filter: grayscale(.95)"
	/>
</div> -->
<div class="min-h-screen" style="">
	{#if isLoaded}
		<div class="max-w-[700px] mx-auto relative text-3xl" style="line-height: 1.0;" in:fade>
			<div
				class="absolute w-full h-full transition"
				style="background: rgb(45 0 255); {isHovering ? '' : 'rotate: -.7deg;'}"
			/>

			<div class="relative mx-auto p-8 z-10" style="font-family: VT323;">
				<div class="flex justify-center mb-4">
					<div class="mx-auto bg-white" style="color:#00007e; font: bold;">Help Stack Pls ♥</div>
				</div>
				<div class="mt-8">
					An error has occurred! <br />
					Dev Stack is still in beta. <br /><br />

					But you know what.. you can help us create the most decent modern dev tools library.<br
					/><br />
					See, we don't want to add thousands of tools here. Trends comes and ago. We will list only
					battle-tested tech that really worth trying out.
					<br /><br />

					If you built something decent (we sure you are), submit your stack and get your beautiful
					page. With a link to your product.

					<div class="flex items-center mt-8">
						<div>&gt;:</div>
						<a href="/publish"
							><button
								class="ml-4 secondary dos whiteb"
								on:mouseenter={() => (isHovering = true)}
								on:mouseleave={() => (isHovering = false)}
							>
								Submit My Stack
							</button></a
						>
					</div>
				</div>
			</div>
		</div>

		<div class="max-w-[400px] mx-auto border border-white/20 mt-8">
			<div class="p-4">
				Yes please don't be like the rest. It felt like they were in a race to list the most apps
				without putting too much thought into what they do or if they still exist. <br /> <br />I
				really like the approach you are taking and would like to help!
			</div>
			<div class="flex items-center mt-4 w-full border border-white/20 p-4">
				<img
					src="https://pbs.twimg.com/profile_images/551687357385039872/0CIjt0iu_400x400.jpeg"
					class="mr-2 w-[30px] h-[30px] rounded-full"
				/>
				<div class="">
					<a href="https://twitter.com/Awan_Sahab" target="_blank">Muneeb</a>,
					<a href="/@postnitro">Postnitro</a>
				</div>
			</div>
		</div>
	{:else}{/if}
</div>
