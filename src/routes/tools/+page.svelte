<script>
	import Image from '$lib/components/Image.svelte';
	import Button from '$lib/components/Button.svelte';
	import FileInput from '$lib/components/FileInput.svelte';
	import _ from 'lodash';
	import stacks from '$lib/data/stacks';
	import { browser } from '$app/environment';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { get, put } from '$lib/api';
	import { showSuccessMessage } from '$lib/services/toast';
	import Icon from '$lib/components/Icon.svelte';

	let tools;

	let loadTools = async () => {
		try {
			let { results } = await get('tools');

			tools = results.map((t) => {
				if (!t.category) {
					t.category = { _id: '' };
				}
				return t;
			});
		} catch (err) {}
	};

	loadTools();

	let updateTool = async (tool) => {
		let updatedTool = await put(`tools/${tool._id}`, tool);
	};

	let fetchMeta = async ({ tool }) => {
		let { metatags } = await get('utils/fetch-meta-tags', {
			url: tool.url
		});

		tool.description = metatags.title + ' ' + metatags.description;
		tool.img = metatags.image;
		tool.logo = metatags.favicon;

		tools = [...tools];
	};
</script>

{#if tools}
	{#each tools as tool}
		<div class="w-full grid grid-cols-3 gap-2 mb-4">
			<div>
				<input class="w-full" placeholder="Tool Name" bind:value={tool.name} />

				<div class="flex justify-between">
					<input class="w-full" placeholder="tool.com" bind:value={tool.url} />

					<Button class="secondary whiteb" onClick={() => fetchMeta({ tool })}>fetch</Button>
				</div>
				<input class="w-full" placeholder="Category" bind:value={tool.category._id} />
			</div>
			<div>
				<textarea
					placeholder="Simple yet super-useful task board to track the progress of any project, whether work-related or personal"
					rows="3"
					class="w-full"
					bind:value={tool.description}
				/>
			</div>
			<div class="flex">
				<div>
					<FileInput placeholder="Background URL" bind:url={tool.img} />
					<div>
						<FileInput placeholder="Logo URL" bind:url={tool.logo} />
					</div>
				</div>
				<div class="p-2">
					<Button class="secondary whiteb" onClick={() => updateTool(tool)}>Update</Button>
				</div>
			</div>
		</div>
	{/each}
{/if}
