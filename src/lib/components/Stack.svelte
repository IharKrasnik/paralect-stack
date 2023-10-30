<script>
	import Image from '$lib/components/Image.svelte';
	import _ from 'lodash';
	import stacks from '$lib/data/stacks';
	import { browser } from '$app/environment';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { get } from '$lib/api';
	import { showSuccessMessage } from '$lib/services/toast';
	import Icon from '$lib/components/Icon.svelte';

	export let categoryKey = 'all';
	import currentUser, { isLoading as isCurrentUserLoading } from '$lib/stores/currentUser';

	export let categories = [];
	export let tools = [];
	export let selectedTool = null;
	export let stackId = '';

	let activeCategory = categories.find((c) => c.key === categoryKey) || categories[0];

	$: if (categoryKey) {
		activeCategory = categories.find((c) => c.key === categoryKey) || categories[0];
	}

	let activeStack;

	$: activeStack = $page.params.stackId
		? stacks.find((s) => s.key === $page.params.stackId) || $page.data.stack
		: null;

	let isLoaded = {};

	let copyUrl = () => {
		window.navigator.clipboard.writeText(window.location.href);

		showSuccessMessage('URL was copied to clipboard!');
	};

	let shuffleKey = 'start';

	let shuffle = () => {
		shuffleKey = +new Date();
	};

	let formatCategory = (c) => {
		let categoryKey = c?._id || c;
		let category = categories.find((c) => c.key === categoryKey);
		return category?.name || '';
	};
</script>

