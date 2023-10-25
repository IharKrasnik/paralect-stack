<script>
	import '../app.css';
	import _ from 'lodash';
	import categories from '$lib/data/categories';
	import tools from '$lib/data/tools';
	import { fade } from 'svelte/transition';
	import isMobile from '$lib/helpers/isMobile';
	import Stack from '$lib/components/Stack.svelte';

	let startIcons = _.shuffle([
		'airtable',
		'apollo',
		'beehiiv',
		'canva',
		'figma',
		'hubspot',
		'intercom',
		'lemonsqueezy',
		'linear',
		'mercury',
		'miro',
		'retool'
	]);

	let endIcons = _.shuffle([
		'senja',
		'slack',
		'stripe_atlas',
		'typeform',
		'videoask',
		'webflow',
		'zapier',
		'mailerlite',
		'posthog',
		'super',
		'notion',
		'semrush'
	]);

	let middleLeftIcons = [startIcons.pop(), startIcons.pop()];
	let middleRightIcons = [endIcons.pop(), endIcons.pop()];

	let icons;

	let createIcons = () => {
		icons = [
			...startIcons,
			middleLeftIcons[0],
			...(isMobile() ? [] : ['', '', '', '', '', '', '', '']),
			middleRightIcons[0],
			middleLeftIcons[1],
			...(isMobile() ? [] : ['', '', '', '', '', '', '', '']),
			middleRightIcons[1],
			...endIcons
		];

		icons = icons.map((icon) => {
			return {
				name: icon,
				category: icon && tools.find((t) => t.key === icon.replace('_', '-')).category
			};
		});
	};

	createIcons();

	let scrollY;

	let move = _.throttle(() => {
		startIcons.unshift(middleLeftIcons[0]);
		endIcons.push(middleRightIcons[1]);
		middleRightIcons[1] = middleRightIcons[0];
		middleRightIcons[0] = startIcons.pop();
		middleLeftIcons[0] = middleLeftIcons[1];
		middleLeftIcons[1] = endIcons.shift();

		createIcons();
	}, 500);

	// setInterval(() => {
	// 	move();
	// }, 500);

	let iconLoaded = (icon) => {
		icon.isLoaded = true;
	};

	let updatedOn = new Date();

	$: if (scrollY && !(scrollY % 40)) {
		updatedOn = new Date();
		move();
	}

	let activeCategory = null;

	let intervalId;

	let setCategory = (cat) => {
		if (!cat && intervalId) {
			clearInterval(intervalId);
		}

		if (cat === 'all') {
			intervalId = setInterval(move, 500);
		}

		activeCategory = cat;
	};
</script>

<svelte:window bind:scrollY />

<div
	class="relative flex items-center bg-zinc-900 overflow-hidden my-8 sm:mt-0 sm:mt-24"
	style="height: 480px"
>
	<div class="flex items-center w-[80%] mx-auto" style="height: 240px">
		<div class="flex justify-center items-center max-w-[600px] text-center mx-auto z-10 h-full">
			<h1 class="text-3xl" style="text-shadow: 1px 1px #fffc65">
				Discover best startup tools to <a
					href="cat/landing-page"
					on:mouseover={() => setCategory('landing-page')}
					on:mouseleave={() => setCategory(null)}>Launch Websites</a
				>,

				<a
					href="cat/blog-newsletter-emails"
					on:mouseover={() => setCategory('blog-newsletter-emails')}
					on:mouseleave={() => setCategory(null)}>Grow Audience</a
				>,
				<a
					href="cat/customer-communication"
					on:mouseover={() => setCategory('customer-communication')}
					on:mouseleave={() => setCategory(null)}>Engage Customers</a
				>,
				<a
					href="cat/crm"
					on:mouseover={() => setCategory('crm')}
					on:mouseleave={() => setCategory(null)}>Sell</a
				>
				and
				<a
					href="#tools"
					on:mouseover={() => setCategory('all')}
					on:mouseleave={() => setCategory(null)}>more</a
				>.
			</h1>
		</div>
	</div>

	{#key updatedOn}
		<div class="absolute top-0 left-0 grid sm:grid-cols-10 grid-cols-4 w-full h-full z-0" in:fade>
			{#each icons as icon}
				<div>
					{#if icon.name}
						<a href="cat/{icon.category}?tool={icon.name}">
							<img
								class="shrink-0 aspect-square w-[120px] grayscale hover:grayscale-0 hover:opacity-100 cursor-pointer transition"
								class:grayscale={activeCategory !== 'all' && activeCategory !== icon.category}
								class:opacity-40={activeCategory !== 'all' && activeCategory !== icon.category}
								src="/products/{icon.name}.png"
							/>
						</a>
					{/if}
				</div>
			{/each}
		</div>
	{/key}
</div>

<Stack {tools} {categories} />

<style>
	a {
		color: yellow;
		text-shadow: none;
	}
</style>
