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

	$: activeStack = $page.params.stackId ? stacks.find((s) => s.key === $page.params.stackId) : null;

	let isLoaded = {};

	let copyUrl = () => {
		window.navigator.clipboard.writeText(window.location.href);

		showSuccessMessage('URL was copied to clipboard!');
	};

	let shuffleKey = +new Date();

	let shuffle = () => {
		shuffleKey = +new Date();
	};

	let formatCategory = (categoryKey) => {
		let category = categories.find((c) => c.key === categoryKey);
		return category?.name || '';
	};
</script>

{#if $page.params.stackId}
	<div class="relative py-16 w-full bg-[#111] flex justify-center items-center mt-8 sm:mt-[-64px]">
		<img
			class="absolute left-0 top-0 w-full h-full grayscale opacity-20 z-1 object-cover"
			src={activeStack.img}
		/>

		<div class="flex items-center flex-col text-center max-w-[600px] mx-auto px-4 z-10">
			<img
				class="w-auto h-[60px] rounded-lg mb-4 p-1"
				style="background: rgba(255, 255, 255, .9)"
				src={activeStack.logo}
			/>
			<h1>{activeStack.name}</h1>
			<h2 class="mt-2">{activeStack.description}</h2>

			<div class="flex items-center mt-8">
				<a href="/@{$page.params.stackId}/cat/all#tools">
					<button class="mr-4">View Tech Stack</button>
				</a>
				<a href={activeStack.url} target="_blank">
					<button class="secondary">Visit {activeStack.name} Website</button></a
				>
			</div>
		</div>
	</div>
{/if}

<div class="relative flex mb-8 items-start" id="tools">
	<div
		class=" top-24 bottom-16 w-[256px] mt-8 p-4 section flex-shrink-0 mr-8 hidden sm:block overflow-y-auto opacity-80 hover:opacity-100 transition"
		class:fixed={!$page.params.stackId && $page.params.categoryKey}
	>
		<!-- <a href="/cat/all" class="block nav-link pb-4 text-lg" class:active={categoryKey === 'all'}>
			All Tools
		</a> -->

		{#each categories as category}
			<a
				href="{stackId ? `/@${stackId}/` : '/'}cat/{category.key}{stackId ? '#tools' : ''}"
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

	<div
		class="overflow-hidden sm:min-h-screen p-4 sm:p-0 bg-black {!$page.params.stackId &&
		$page.params.categoryKey
			? 'sm:ml-[304px]'
			: ''}"
	>
		<div class="max-w-screen flex justify-between items-center mt-8">
			<div class="w-full">
				<div class="flex items-center">
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
				<h2 class="mt-2 max-w-[80%]">{activeCategory.description || ''}</h2>
			</div>

			<button class="flex-shrink-0 hidden sm:flex items-center secondary whiteb" on:click={copyUrl}>
				<div>Share Stack</div></button
			>
		</div>

		{#key categoryKey + shuffleKey}
			<div
				class="overflow-x-auto flex sm:grid {activeCategory.key === 'all'
					? 'sm:grid-cols-3'
					: 'sm:grid-cols-2'} mt-8 gap-4"
				in:fly={{ duration: 150, y: 50 }}
			>
				{#each _.shuffle(tools)
					.filter((t) => ($page.params.stackId ? true : !t.isUnlisted))
					.filter((t) => activeCategory.key === 'all' || t.category === activeCategory.key)
					.sort((a, b) => {
						if (a.key === selectedTool) {
							return -1;
						}
						return 1;
					}) as tool}
					<a class="card min-w-[90%] sm:min-w-auto" target="_blank" href={tool.url}>
						<div class="section">
							<div class="w-full aspect-og bg-zinc-900 transition">
								<Image src={tool.img} class="img transition w-full object-cover aspect-og" />
							</div>

							<div class="p-4">
								<h3 class="font-bold">
									{tool.name}
								</h3>

								<div class="mt-2 opacity-90">{tool.description}</div>
							</div>
						</div>
						{#if activeCategory.key === 'all'}
							<div class="section p-4 w-full text-center opacity-80">
								{formatCategory(tool.category)}
							</div>
						{/if}
					</a>
				{/each}
			</div>
			<div class="flex items-center justify-between mt-12 sm:mt-0">
				<div class="block sm:hidden w-full">Scroll right to see tools</div>
				<div class="flex-shrink-0">→→→</div>
			</div>
		{/key}
	</div>
</div>

<style>
</style>
