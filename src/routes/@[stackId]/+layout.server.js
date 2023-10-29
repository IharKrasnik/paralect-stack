import categories from '$lib/data/categories';
import stacks from '$lib/data/stacks';
import { get } from '$lib/api';

export async function load({ params }) {
	let stack = await get(`stacks/${params.stackId}`);

	return {
		ogTitle: `${stack.name} Startup Stack — Paralect Stack`,
		ogDescription: stack.description,
		ogImage: stack.ogImage,
		stack
	};
}
