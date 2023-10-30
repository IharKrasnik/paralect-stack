<script>
	import { onMount } from 'svelte';
	import currentUser, { isLoading as isUserLoading } from '$lib/stores/currentUser';
	import LoginButton from '$lib/components/LoginButton.svelte';
	import RenderUrl from '$lib/components/RenderUrl.svelte';
</script>

<div class="max-w-[700px] mx-auto p-4 mt-8">
	<h1>Subscribe to Paralect Stack</h1>

	<h2 class="mt-2">
		Get useful practical content on startup growth based on Paralect first-hand experience.
	</h2>

	{#if !$isUserLoading}
		<div class="mt-8">
			{#if $currentUser}
				<h1>
					Hey, {$currentUser.fullName.split(' ')[0]} 👋
				</h1>
				<h2 class="mt-4">Thank you for subscribing to Stack</h2>
			{:else}
				<LoginButton />
			{/if}
		</div>
	{/if}

	<h2 class="mt-16 mb-8">Here are some examples of our startup content</h2>
	<div class="grid gap-4 sm:grid-cols-2">
		<div>
			<a
				href="https://twitter.com/that_igor_/status/1668197257676455937"
				target="_blank"
				class="block gscale"
			>
				<h3>Checklist to hire badass CTO</h3>
				<!-- <img
					class="mt-2"
					src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1698692164853-image.png"
				/> -->
			</a>
			<a
				href="https://growing-products.paralect.com/all-stories/the-first-year-on-a-product-that-became-a-unicorn-in-7-years"
				target="_blank"
				class="block mt-4"
			>
				<h3>The first year on a product that became a unicorn in 7 years</h3>
			</a>
			<a
				class="block mt-4"
				target="_blank"
				href="https://www.indiehackers.com/post/how-to-prepare-producthunt-launch-we-ve-got-1-000-upvotes-and-8k-views-09e934545d"
			>
				<h3>How to prepare your ProductHunt launch to get the #1</h3>
				<a
					href="https://growing-products.paralect.com/all-stories/how-to-build-a-product-in-7-weeks-the-story-of-listedkit-launch"
				/>
			</a>
			<a
				href="https://growing-products.paralect.com/product-validation-case-study-3-ideas-1-outcome"
				target="_blank"
				class="block mt-4"
			>
				<h3>Product validation case study: 3 ideas, 1 outcome</h3>
			</a>

			<a
				href="https://growing-products.paralect.com/a-development-process-startup-founders-should-use-to-ship-features-weirdly-fast"
				target="_blank"
				class="block mt-4"
			>
				<h3>A development process startup founders should use to ship features weirdly fast</h3>

				<a
					href="https://growing-products.paralect.com/all-stories/how-to-build-a-product-in-7-weeks-the-story-of-listedkit-launch"
				/>
			</a>
		</div>

		<div>
			<div>
				<div class="gscale">
					<RenderUrl
						url="https://www.youtube.com/watch?v=NauTH24nH6M&t=166s&ab_channel=IgorKrasnik"
					/>
				</div>

				<div class="gscale mt-4">
					<RenderUrl
						url="https://www.youtube.com/watch?v=X6xQO7-Ug2A&pp=ygUneW91ciBzdGFydHVwIGlzIGEgbWVkaWEgY29tcGFueSBrcmFzbmlr"
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	a:hover {
		color: rgb(255, 244, 123);
	}
</style>
