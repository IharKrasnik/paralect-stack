<script>
	import '../app.css';
	import _ from 'lodash';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import isImagesLoaded from '$lib/stores/isImagesLoaded';
	import categories from '$lib/data/categories';
	import tools from '$lib/data/tools';
	import { fade, fly } from 'svelte/transition';
	import isMobile from '$lib/helpers/isMobile';
	import Stack from '$lib/components/Stack.svelte';
	import Image from '$lib/components/Image.svelte';

	let icons = _.shuffle([
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
		'retool',

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

	let startIcons = _.take(icons, 10);
	let endIcons = _.takeRight(icons, 10);

	let middleLeftIcons = [icons[10], icons[11]];
	let middleRightIcons = [icons[12], icons[13]];

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
				category: icon && tools.find((t) => t.key === icon.replace('_', '-')).category,
				isHighlighted: false
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

	let isLoaded = true;

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

	let highlightOrder = [..._.range(1, 11), 20, 30, ..._.range(40, 29), 21, 11];

	let cycle = () => {
		_.shuffle(highlightOrder).forEach((iconNum, i) => {
			let icon = icons[iconNum - 1];

			setTimeout(() => {
				icons = icons.map((ic) => {
					if (ic.name === icon.name) {
						return {
							...ic,
							isHighlighted: true
						};
					}
					return ic;
				});

				// setTimeout(() => {
				// 	icons = icons.map((ic) => {
				// 		if (ic.name === icon.name) {
				// 			return {
				// 				...ic,
				// 				isHighlighted: false
				// 			};
				// 		}
				// 		return ic;
				// 	});

				// 	if (i === highlightOrder.length - 1) {
				// 		$isImagesLoaded = true;
				// 	}
				// }, 1000);
			}, 20 * (i + 1));
		});
	};

	let isFastTransition = false;

	setTimeout(() => {
		icons = icons.map((icon) => {
			return {
				...icon,
				isHighlighted: false
			};
		});

		$isImagesLoaded = true;

		setTimeout(() => {
			isFastTransition = true;
		}, 0);
	}, 1500);

	if (isMobile()) {
		icons = icons.map((i) => ({ ...i, isHighlighted: false }));
		$isImagesLoaded = true;
	} else {
		cycle();
	}
</script>

<svelte:window bind:scrollY />

<div
	class="relative flex items-center bg-zinc-900 overflow-hidden my-8 mt-24 sm:mt-28"
	style="height: 480px"
>
	<div class="flex items-center w-[80%] mx-auto" style="height: 240px">
		<div class="flex justify-center items-center max-w-[600px] text-center mx-auto z-10 h-full">
			<h1
				class="transition text-3xl"
				class:opacity-10={!isLoaded}
				style="text-shadow: 1px 1px #fffc65"
			>
				Discover the best startup tools <span class="transition">
					to <a
						href="cat/landing-page-builders"
						class:white={!$isImagesLoaded}
						on:mouseover={() => setCategory('landing-page-builders')}
						on:mouseleave={() => setCategory(null)}>Launch Websites</a
					>,

					<a
						href="cat/blog-newsletter-emails"
						class:white={!$isImagesLoaded}
						on:mouseover={() => setCategory('blog-newsletter-emails')}
						on:mouseleave={() => setCategory(null)}>Grow Audience</a
					>,
					<a
						href="cat/customer-communication"
						class:white={!$isImagesLoaded}
						on:mouseover={() => setCategory('customer-communication')}
						on:mouseleave={() => setCategory(null)}>Engage Customers</a
					>,
					<a
						href="cat/crm"
						class:white={!$isImagesLoaded}
						on:mouseover={() => setCategory('crm')}
						on:mouseleave={() => setCategory(null)}>Sell</a
					>
					and
					<a
						href="#tools"
						class:white={!$isImagesLoaded}
						on:mouseover={() => setCategory('all')}
						on:mouseleave={() => setCategory(null)}>more</a
					>.
				</span>
			</h1>
		</div>
	</div>

	<div class="grid-cols-5 grid-cols-3" />

	{#key updatedOn}
		<div class="absolute top-0 left-0 grid sm:grid-cols-10 grid-cols-3 w-full h-full z-0" in:fade>
			{#each icons as icon}
				<div>
					{#if icon.name}
						<a href="cat/{icon.category}?tool={icon.name}">
							<div
								class="shrink-0 aspect-square w-[120px] hover:grayscale-0 hover:opacity-100 hover:transition cursor-pointer"
								class:transition={$isImagesLoaded}
								class:slowtransition={!isFastTransition && !icon.isHighlighted}
								class:grayscale={!icon.isHighlighted &&
									activeCategory !== 'all' &&
									activeCategory !== icon.category}
								class:opacity-20={!icon.isHighlighted &&
									activeCategory !== 'all' &&
									activeCategory !== icon.category}
								src="/products/{icon.name}.png"
							>
								<Image src="/products/{icon.name}.png" />
							</div>
						</a>
					{/if}
				</div>
			{/each}
		</div>
	{/key}
</div>

{#if browser && $isImagesLoaded}
	<div in:fly={{ duration: 150 }}>
		<Stack {tools} {categories} />
	</div>
{:else}
	<div class="min-h-screen" />
{/if}

<style>
	a {
		color: yellow;
		@apply transition;
		text-shadow: none;
	}

	a.white {
		color: rgb(255, 244, 123);
	}
</style>
