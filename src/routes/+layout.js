import authClientGuard from '$lib/guards/auth.client';

import { get } from '$lib/api';

export async function load({ url, params, session, cookies }) {
	let authData = await authClientGuard({ url, params, session }, 'Build In Public Journal');

	return {
		...authData,
		ogTitle: 'Paralect Stack',
		ogDescription:
			'Curated list of startup tools (No-Code and Full Code) from landing page and user acquisition to company exit.',
		ogImage:
			'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1698066749325-telegram-cloud-photo-size-2-5312258333765389946-y.jpg'
	};
}
