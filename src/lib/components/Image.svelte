<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let src;

	let clazz = '';
	export { clazz as class };
	export let onload = () => {};

	let loaded = false;
	let failed = false;
	let loading = false;

	onMount(() => {
		const img = new Image();
		img.src = src;
		loading = true;

		img.onload = () => {
			loading = false;
			loaded = true;
			onload();
		};

		img.onerror = () => {
			loading = false;
			failed = true;
		};
	});
</script>

{#if loaded}
	<img class={clazz} in:fade={{ duration: 150 }} {src} alt="Document" />
{:else if failed}
	failed
	<!-- <img src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg" alt="Not Found" /> -->
{:else if loading}
	<!-- <img src="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif" alt="Loading..." /> -->
{/if}
