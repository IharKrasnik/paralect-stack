<script>
	import { page } from '$app/stores';
	import stacks from '$lib/data/stacks';
	import categories from '$lib/data/categories';
	import tools from '$lib/data/tools';
	import Stack from '$lib/components/Stack.svelte';

	let stack = stacks.find((s) => s.key === $page.params.stackId);

	let stackTools = stack.tools.map((stackTool) => {
		return tools.find((t) => t.key === stackTool.key);
	});

	let stackCategories = stackTools.map((st) => {
		return categories.find((c) => c.key === st.category);
	});

	stackCategories.unshift({
		key: 'all',
		name: 'Full Stack',
		description: `${$page.params.stackId} startup stack`
	});

	let category = categories.find((c) => c.key === $page.params.categoryKey);

	$: if ($page.params.categoryKey) {
		category = categories.find((c) => c.key === $page.params.categoryKey);
	}
</script>

<Stack
	bind:categories={stackCategories}
	bind:tools={stackTools}
	stackId={$page.params.stackId}
	categoryKey={$page.params.categoryKey}
	selectedTool={$page.url.searchParams.get('tool')}
/>
