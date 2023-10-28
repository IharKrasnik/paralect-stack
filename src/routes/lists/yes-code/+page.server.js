import categories from '$lib/data/categories';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let category = categories.find((c) => c.key === params.categoryKey);

	if (!category) {
		return {};
	}

	return {
		ogTitle: 'Paralect Stack',
		ogDescription: `We need your help! Let's create the most decent tech tools directory. Submit your stack!`,
		ogImage:
			'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1698513320603-help_stack.png'
	};
}
