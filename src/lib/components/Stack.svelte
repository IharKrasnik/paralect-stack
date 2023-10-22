<script>
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
			key: 'product-management',
			name: 'Product Management'
		},
		{
			key: 'calendar',
			name: 'Calendar'
		},
		{
			key: 'communication',
			name: 'Customer Communications'
		},
		{
			key: 'testimonials',
			name: 'Testimonials'
		},
		{
			key: 'analytics',
			name: 'Analytics'
		},
		{
			key: 'emails',
			name: 'Emails'
		},

		{
			key: 'automation',
			name: 'Automation'
		},
		{
			key: 'payments',
			name: 'Payments'
		},
		{
			key: 'crm',
			name: 'CRM'
		},
		{
			key: 'legal',
			name: 'Formation & Legal'
		},
		{
			key: 'design',
			name: 'Design'
		}
	];

	let activeCategory = categories.find((c) => c.key === categoryKey) || categories[0];

	$: if (categoryKey) {
		activeCategory = categories.find((c) => c.key === categoryKey) || categories[0];
	}

	let tools = [
		{
			category: 'landing-page',
			url: 'https://webflow.com',
			key: 'webflow',
			name: 'Webflow',
			description: 'Powerful website builder for marketing teams',
			img: 'https://assets-global.website-files.com/6515a6d5f30daec433d0abe2/651c796fcc43bbae9ae1c137_og-default.jpg'
		},
		{
			category: 'landing-page',
			url: 'https://www.framer.com',
			key: 'framer',
			name: 'Framer',
			description: 'Create beautiful animated websites fast',
			img: 'https://framerusercontent.com/images/2jcKVnNogkCVvxm6pdLJ37qk7w.jpg'
		},
		{
			category: 'landing-page',
			url: 'https://page.mmntm.build',
			key: 'momentum-page',
			name: 'Momentum Page',
			description: 'Super simple editor with built-in email capture and analytics',
			img: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1691926283375-telegram-cloud-document-2-5386494382004252533.jpg'
		},
		{
			category: 'forms-data',
			url: 'https://tally.so',
			key: 'tally',
			name: 'Tally Forms',
			description: 'Simple form editor in Notion style with generous free tier',
			img: 'https://tally.so/images/og.jpg'
		}
	];
</script>

<div class="flex">
	<div class="mt-8 p-4 section flex-shrink-0 mr-8">
		{#each categories as category}
			<a href="/cat/{category.key}" class="block pb-4 text-lg">
				{category.name}
			</a>
		{/each}
	</div>

	<div>
		<div class="mt-8">
			<h1>{activeCategory.name}</h1>
			<h2>{activeCategory.description}</h2>
		</div>

		{#key categoryKey}
			<div
				class="grid grid-cols-1 sm:grid-cols-3 mt-8 items-start gap-4"
				in:fly={{ duration: 150, y: -50 }}
			>
				{#each tools.filter((t) => t.category === activeCategory.key) as tool}
					<div class="section">
						<img src={tool.img} />
						<div class="p-4">
							<h3 class="font-bold">
								{tool.name}
							</h3>

							<div class="mt-2">{tool.description}</div>
						</div>
					</div>
				{/each}
			</div>
		{/key}
	</div>
</div>
