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
</script>

{#if $page.params.stackId && !$page.params.categoryKey}
	<div class="py-16 w-full bg-[#111] flex justify-center items-center" style="margin-top: -64px;">
		<div class="flex items-center flex-col text-center max-w-[600px] mx-auto">
			<img class="w-[60px] h-[60px] rounded-lg mb-2" src={activeStack.logo} />
			<h1>{activeStack.name} Startup Stack</h1>
			<h2 class="mt-2">{activeStack.description}</h2>

			<a class="mt-4" href={activeStack.url} target="_blank"
				><button class="secondary">Visit {activeStack.name} Website</button></a
			>
		</div>
	</div>
{/if}

<div class="relative flex mb-8 items-start" id="tools">
	<div
		class=" top-24 bottom-16 w-[256px] mt-8 p-4 section flex-shrink-0 mr-8 hidden sm:block overflow-y-auto"
		class:fixed={$page.params.categoryKey}
	>
		<!-- <a href="/cat/all" class="block nav-link pb-4 text-lg" class:active={categoryKey === 'all'}>
			All Tools
		</a> -->

		{#each categories as category}
			<a
				href="{stackId ? `/@${stackId}/` : '/'}cat/{category.key}"
				class="block nav-link pb-4 text-lg"
				class:active={categoryKey === category.key}
			>
				{category.name}
			</a>
		{/each}
	</div>

	<div class="min-h-screen p-4 sm:p-0 bg-black {$page.params.categoryKey ? 'sm:ml-[304px]' : ''}">
		<div class="flex justify-between items-center mt-8">
			<div>
				<div class="flex items-center">
					<h1>
						{#if activeCategory.title}
							{activeCategory.title}
						{:else}
							{activeCategory.key === 'all' ? 'All Tools' : `Top ${activeCategory.name}`}
							{activeCategory.noTools ? '' : 'Tools'}
						{/if}
					</h1>
					<div
						class="flex items-center ml-4 cursor-pointer px-2 py-1 border border-white opacity-80 hover:opacity-100 transition"
						on:click={shuffle}
					>
						<Icon class="mr-2" size="20" name="stack" />
						shuffle
					</div>
				</div>
				<h2 class="mt-2">{activeCategory.description || ''}</h2>
			</div>

			<button class=" hidden sm:flex items-center secondary whiteb" on:click={copyUrl}>
				<div>Share Stack</div></button
			>
		</div>

		{#key categoryKey + shuffleKey}
			<div
				class="grid grid-cols-1 {activeCategory.key === 'all'
					? 'sm:grid-cols-3'
					: 'sm:grid-cols-2'} mt-8 items-start gap-4"
				in:fly={{ duration: 150, y: 50 }}
			>
				{#each _.shuffle(tools)
					.filter((t) => activeCategory.key === 'all' || t.category === activeCategory.key)
					.sort((a, b) => {
						if (a.key === selectedTool) {
							return -1;
						}
						return 1;
					}) as tool}
					<a target="_blank" href={tool.url}>
						<div class="section">
							<div class="w-full aspect-og bg-zinc-900">
								<Image src={tool.img} class="transition w-full object-cover aspect-og" />
							</div>

							<div class="p-4">
								<h3 class="font-bold">
									{tool.name}
								</h3>

								<div class="mt-2 opacity-80">{tool.description}</div>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/key}
	</div>
</div>

<style>
</style>
