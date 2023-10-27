<script>
	import _ from 'lodash';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { get, post } from '$lib/api';
	import { browser } from '$app/environment';
	import getToolsFromInput from '$lib/helpers/getToolsFromInput';

	import Loader from '$lib/components/Loader.svelte';
	import LoginButton from '$lib/components/LoginButton.svelte';
	import currentUser from '$lib/stores/currentUser';
	import formCache from '$lib/stores/formCache';
	import { fade, fly } from 'svelte/transition';
	import { showErrorMessage } from '$lib/services/toast';

	import tools from '$lib/data/tools';
	import techTools from '$lib/data/techTools';

	let allTools = [...tools, ...techTools];

	let startupUrl = $formCache.startupUrl || '';

	let getName = (startupUrl) => {
		return _.capitalize(startupUrl.replace('https://', '').replace('www.', '').split('.')[0]);
	};

	function isValidHttpUrl(string) {
		if (string && !string.startsWith('http')) {
			string = `https://${string}`;
		}

		if (!string.includes('.')) {
			return false;
		} else if (string.split('.')[1].length < 2) {
			return false;
		}

		let url;

		try {
			url = new URL(string);
		} catch (_) {
			return false;
		}

		return url.protocol === 'http:' || url.protocol === 'https:';
	}

	let isUrlSubmitted = false;

	let isUrl = false;

	let checkStartupUrl = async ({ url = startupUrl, showError = true, submitIfUrl = false }) => {
		isUrl = false;

		if (url) {
			isUrl = isValidHttpUrl(url);

			if (!isUrl) {
				if (showError) {
					showErrorMessage('Please enter valid url');
				}
			} else {
				if (submitIfUrl) {
					isUrlSubmitted = true;

					try {
						try {
							let { metatags } = await get(
								'utils/fetch-meta-tags',
								{ url: startupUrl },
								{ skipError: true }
							);
							$formCache.metatags = metatags;
						} finally {
						}
					} finally {
					}
				}
			}

			return isUrl;
		}
	};

	if (startupUrl) {
		checkStartupUrl({ submitIfUrl: true });
	}

	let currentTools = [];

	let toolsStr = $formCache.toolsStr || '';
	currentTools = getToolsFromInput(toolsStr);

	let isStackSubmitted = false;

	let isSubmitting = false;

	let submitStack = () => {
		if (!$currentUser) {
			isStackSubmitted = true;
			return;
		}

		if (startupUrl && currentTools.length) {
			isStackSubmitted = true;
			isSubmitting = true;

			try {
				post('stacks', {
					url: startupUrl,
					name: getName(startupUrl),
					description: ($formCache.metatags && $formCache.metatags.titleTag) || '',
					logo: ($formCache.metatags && $formCache.metatags.favicon) || null,
					img: ($formCache.metatags && $formCache.metatags.image) || null,
					toolsStr,
					tools: currentTools.map((t) => ({
						_id: t.key,
						name: t.name
					}))
				}).then((stack) => {
					startupUrl = '';
					toolsStr = '';
					currentTools = [];
					$formCache = { ...$formCache, toolsStr, startupUrl: '', metatags: null };
					goto(`/@${stack.slug}`);
				});
			} finally {
				isSubmitting = false;
			}
		}
	};

	if (browser && $currentUser && $page.url.searchParams.get('create')) {
		submitStack();
	}

	$: if (startupUrl) {
		$formCache = {
			...$formCache,
			['startupUrl']: startupUrl
		};
	}

	$: if (toolsStr) {
		$formCache = {
			...$formCache,
			['toolsStr']: toolsStr
		};
	}
</script>

