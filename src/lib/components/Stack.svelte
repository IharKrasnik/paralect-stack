<script>
	import categories from '$lib/data/categories';
	import tools from '$lib/data/tools';
	import Image from '$lib/components/Image.svelte';
	import { browser } from '$app/environment';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { get } from '$lib/api';
	import { showSuccessMessage } from '$lib/services/toast';
	export let categoryKey = 'landing-page';
	import currentUser, { isLoading as isCurrentUserLoading } from '$lib/stores/currentUser';

	let activeCategory = categories.find((c) => c.key === categoryKey) || categories[0];

	$: if (categoryKey) {
		activeCategory = categories.find((c) => c.key === categoryKey) || categories[0];
	}

	let isLoaded = {};

	let copyUrl = () => {
		window.navigator.clipboard.writeText(window.location.href);

		showSuccessMessage('URL was copied to clipboard!');
	};
</script>

<div class="relative flex mb-8 items-start" id="tools">
	<div
		class=" top-24 bottom-16 w-[256px] mt-8 p-4 section flex-shrink-0 mr-8 hidden sm:block overflow-y-auto"
		class:fixed={$page.url.pathname !== '/'}
	>
		{#each categories as category}
			<a
				href="/cat/{category.key}"
				class="block nav-link pb-4 text-lg"
				class:active={categoryKey === category.key}
			>
				{category.name}
			</a>
		{/each}
	</div>

	<div class="min-h-screen p-4 sm:p-0 bg-black {$page.url.pathname !== '/' ? 'sm:ml-[304px]' : ''}">
		<div class="flex justify-between items-center mt-8">
			<div>
				<h1>Top {activeCategory.name} {activeCategory.noTools ? '' : 'Tools'}</h1>
				<h2>{activeCategory.description || ''}</h2>
			</div>

			<button class="hidden sm:block secondary" on:click={copyUrl}>Share Stack</button>
		</div>

		{#key categoryKey}
			<div
				class="grid grid-cols-1 sm:grid-cols-2 mt-8 items-start gap-4"
				in:fly={{ duration: 150, y: 50 }}
			>
				{#each tools.filter((t) => t.category === activeCategory.key) as tool}
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
