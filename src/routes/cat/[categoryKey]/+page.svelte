<script>
	import Stack from '$lib/components/Stack.svelte';
	import { page } from '$app/stores';
	import tools from '$lib/data/tools';
	import categories from '$lib/data/categories';

	let category = categories.find((c) => c.key === $page.params.categoryKey);

	$: if ($page.params.categoryKey) {
		category = categories.find((c) => c.key === $page.params.categoryKey);
	}
</script>

<div>
	<Stack
		bind:categoryKey={$page.params.categoryKey}
		selectedTool={$page.url.searchParams.get('tool')}
		{tools}
		{categories}
	/>
</div>
