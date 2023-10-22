import authClientGuard from '$lib/guards/auth.client';

import { get } from '$lib/api';

export async function load({ url, params, session, cookies }) {
	let authData = await authClientGuard({ url, params, session }, 'Build In Public Journal');

	return {
		...authData,
		ogTitle: 'Paralect Stack',
		ogDescription: 'Curated List of No-Code, Low-Code and Full-Code tools',
		ogImage: ''
	};
}
