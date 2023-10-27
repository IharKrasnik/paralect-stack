<script>
	import _ from 'lodash';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { get, post, put } from '$lib/api';
	import { browser } from '$app/environment';
	import FileInput from '$lib/components/FileInput.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import LoginButton from '$lib/components/LoginButton.svelte';
	import Button from '$lib/components/Button.svelte';
	import currentUser from '$lib/stores/currentUser';
	import formCache from '$lib/stores/formCache';
	import { fade, fly } from 'svelte/transition';
	import { showErrorMessage } from '$lib/services/toast';
	import getToolsFromInput from '$lib/helpers/getToolsFromInput';

	import tools from '$lib/data/tools';
	import techTools from '$lib/data/techTools';

	let stack = $page.data.stack;

	let updateStack = async () => {
		let updatedStack = await put(`stacks/${stack._id}`, {
			...stack,
			tools: getToolsFromInput(stack.toolsStr).map((t) => {
				t._id = t.key;
				return t;
			})
		});
		if (updatedStack.slug) {
			goto(`/@${updatedStack.slug}`);
		}
	};
</script>

<div class="min-h-screen max-w-[600px] mx-auto">
	<h2 class="mb-4">Edit {stack.name} Stack</h2>

	<div class="w-full mb-6">
		<label>Product URL</label>
		<input class="w-full" bind:value={stack.url} />
	</div>

	<div class="w-full mb-6">
		<label>Name</label>
		<input class="w-full" bind:value={stack.name} />
	</div>

	<div class="w-full mb-6">
		<label>Tagline</label>
		<input class="w-full" bind:value={stack.description} />
		<div class="mt-2 opacity-80">Super short pitch (up to 10 words)</div>
	</div>

	<div class="w-full mb-6">
		<label>Square Logo</label>

		<FileInput class="w-full" bind:url={stack.logo} />

		<div class="mt-2 opacity-80">Recommended: 120px x 120px</div>
	</div>

	<div class="w-full mb-6">
		<label>Background Image</label>
		<FileInput class="w-full" bind:url={stack.img} />
		<div class="mt-2 opacity-80">
			Recommended: 1200px x 630px (same size as you use for OpenGraph image)
		</div>
	</div>

	<div class="w-full mb-6">
		<label>Startup Stack</label>
		<textarea class="w-full" bind:value={stack.toolsStr} />
	</div>

	<hr class="my-8 border-white/20" />

	<Button onClick={updateStack} class="secondary">Update Stack</Button>
</div>

<style>
</style>
