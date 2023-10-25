import categories from '$lib/data/categories';
import stacks from '$lib/data/stacks';

export async function load({ params }) {
	let category = categories.find((c) => c.key === params.categoryKey);
	let stack = stacks.find((s) => s.key === params.stackId);

	return {
		ogTitle: `${stack.name} Startup Stack — Paralect Stack`,
		ogDescription: stack.description
	};
}
