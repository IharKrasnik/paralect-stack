<script>
	import _ from 'lodash';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import stacks from '$lib/data/stacks';
	import allCategories from '$lib/data/allCategories';
	import allTools from '$lib/data/allTools';

	import Stack from '$lib/components/Stack.svelte';

	let stack = stacks.find((s) => s.key === $page.params.stackId) || $page.data.stack;

	let stackTools = stack.tools.map((stackTool) => {
		let tool = allTools.find((t) => t.key === (stackTool.key || stackTool._id));

		if (!tool) {
			return stackTool;
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
	{stack}
	categoryKey={$page.params.categoryKey}
	selectedTool={$page.url.searchParams.get('tool')}
/>
