<script>
	import _ from 'lodash';

	import { SvelteToast } from '@zerodevx/svelte-toast';
	import isMobile from '$lib/helpers/isMobile';
	import categories from '$lib/data/categories';
	import '../app.css';
	import { fade, fly } from 'svelte/transition';
	import Loader from '$lib/components/Loader.svelte';
	import Switch from '$lib/components/Switch.svelte';

	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { get } from '$lib/api';
	import fillMetaTags from '$lib/services/fillMetaTags';
	import isImagesLoaded from '$lib/stores/isImagesLoaded';

	import techTools from '$lib/data/techTools';
	import tools from '$lib/data/tools';

	import globalStyles from '$lib/stores/globalStyles';

	let toolsToFill = [...techTools, ...tools].filter((t) => {
		return !t.img;
	});

	let scrollY;
	fillMetaTags({ tools: toolsToFill });

	let isYesCode = false;
	$: isYesCode = $page.url.pathname === '/lists/yes-code';

	let globalCss = '';

	let isLoaded = false;

	let timeout;

	$: if ($page.url.pathname === '/lists/yes-code') {
		timeout = setTimeout(() => {
			isLoaded = true;
			globalCss = `--color-brand: blue; --color-brand-text: white; --shadow-color: blue;`;
		}, 1000);
	} else {
		if (timeout) {
			clearTimeout(timeout);
		}
		globalCss = `--color-brand: yellow; --color-brand-text: #000; --shadow-color: rgb(234 179 8 / 0.4);`;
	}
</script>

<svelte:window bind:scrollY />

<svelte:head>
	<title>{$page.data.ogTitle}</title>
	<meta name="title" content={$page.data.title || $page.data.ogTitle} />
	<meta name="description" content={$page.data.ogDescription} />
	<meta name="og:description" content={$page.data.ogDescription} />

	<meta name="twitter:title" content={$page.data.ogTitle} />
	<meta name="twitter:description" content={$page.data.ogDescription} />
	<meta name="twitter:card" content="summary_large_image" />

	<meta name="twitter:image" content={$page.data.ogImage} />

	<meta name="og:image" content={$page.data.ogImage} />
	<link rel="icon" href="/paralect_favicon.png" />
</svelte:head>

