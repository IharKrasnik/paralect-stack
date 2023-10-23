<script>
	import '../app.css';
	import _ from 'lodash';
	import tools from '$lib/data/tools';
	import { fade } from 'svelte/transition';

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
		'airtable',
		'posthog',
		'beehiiv',
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
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			middleRightIcons[0],
			middleLeftIcons[1],
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
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
	}, 100);

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
</script>

<svelte:window bind:scrollY />

<div class="relative flex items-center bg-zinc-900 overflow-hidden my-8" style="height: 480px">
	<div class="flex items-center w-[80%] mx-auto" style="height: 240px">
		<div class="flex justify-center items-center max-w-[600px] text-center mx-auto z-10 h-full">
			<h1 class="text-3xl" style="text-shadow: 1px 1px #fffc65">
				Discover best startup tools to <a href="cat/landing-page">Launch Websites</a>,
				<a href="cat/customer-communication">Engage Customers</a>,
				<a href="cat/payments">Collect Payments</a> and
				<a href="cat/formation">Manage Companies</a>.
			</h1>
		</div>
	</div>

	{#key updatedOn}
		<div class="absolute top-0 left-0 grid grid-cols-10 w-full h-full z-0" in:fade>
			{#each icons as icon}
				<div>
					{#if icon.name}
						<a href="cat/{icon.category}">
							<img
								class="shrink-0 aspect-square grayscale hover:grayscale-0 hover:opacity-100 cursor-pointer transition opacity-40"
								src="/products/{icon.name}.png"
							/>
						</a>
					{/if}
				</div>
			{/each}
		</div>
	{/key}
</div>

<Stack />

<style>
	a {
		color: yellow;
		text-shadow: none;
	}
</style>
