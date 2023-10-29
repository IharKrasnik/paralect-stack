import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import { get } from '$lib/api';
import StackOgImage from '$lib/components/og/StackOgImage.svelte';

import striptags from 'striptags';

import Inter from '$lib/Inter-Regular.ttf';
import InterBold from '$lib/Inter-Bold.ttf';

const height = 630;
const width = 1200;

function unEntity(str) {
	return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

export const GET = async ({ url }) => {
	const stackSlug = url.searchParams.get('stackSlug') ?? undefined;

	const name = url.searchParams.get('name') ?? undefined;
	const description = url.searchParams.get('description') ?? undefined;

	let componentResult;

	let stack;

	if (stackSlug) {
		stack = await get(`stacks/${stackSlug}`);
	} else {
		stack = {
			name,
			description
		};
	}

	stack.description = striptags(stack.description);

	componentResult = StackOgImage.render({
		stack
	});

	componentResult.html = unEntity(componentResult.html);

	let markup = toReactNode(`${componentResult.html}<style>${componentResult.css.code}</style>`);

	// console.log('componentResult', componentResult.html.replace(/\&amp;/g,'&'));

	const svg = await satori(markup, {
		fonts: [
			{
				name: 'Inter',
				data: Buffer.from(Inter),
				weight: 400,
				style: 'normal'
			},
			{
				name: 'Inter',
				data: Buffer.from(InterBold),
				weight: 700,
				style: 'bold'
			}
		],

		height,
		width
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: width
		}
	});

	const image = resvg.render();

	return new Response(image.asPng(), {
		headers: {
			'content-type': 'image/png'
		}
	});
};
