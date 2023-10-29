import categories from '$lib/data/categories';
import stacks from '$lib/data/stacks';
import { get } from '$lib/api';
import { WEB_URL } from '$lib/env';

export async function load({ params }) {
	let stack = await get(`stacks/${params.stackId}`);

	return {
		ogTitle: `${stack.name} Startup Stack — Paralect Stack`,
		ogDescription: stack.description,
		ogImage:
			stack.ogImage ||
			`${WEB_URL}/stack-og.png?name=${encodeURIComponent(
				stack.name
			)}&description=${encodeURIComponent(stack.description)}&logo=${encodeURIComponent(
				stack.logo
			)}`,
		stack
	};
}
