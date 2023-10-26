import categories from '$lib/data/categories';
import stacks from '$lib/data/stacks';
import techCategories from '$lib/data/techCategories';

export async function load({ params }) {
	let category = [...categories, ...techCategories].find((c) => c.key === params.categoryKey);
	let stack = stacks.find((s) => s.key === params.stackId);

	return {
		ogTitle: category ? `${stack.name} Stack — ${category.name}` : `${stack.name} Stack`,
		ogDescription: category.description
	};
}
