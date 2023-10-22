<script>
	import Stack from '$lib/components/Stack.svelte';
	import { page } from '$app/stores';
</script>

<div>
	<Stack bind:categoryKey={$page.params.categoryKey} />
</div>
