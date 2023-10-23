<script>
	import Stack from '$lib/components/Stack.svelte';
	import { page } from '$app/stores';
	import categories from '$lib/data/categories';

	let category = categories.find((c) => c.key === $page.params.categoryKey);

	$: if ($page.params.categoryKey) {
		category = categories.find((c) => c.key === $page.params.categoryKey);
	}
</script>

<div>
	<Stack bind:categoryKey={$page.params.categoryKey} />
</div>

<!-- <svelte:head>
	<title>Top {category.name}{category.noTools ? '' : ' Tools'} — Paralect Stack</title>
	<meta name="description" content={category.description} />
	<meta name="og:description" content={category.description} />

	<meta name="twitter:title" content={$page.data.ogTitle} />
	<meta name="twitter:description" content={$page.data.ogDescription} />
</svelte:head> -->
