<script>
	import _ from 'lodash';
	import { page } from '$app/stores';
	import stacks from '$lib/data/stacks';
	import categories from '$lib/data/categories';
	import techCategories from '$lib/data/techCategories';
	import tools from '$lib/data/tools';
	import techTools from '$lib/data/techTools';
	import Stack from '$lib/components/Stack.svelte';

	let stack = stacks.find((s) => s.key === $page.params.stackId) || $page.data.stack;

	let allTools = [...tools, ...techTools];
	let allCategories = [...categories, ...techCategories];

	let stackTools = stack.tools.map((stackTool) => {
		let tool = allTools.find((t) => t.key === stackTool.key);

		if (!tool) {
			return {
				id: null,
				name: stackTool.name
			};
			// throw new Error('Not found tool ' + stackTool.key);
		}

		return tool;
	});

	let stackCategories = _.uniqBy(stackTools, (t) => t.category).map((st) => {
		let category = allCategories.find((c) => c.key === st.category);

		if (!category) {
			return {
				id: null,
				name: 'unknown'
			};

			// throw new Error('Not found category ' + st.key);
		}
		return category;
	});

	let activeCategory = allCategories.find((c) => c.key === $page.params.categoryKey || 'all');

	$: activeCategory =
		allCategories.find((c) => c.key === $page.params.categoryKey || 'all') || allCategories[0];

	stackCategories.unshift({
		key: 'all',
		name: 'Complete Stack',
		description: `All Tools`,
		noTools: true
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