<div style={globalCss}>
	<SvelteToast />

	<div class="relative container mx-auto lg:mt-8 h-full max-w-[1200px] transition z-10">
		<div
			class=" {!$page.params.stackId && $page.params.categoryKey
				? 'sm:pt-8 sm:pb-4 sm:fixed bg-black'
				: ''} top-0 transition w-full max-w-[1200px] flex justify-between p-4 sm:p-0 mb-8 z-10"
			style="margin-bottom: -32px;"
		>
			{#if $page.url.pathname === '/' || $page.url.pathname === '/lists/yes-code'}
				<div
					class="absolute left-[50%] transition top-[70px] sm:top-[50px]"
					style="transform:translateX(-50%);"
					class:opacity-50={$page.url.pathname === '/' && !$isImagesLoaded}
				>
					<div class="grid grid-cols-3 justify-center w-[250px]">
						<div class:opacity-50={isYesCode} class="transition p-1">No-Code</div>
						<div class="w-full h-full flex justify-center items-center">
							<Switch
								onChange={(isCode) => {
									if (isCode) {
										goto('/lists/yes-code');
									} else {
										goto('/');
									}
								}}
								bind:checked={isYesCode}
								fontSize={15}
								design="slider"
							/>
						</div>
						<div class:opacity-50={!isYesCode} class="transition text-center p-1 opacity-50">
							Yes-Code
						</div>
					</div>
				</div>
			{/if}

			<div class="w-full sm:w-auto">
				<div class="flex items-center justify-between sm:justify-start">
					<a href="/" class="flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="100" viewBox="0 0 1431 443" fill="none"
							><script xmlns=""></script>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M1431 0H743.748V442.689H1431V0ZM1198.94 184.389C1128.42 184.389 1113.7 196.104 1113.7 237.867H1114.21V253.656C1114.21 284.724 1114.72 317.83 1194.88 317.83H1211.62V357.557H1191.83C1094.43 357.557 1073.12 313.755 1073.12 254.166V235.321C1073.12 161.47 1121.82 145.172 1202.49 145.172H1211.62V184.389H1198.94ZM841.264 353.991H800.677V80.9983H841.264V353.991ZM1367.88 317.83H1372.45V357.557H1363.32C1286.71 357.047 1240.54 337.184 1240.54 255.693V89.1473H1281.13V146.7H1372.95V184.389H1281.13V253.656C1281.13 297.457 1292.8 317.83 1367.88 317.83ZM973.679 178.787C937.658 178.787 920.409 199.159 920.409 237.358H920.916V239.395H971.143C993.973 239.395 1010.21 232.774 1010.21 209.855C1010.21 188.973 999.554 178.787 973.679 178.787ZM921.481 269.445H970.635C1016.3 269.445 1048.26 255.693 1048.26 210.364C1048.26 164.526 1019.34 145.172 973.679 145.172C916.857 145.172 880.329 179.296 880.329 237.358V254.166C880.329 314.265 901.637 357.557 999.046 357.557H1027.96V317.83H1004.63C939.859 317.83 924.354 301.475 921.481 269.445Z"
								fill="var(--color-brand)"
							/>
							<path
								d="M144.592 170.638C144.592 216.476 100.96 227.681 42.6165 232.774V117.669H78.6375C128.357 117.669 144.592 132.948 144.592 170.638ZM0 80.9982V353.991H42.6165V272.501C124.298 262.314 188.73 241.942 188.73 170.638C188.73 106.973 157.275 80.4889 70.0127 80.4889H0V80.9982ZM445.443 176.75C442.907 167.582 439.863 155.868 435.297 147.209H405.364C407.9 157.396 408.408 175.731 408.408 190.501V354.501H448.995V225.134C448.995 188.973 496.177 185.917 521.544 184.389V146.191C461.171 148.737 441.892 164.017 434.282 178.787L445.443 176.75ZM655.989 222.079C643.305 229.209 616.416 230.737 596.123 233.793C561.624 238.886 529.154 248.563 529.154 292.873C529.154 340.749 563.653 356.029 597.138 356.029C631.129 356.029 653.959 344.314 666.643 325.979L651.423 307.644C645.335 313.246 634.173 324.451 602.718 324.96C580.903 324.96 567.712 312.737 567.712 292.364C567.712 270.973 580.903 263.842 603.733 260.787C625.041 257.731 652.945 256.712 665.121 248.563C665.628 243.979 657.004 220.041 655.989 222.079ZM603.226 145.681C580.903 145.681 564.161 146.7 546.404 148.228V184.389C564.161 182.861 580.903 181.843 603.226 181.843C638.739 181.843 651.93 190.501 651.93 239.905V312.227C651.93 320.886 657.511 341.768 663.599 353.991H693.532C690.995 344.314 690.995 318.339 690.995 311.209V240.923C690.488 167.073 664.614 145.681 603.226 145.681ZM330.785 222.079C318.101 229.209 291.212 230.737 270.919 233.793C236.42 238.886 203.95 248.563 203.95 292.873C203.95 340.749 238.449 356.029 271.934 356.029C305.925 356.029 328.755 344.314 341.439 325.979L326.219 307.644C320.131 313.246 308.969 324.451 277.514 324.96C255.699 324.96 242.508 312.737 242.508 292.364C242.508 270.973 255.699 263.842 278.529 260.787C299.837 257.731 327.741 256.712 339.917 248.563C340.424 243.979 331.799 220.041 330.785 222.079ZM278.022 145.681C255.699 145.681 238.956 146.7 221.2 148.228V184.389C238.956 182.861 255.699 181.843 278.022 181.843C313.535 181.843 326.726 190.501 326.726 239.905V312.227C326.726 320.886 332.307 341.768 338.395 353.991H368.328C365.791 344.314 365.791 318.339 365.791 311.209V240.923C365.284 167.073 339.41 145.681 278.022 145.681Z"
								fill="white"
							/>
						</svg>
						<a href="/" style="font-family: VT323;"
							><span class="mr-2 ml-4 font-bold text-xl">Stack</span></a
						>
					</a>

					<div class="flex items-center text-xl" style="font-family: VT323;">
						{#if $page.params.stackId}
							<a class="flex" href="/@{$page.params.stackId}">
								<span class="opacity-30 mx-2">/</span>
								<span class="font-bold mx-2">@{$page.params.stackId}</span>
							</a>
						{:else if !['/publish'].includes($page.url.pathname)}
							<a
								href="/publish"
								class="ml-4 bg-brand cursor-pointer opacity-30 hover:opacity-100 transition"
							>
								<button
									class="w-[20px] h-[20px] flex items-center justify-center rounded-full p-2 text-lg"
									style="border:none; outline: none;"
								>
									+
								</button>
							</a>
							<!-- <span class="ml-2">Startup Stack</span> -->
						{/if}
					</div>
				</div>

				<!-- <div class="mt-2 opacity-90">Startup Stack</div> -->
			</div>

			<div class="flex items-center">
				<a href="/all"
					><div class="mr-8 hidden sm:block opacity-80 hover:opacity-100">All Stacks</div></a
				>
				<a href="/about"
					><div class="mr-8 hidden sm:block opacity-80 hover:opacity-100">About Stack</div></a
				>
				<a href="https://www.paralect.com" target="_blank" class="hidden sm:block">
					<button class="rotated">Build My Product</button>
				</a>
			</div>
		</div>
	</div>

	<div
		class="container mx-auto h-full max-w-[1200px] mb-8 z-1 relative {$page.params.categoryKey
			? ''
			: ''} mt-16 sm:mt-24"
	>
		<slot />
	</div>

	<div class="bg-zinc-900 w-full p-4 sm:hidden">
		<div class="font-bold text-2xl mb-4">Stack Categories</div>

		{#each categories as category}
			<a
				href="/cat/{category.key}"
				class="block nav-link pb-4 text-lg shrink-0"
				class:active={$page.params.categoryKey === category.key}
			>
				{category.name}
			</a>
		{/each}
	</div>
	<!-- 
	{#if !$page.url.pathname.includes('/about')}
		<a href="/about">
			<button
				class="sticky z-10 px-4 py-4 w-full text-center opacity-70 hover:opacity-100 transition"
				style={'background-color: #111; color: white; outline: none;'}
				in:fly={{ y: -50 }}
			>
				Paralect Stack is an opinionated list of battle-tested tools, platforms and resources for
				startup growth.
			</button>
		</a>
	{:else}
		<a href="/"
			><div
				class="bg-zinc-900 hover:bg-brand py-4 w-full text-center opacity-90 hover:opacity-100 transition"
			>
				Browse Tools
			</div>
		</a>{/if}

	{#if !$page.url.pathname.includes('/publish')}
		<a href="/publish">
			<button
				class="sticky z-10 px-4 py-4 w-full text-center opacity-70 hover:opacity-100 transition"
				style={$page.url.pathname === '/'
					? 'background-color: #111; color: white; outline: none;'
					: ''}
				in:fly={{ y: -50 }}
			>
				Publish My Stack
			</button>
		</a>
	{/if} -->
</div>

<style>
	.nav {
		@apply text-[#b0b0be];
	}
	.nav.active {
		@apply text-white;
	}

	.nav:hover {
		@apply text-black;
	}
</style>
