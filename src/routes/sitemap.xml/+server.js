import moment from 'moment';
import allCategories from '$lib/data/allCategories';

let getXml = ({
	sitemap,
	currentDomain
}) => `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${sitemap.rules
	.map(
		(rule) => `<url><loc>https://${currentDomain}${rule.loc}</loc>
<lastmod>${moment(rule.lastmod || '2023-11-11').format('YYYY-MM-DD')}</lastmod>
</url>`
	)
	.join('')}
</urlset>`;

export const GET = async ({ url, params, session, cookies }) => {
	let sitemap = {
		rules: [
			{
				loc: '/',
				lastmod: new Date()
			},
			{
				loc: '/about'
			},
			{
				loc: '/all'
			},
			{
				loc: '/lists/yes-code'
			},
			{
				loc: '/login'
			},
			{
				loc: '/publish'
			},
			{
				loc: '/subscribe'
			},
			...allCategories.map((cat) => ({
				loc: `cat/${cat.key}`,
				lastmod: cat.lastUpdatedOn
			}))
		]
	};
	return new Response(getXml({ sitemap, currentDomain: 'stack.paralect.com' }), {
		headers: {
			'content-type': 'text/xml'
		}
	});
};
