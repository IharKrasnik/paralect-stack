import categories from '$lib/data/categories';

export async function load({ params }) {
	let category = categories.find((c) => c.key === params.categoryKey);

	if (!category) {
		return {};
	}

	return {
		ogTitle: `${params.stackId} Stack — Top ${category.name}${category.noTools ? '' : ' Tools'}`,
		ogDescription: category.description
	};
}