{#if $page.params.stackId}
	<div class="relative py-16 w-full bg-[#111] flex justify-center items-center mt-8 sm:mt-[-64px]">
		<img
			class="absolute left-0 top-0 w-full h-full grayscale brightness-50 opacity-20 z-1 object-cover"
			src={activeStack.img}
		/>

		{#if $currentUser && ($currentUser.isAdmin || $currentUser._id === activeStack.user?._id)}
			<a href="/edit/@{activeStack.slug}">
				<button class="absolute top-8 right-8 rotated secondary">Edit Stack</button>
			</a>
		{/if}
		<div class="flex items-center flex-col text-center max-w-[600px] mx-auto px-4 z-10">
			<img
				class="w-auto h-[60px] rounded-lg mb-4 p-1"
				style="background: rgba(255, 255, 255, .9)"
				src={activeStack.logo}
			/>
			<h1>{activeStack.name}</h1>
			<h2 class="mt-2 text-[#e1e1e1]" style="opacity: 1;">{activeStack.description || ''}</h2>

			<div class="flex flex-col gap-4 sm:flex-row items-center mt-8 w-full sm:w-auto">
				<a class="w-full sm:w-auto" href="/@{$page.params.stackId}/cat/all#tools">
					<button class="w-full mr-4">View Tech Stack ↓</button>
				</a>
				<a class="w-full sm:w-auto" href={activeStack.url} target="_blank">
					<button class="w-full secondary">Visit {activeStack.name} Website</button></a
				>
			</div>
		</div>
	</div>
{/if}

<div class="relative flex mb-8 items-start z-1" id="tools">
	{#if !activeStack}
		<div
			class=" top-24 bottom-4 w-[256px] mt-8 p-4 section flex-shrink-0 mr-8 hidden sm:block overflow-y-auto opacity-80 hover:opacity-100 transition"
			class:fixed={!$page.params.stackId && $page.params.categoryKey}
		>
			<!-- <a href="/cat/all" class="block nav-link pb-4 text-lg" class:active={categoryKey === 'all'}>
			All Tools
		</a> -->

			{#each categories as category}
				<a
					href="/cat/{category.key}{stackId ? '#tools' : ''}"
					class="block nav-link pb-4 text-lg"
					class:active={categoryKey === category.key}
					style={category.key === 'all' && activeCategory.key !== 'all'
						? 'color: rgb(255, 244, 123);'
						: ''}
				>
					{category.name}
				</a>
			{/each}
		</div>
	{/if}

	<div
		class="overflow-hidden sm:overflow-visible w-full sm:min-h-screen p-4 sm:p-0 bg-black {!$page
			.params.stackId && $page.params.categoryKey
			? 'sm:ml-[304px]'
			: ''}"
	>
		<div class="max-w-screen flex justify-between items-center mt-8">
			<div class="w-full">
				<div class="flex items-center">
					{#if activeStack}
						<h1>Tech tools used by {activeStack.name}</h1>
					{:else}
						<h1>
							{#if activeCategory.title}
								{activeCategory.title}
							{:else if $page.params.stackId}
								{activeCategory.key === 'all'
									? `${activeStack.name} Startup Stack`
									: `${activeCategory.name}`}
							{:else}
								{activeCategory.key === 'all' ? 'All Tools' : `Top ${activeCategory.name}`}
								{activeCategory.noTools ? '' : 'Tools'}
							{/if}
						</h1>
					{/if}
					<div>
						{#if tools
							.filter((t) => ($page.params.stackId ? true : !t.isUnlisted))
							.filter((t) => activeCategory.key === 'all' || t.category === activeCategory.key).length > 6}
							<div
								class="flex items-center ml-4 cursor-pointer px-2 py-1 border border-white opacity-80 hover:opacity-100 transition"
								on:click={shuffle}
							>
								<Icon class="mr-2" size="20" name="stack" />
								shuffle
							</div>
						{/if}
					</div>
				</div>
				{#if activeStack}
					<h2 class="mt-2 max-w-[80%]">
						No-code tools, developer tools, startup utilities and more
					</h2>
				{:else}
					<h2 class="mt-2 max-w-[80%]">{activeCategory.description || ''}</h2>
				{/if}
			</div>

			<button class="flex-shrink-0 hidden sm:flex items-center secondary whiteb" on:click={copyUrl}>
				<div>Share Stack</div></button
			>
		</div>

		{#key categoryKey + shuffleKey}
			<div
				class="overflow-x-auto {$page.url.pathname === '/'
					? 'grid'
					: 'flex'} sm:grid auto-rows-fr {activeCategory.key === 'all'
					? 'sm:grid-cols-3'
					: 'sm:grid-cols-2 items-stretch'} mt-8 gap-4"
				in:fly={{ duration: 150, y: 50 }}
			>
				{#each _.take( _.shuffle(tools)
						.filter((t) => ($page.params.stackId ? true : !t.isUnlisted))
						.filter((t) => activeCategory.key === 'all' || t.category === activeCategory.key)
						.sort((a, b) => {
							if (a.key === selectedTool) {
								return -1;
							}
							return 1;
						}), $page.url.pathname === '/' ? 8 : tools.length ) as tool, i}
					<div class="h-full flex flex-col justify-between">
						<a
							class="h-full section block card min-w-[80vw] sm:min-w-0"
							class:disabled={!tool.url}
							target="_blank"
							href={tool.url}
						>
							<div class="w-full aspect-og bg-zinc-900 transition">
								{#if tool.img}
									<Image src={tool.img} class="img transition w-full object-cover aspect-og" />
								{:else}
									<div class="px-4 w-full h-full flex items-center justify-between text-center">
										tool is under review
									</div>
								{/if}
							</div>

							<div class="p-4 pb-2">
								<h3 class="font-bold text-lg">
									{tool.name}
								</h3>
							</div>

							<div class="mb-4 px-4 opacity-90">{tool.description || ''}</div>
						</a>

						{#if activeCategory.key === 'all'}
							<a
								href={`/cat/${tool.category?._id || tool.category}`}
								class:disabled={!tool.url}
								class="category-link section px-4 py-2 w-full opacity-80"
							>
								{formatCategory(tool.category)}
							</a>
						{/if}
					</div>

					{#if activeCategory.key === 'all' && !$currentUser && (activeStack ? i === activeStack.tools.length - 1 : i === 1)}
						<a
							href="/publish"
							style="border: 1px rgb(255, 244, 123) solid;"
							class="flex flex-col justify-between submitstack w-full section h-full min-w-[80vw] sm:min-w-0"
						>
							<div class="p-4">
								<div class="text-lg font-bold">🔥 Submit Your Stack</div>

								<hr class="divider" />
								<div class="mt-2 w-full">
									Get branded page for your product stack. Share it around and attract leads. Get
									backlink to your product website
								</div>
							</div>

							<div class="img">
								<img
									src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1698350003479-your_pitch.png"
									class="img w-full aspect-video"
								/>
							</div>
						</a>
					{/if}
				{/each}
			</div>
			{#if $page.url.pathname === '/'}
				<a href="/cat/all"
					><button class="w-full py-12 mt-16 text-lg"
						>Browse All {tools.length} Startup Tools</button
					></a
				>
			{:else}
				<div class="sm:hidden flex items-center justify-between mt-12 sm:mt-0">
					<div class="block sm:hidden w-full text-lg">Scroll Right</div>
					<div class="flex-shrink-0">→→→</div>
				</div>
				<hr class="border border-white/20 my-4 mt-8 sm:hidden" />
			{/if}
		{/key}

		<div class="grid {$currentUser ? '' : 'sm:grid-cols-2'} gap-4 mt-24 mb-8">
			<a href="/publish" class="block w-full">
				<button
					class="category-link block z-10 px-4 py-4 w-full text-center opacity-70 hover:opacity-100 transition"
					style={$page.url.pathname === '/' ? '' : ''}
					in:fly={{ y: -50 }}
				>
					<div class="font-bold">Publish Your Stack</div>
					<div class="text-sm">It will take less than 1 minute</div>
				</button>
			</a>

			{#if !$currentUser}
				<a href="/subscribe" class="w-full block">
					<button
						class="block category-link z-10 px-4 py-4 w-full text-center opacity-70 hover:opacity-100 transition"
						in:fly={{ y: -50 }}
					>
						<div class="font-bold">Subscribe To Stack</div>
						<div class="text-sm">Get useful content on startup building and growth</div>
					</button>
				</a>
			{/if}
		</div>

		<a href="/about" class="block mt-8 mb-8">
			<button
				class="category-link z-10 px-4 py-4 w-full text-center opacity-70 hover:opacity-100 transition"
				in:fly={{ y: -50 }}
			>
				Paralect Stack is an opinionated list of battle-tested tools, platforms and resources for
				startup growth.
			</button>
		</a>
	</div>
</div>

<style>
	.submitstack {
		@apply bg-white/10;
		margin: 0;
	}

	.submitstack:hover {
		background: rgb(255, 244, 123);
		color: #111;
	}

	.divider {
		border-color: rgba(255, 255, 255, 0.2);
		@apply my-4;
	}

	.submitstack .img {
		filter: blur(5px);
	}

	.submitstack:hover .img {
		filter: none;
		opacity: 100;
	}

	.submitstack:hover .divider {
		border-color: #666;
		@apply transition;
	}

	.card:not(.disabled):hover {
		border: 1px rgb(255, 244, 123) solid;
	}
</style>
