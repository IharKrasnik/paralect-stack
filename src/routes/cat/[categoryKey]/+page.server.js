import categories from '$lib/data/categories';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let category = categories.find((c) => c.key === params.categoryKey);

	if (!category) {
		return {};
	}

	return {
		ogTitle: `Top ${category.name}${category.noTools ? '' : ' Tools'} — Paralect Stack`,
		ogDescription: category.description
	};
}
