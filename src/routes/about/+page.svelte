<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import tools from '$lib/data/tools';

	let isShown;

	onMount(() => {
		isShown = true;
	});
</script>

{#if isShown}
	<div class="mt-4 max-w-[700px] p-4 mx-auto" in:fade={{ duration: 150 }}>
		<h1>Paralect Startup Stack</h1>

		<h2 class="white mt-2">
			Stack is an opinionated list of {tools.length} battle-tested tools, platforms and resources for
			startup growth.
		</h2>

		<h2 class="white mt-8 mb-2">We use Stack to build startups. You can too.</h2>

		<div class="text-lg opacity-80">
			We've built 30+ startups and prototyped 100+ mvps during 14 years in <a
				href="https://paralect.com">Paralect</a
			>. As we launch a new startup every few months we learn pros and cons of each tool, so we can
			advice our clients which tool is the best for the problem at hand.
		</div>

		<h2 class="white mt-8 mb-2">Stack guides you from an idea to the exit.</h2>

		<div class="text-lg opacity-80">
			We manually curate tools to ensure that all primary startup categories are covered. The goal
			is to help you discover the common startup challenges and help you solve them, the modern way.
		</div>

		<h2 class="white mt-8 mb-2">Stack is reliable, yet made of cutting-edge tools.</h2>

		<div class="opacity-80 text-lg">
			There are so many shiny tools around. It's easy to trap into shiny-object syndrome. Don't
			waste time on it, leave it for the nerds like us. We'll keep you away of obscure tools, but
			will help you discover the best modern tools for modern problems.
		</div>

		<h2 class="white mt-8 mb-2">Smaller stack is a better stack.</h2>

		<div class="text-lg opacity-80">
			We'll keep the list concise. But we'll include the alternatives to the huge well-known tools,
			so you can choose yourself.
		</div>

		<!-- <div class="text-lg mt-4">Reliable, widespread, cutting-edge.</div> -->
	</div>
{/if}
