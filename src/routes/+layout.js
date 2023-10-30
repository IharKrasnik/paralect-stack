import authClientGuard from '$lib/guards/auth.client';

import { get } from '$lib/api';

export async function load({ url, params, session, cookies }) {
	let authData = await authClientGuard({ url, params, session }, 'Paralect Stack');

	return {
		...authData,
		ogTitle: 'Paralect Stack',
		ogDescription:
			'Curated list of best battle-tested startup tech tools. No-Code and Yes-Code. Only useful tools to grow your startup from an idea to the exit.',
		ogImage:
			'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1698685764387-main_og.png'
	};
}
