<script>
	import tools from '$lib/data/tools';
	import { browser } from '$app/environment';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { get } from '$lib/api';

	export let categoryKey = 'landing-page';
	import currentUser, { isLoading as isCurrentUserLoading } from '$lib/stores/currentUser';

	let categories = [
		{
			key: 'landing-page',
			name: 'Landing Page',
			description: 'Tools to build marketing websites'
		},
		{
			key: 'forms-data',
			name: 'Forms & Data',
			description: 'Collect data from your leads and customers'
		},
		{
			key: 'blog-newsletter-emails',
			name: 'Blogs & Newsletters'
		},
		{
			key: 'product-management',
			name: 'Product Management'
		},
		{
			key: 'customer-communication',
			name: 'Customer Communications'
		},
		{
			key: 'payments',
			name: 'Payments'
		},
		{
			key: 'crm',
			name: 'CRM and Sales Tools'
		},
		{
			key: 'design',
			name: 'Design & Creator tools'
		},
		{
			key: 'automation',
			name: 'Automation'
		},
		{
			key: 'low-code',
			name: 'Low-Code App Builders'
		},
		{
			key: 'seo',
			name: 'SEO'
		},
		{
			key: 'smm',
			name: 'SMM'
		},
		{
			key: 'analytics',
			name: 'Analytics'
		},

		{
			key: 'formation',
			name: 'Formation & Legal'
		},
		{
			key: 'startup-community',
			name: 'Startup Communities'
		}
	];

	let activeCategory = categories.find((c) => c.key === categoryKey) || categories[0];

	$: if (categoryKey) {
		activeCategory = categories.find((c) => c.key === categoryKey) || categories[0];
	}
</script>

<div class="flex mb-8 items-start">
	<div class="mt-8 p-4 section flex-shrink-0 mr-8">
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

	<div>
		<div class="mt-8">
			<h1>{activeCategory.name}</h1>
			<h2>{activeCategory.description || ''}</h2>
		</div>

		{#key categoryKey}
			<div
				class="grid grid-cols-1 sm:grid-cols-3 mt-8 items-start gap-4"
				in:fly={{ duration: 150, y: -50 }}
			>
				{#each tools.filter((t) => t.category === activeCategory.key) as tool}
					<div class="section min-w-full aspect-[1200/630]">
						<img src={tool.img} class="w-full aspect-[1200/630] object-cover" />
						<div class="p-4">
							<h3 class="font-bold">
								{tool.name}
							</h3>

							<div class="mt-2 opacity-80">{tool.description}</div>
						</div>
					</div>
				{/each}
			</div>
		{/key}
	</div>
</div>

<style>
	.nav-link {
		@apply transition;
	}

	.nav-link:hover {
		color: #fff400;
	}

	.active {
		color: #fff400;
		@apply font-bold;
	}
</style>
