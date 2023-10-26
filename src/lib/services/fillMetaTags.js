import { get } from '$lib/api';
import { browser } from '$app/environment';

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		try {
			await callback(array[index], index, array);
		} catch (err) {
			console.log('err', err, array[index]);
		}
	}
}

export default async ({ tools }) => {
	if (browser) {
		console.log('yo');
		await asyncForEach(
			tools.filter((t) => (!t.img && !t.name) || !t.name.includes('Effects')),
			async (t, i) => {
				let metatags = await get(
					'https://ship-627ed08f489a970013572f5d.paralect.net/utils/fetch-meta-tags',
					{
						url: t.url
					}
				);

				t.favicon = metatags.favicon;
				t.img = metatags.image;
				if (!t.description) {
					t.description = metatags.description;
				}

				console.log('t', i, t);
				localStorage['tools'] = JSON.stringify(tools);
			}
		);

		console.log('tools', tools);
	}
};