<div class="min-h-screen px-4 sm:px-0">
	{#if browser}
		<div class="max-w-[700px] mx-auto">
			<div>
				<h1>Publish Your Startup Stack</h1>
				<h2 class="mt-2">
					Get the branded page for your product with the list of your startup tech tools
				</h2>
			</div>
			<div class="mt-8 border border-white/20 p-8">
				{#if isStackSubmitted}
					{#if $currentUser}
						<div class="w-full text-center">
							<div class="mb-4">Submitting Stack...</div>
							<Loader />
						</div>
					{:else}
						<div class="w-full text-lg">
							<div class="font-bold mb-2">That's a nice stack 👏</div>
							<div>
								Please log in to submit <span>{getName(startupUrl)}</span>
								<span class="underline cursor-pointer" on:click={() => (isStackSubmitted = false)}
									>stack</span
								>
							</div>
							<div>Once your page is published, we'll send you an email</div>
						</div>

						<div class="w-full flex justify-center mt-8">
							<LoginButton />
						</div>
					{/if}
				{:else if !isUrlSubmitted}
					<div in:fade={{ duration: 150 }}>
						<label class="text-lg">What's your startup url?</label>
						<input
							autofocus
							class="w-full mt-4"
							placeholder="mycoolproduct.com"
							on:keydown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									checkStartupUrl({ url: e.target.value, submitIfUrl: true });
								}
							}}
							on:input={(e) => checkStartupUrl({ url: e.target.value, showError: false })}
							on:paste={(e) => {
								if (checkStartupUrl({ url: e.clipboardData.getData('text') })) {
									setTimeout(() => {
										isUrlSubmitted = true;
									});
								}
							}}
							bind:value={startupUrl}
						/>
					</div>

					<div class="mt-8">
						<button
							class="secondary px-8 py-4"
							class:white={!isUrl}
							disabled={!isUrl}
							on:click={() => checkStartupUrl({ submitIfUrl: true })}>Continue</button
						>
					</div>
				{:else}
					<div in:fade={{ duration: 150 }}>
						<label class="text-lg"
							>What tools do you use for <span
								class="underline cursor-pointer"
								on:click={() => {
									isUrlSubmitted = false;
								}}>{getName(startupUrl)}</span
							>? Just list them through ","</label
						>

						<textarea
							autofocus
							class="w-full mt-4"
							bind:value={toolsStr}
							on:input={(e) => {
								currentTools = getToolsFromInput(e.target.value);
							}}
							placeholder="webflow, airtable, sendgrid, carta, vercel, nextjs, tailwind css"
						/>
					</div>

					<div class="mt-8">
						<button
							class="secondary"
							disabled={currentTools?.length < 2}
							class:white={currentTools?.length < 5}
							on:click={submitStack}
						>
							{#if !currentTools?.length}
								{#if toolsStr.length > 4}
									Type ',' to add second tool
								{:else}
									Start Adding..
								{/if}
							{:else if currentTools.length < 3}
								Continue Adding...
							{:else if currentTools.length === 3}
								2 more left...
							{:else if currentTools.length === 4}
								1 more! 🔥
							{:else}
								Submit {currentTools.length} Tools
							{/if}
						</button>
					</div>
					{#if currentTools.length >= 5}
						<div class="mt-8">
							You can add more tools to make your page nice <br /> We will give shoutouts to the authentic
							stacks!
						</div>
					{:else if currentTools.length > 0}
						<div class="mt-8">To make your page look nice, add at least 5 tools</div>
					{/if}
				{/if}
			</div>
		</div>

		{#if isUrlSubmitted}
			<div class="w-full justify-center flex flex-wrap gap-4 mt-12">
				{#each currentTools as currentTool, i}
					{#if currentTool.name}
						<div class="w-[200px] grayscale">
							{#if currentTool.img}
								<img
									in:fly={{ duration: 150, y: -50 }}
									class="aspect-video w-full object-cover"
									src={currentTool.img}
								/>
							{:else}
								<div class="aspect-video w-full bg-zinc-900 flex items-center justify-center">
									under review
								</div>
							{/if}
							<div class="font-bold mt-4">
								{currentTool.name}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{/if}

		{#if !isUrlSubmitted}
			<div class="mt-2 text-center w-full mt-8 opacity-80">
				This form is super simple and takes less than 1 minute to complete
			</div>
		{/if}

		{#if $formCache.metatags}
			<img class="px-4 max-w-[600px] mx-auto mt-8" in:fade src={$formCache.metatags.image} />

			{#if isUrlSubmitted}
				<h2 class="px-4 mx-auto text-center mt-4">{getName(startupUrl)}</h2>
			{/if}
		{/if}
	{/if}
</div>

<style>
	button.white {
		outline-color: rgba(255, 255, 255, 0.2);
		@apply transition border-white/20;
	}
</style>
