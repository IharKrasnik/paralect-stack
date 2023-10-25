import categories from '$lib/data/categories';
import stacks from '$lib/data/stacks';

export async function load({ params }) {
	let category = categories.find((c) => c.key === params.categoryKey);
	let stack = stacks.find((s) => s.key === params.stackId);

	if (!category) {
		return {};
	}

	return {
		ogTitle: `${stack.name} Stack — Top ${category.name}${category.noTools ? '' : ' Tools'}`,
		ogDescription: category.description
	};
}
