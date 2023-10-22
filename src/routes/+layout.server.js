import authServerGuard from '$lib/guards/auth.server';

export async function load({ url, params, session, cookies }) {
	let authData = await authServerGuard({ url, params, session, cookies }, 'Paralect Stack');

	return {
		...authData,
		ogTitle: 'Paralect Stack',
		ogDescription: 'Curated List of No-Code, Low-Code and Full-Code tools',
		ogImage: ''
	};
}
