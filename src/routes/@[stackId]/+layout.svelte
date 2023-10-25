<script>
	import { page } from '$app/stores';
	import stacks from '$lib/data/stacks';
	import categories from '$lib/data/categories';
	import techCategories from '$lib/data/techCategories';
	import tools from '$lib/data/tools';
	import techTools from '$lib/data/techTools';
	import Stack from '$lib/components/Stack.svelte';

	let stack = stacks.find((s) => s.key === $page.params.stackId);

	let allTools = [...tools, ...techTools];
	let allCategories = [...categories, ...techCategories];

	let stackTools = stack.tools.map((stackTool) => {
		return allTools.find((t) => t.key === stackTool.key);
	});

	let stackCategories = stackTools.map((st) => {
		return allCategories.find((c) => c.key === st.category);
	});

	stackCategories.unshift({
		key: 'all',
		name: 'Full Stack',
		description: `${$page.params.stackId} startup stack`
	});

	let category = allCategories.find((c) => c.key === $page.params.categoryKey);

	$: if ($page.params.categoryKey) {
		category = allCategories.find((c) => c.key === $page.params.categoryKey);
	}
</script>

<Stack
	bind:categories={stackCategories}
	bind:tools={stackTools}
	stackId={$page.params.stackId}
	categoryKey={$page.params.categoryKey}
	selectedTool={$page.url.searchParams.get('tool')}
/>
