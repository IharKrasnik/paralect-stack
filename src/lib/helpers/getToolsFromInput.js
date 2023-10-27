import _ from 'lodash';
import allTools from '$lib/data/allTools';

let variants = [
	{ options: ['tailwind', 'tailwindc', 'tailwindcs'], key: 'tailwindcss' },
	{ options: ['mongo', 'mongod'], key: 'mongodb' }
];

export default (str = '') => {
	let currentTools;

	if (!str.includes(',')) {
		currentTools = [];
		return currentTools;
	}

	let parts = str
		.split(',')
		.map((p) => _.trim(p))
		.filter((p) => !!p);

	if (parts < 2) {
		currentTools = [];
	}

	currentTools = _.uniqBy(
		parts.map(
			(p) => {
				let lowerCase = p.toLowerCase().split(' ').join('');

				_.each(variants, (variant) => {
					if (_.includes(variant.options, lowerCase)) {
						lowerCase = variant.key;
					}
				});

				let tool = allTools.find((t) => t.key === lowerCase);

				if (!tool) {
					return {
						key: null,
						name: p
					};
				} else {
					return tool;
				}
			},
			(t) => t.key
		)
	);

	return currentTools;
};
