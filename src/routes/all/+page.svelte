<script>
	import _ from 'lodash';
	import Loader from '$lib/components/Loader.svelte';
	import { get } from '$lib/api';

	let isLoading = false;
	let stacks = [];

	let loadStacks = async () => {
		try {
			let { results } = await get('stacks');
			stacks = results;
		} catch (err) {}
	};

	loadStacks();
</script>

<div class="min-h-screen max-w-[700px] mx-auto p-4">
	<h1>All Stacks</h1>
	<h2 class="mt-4">Discover new tools and learn how other makers solve tech problems</h2>

	{#if isLoading}
		<Loader />
	{:else}
		<div class="mt-8">
			{#each stacks as stack (stack._id)}
				<a
					class="stack-link relative block mb-8 border border-white/20 hover:border-yellow-200"
					href="/@{stack.slug}"
				>
					<div class="flex flex-col-reverse sm:flex-row justify-between w-full z-10">
						<div class="flex flex-col w-full justify-between">
							<div class="p-4 pb-8">
								<div class="text-lg font-bold">{stack.name}</div>
								<div class="mt-2">{stack.description}</div>
							</div>

							<div class="w-full grid grid-cols-9 sm:grid-cols-9 bg-[#111]" style="">
								{#each _.take(_.shuffle(stack.tools), 9) as tool}
									<a
										href={`/cat/${tool.category?._id}?tool=${tool._id}`}
										class="block w-[40px] h-[40px]"
									>
										<img class="logo w-full h-full grayscale" src={tool.logo} />
									</a>
								{/each}
							</div>
						</div>

						<div
							class="relative overflow-hidden w-full sm:w-[278px] sm:aspect-[1.63] max-h-[200px] sm:max-h-auto flex-shrink-0"
						>
							<img
								class="banner object-cover top-0 left-0 grayscale z-1 w-full h-full"
								src={stack.img}
							/>
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.stack-link .logo {
		@apply grayscale transition;
	}

	.stack-link:hover .logo {
		filter: none;
	}

	.stack-link:hover .banner {
		filter: grayscale(0) brightness(0.6);
	}

	.banner {
		filter: grayscale(1) brightness(0.4);
		@apply transition;
	}
</style>
