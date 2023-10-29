import categories from '$lib/data/categories';

import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let category = categories.find((c) => c.key === params.categoryKey);

	if (!category) {
		throw redirect(302, '/lists/yes-code');
	}

	return {
		ogTitle:
			category.key === 'all'
				? 'Top Tools To Grow Startups From An Idea To The Exit'
				: `Top ${category.name}${category.noTools ? '' : ' Tools'} — Paralect Stack`,
		ogDescription: category.description
	};
}
