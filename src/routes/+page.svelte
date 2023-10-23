<script>
	import '../app.css';
	import Stack from '$lib/components/Stack.svelte';
</script>

<div class="bg-zinc-900">
	<div
		class="flex items-center justify-center max-w-[600px] text-center mx-auto mt-8"
		style="min-height: 50vh;"
	>
		<h1 class="text-3xl">
			Discover best startup tools to <a href="cat/landing-page">Launch Websites</a>,
			<a href="cat/customer-communication">Engage Customers</a>,
			<a href="cat/payments">Collect Payments</a> and
			<a href="cat/formation">Manage Companies</a>.
		</h1>
	</div>
</div>

<Stack />

<style>
	a {
		color: yellow;
	}
</style>
