import { MetadataRoute } from "next";
import { findSearchPost } from "@/app/search-page/actions";

const BASE_URL = 'https://koffy.app'


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

	const allPost = await findSearchPost('brand', '', 'public');

	if (!allPost) return [
		{
			url: `${URL}/coffee-list`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5,
		},
		{
			url: `${URL}/search-page/brand--public`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		}
	];

		const posts = allPost.map((post) => ({
			url: `${BASE_URL}/${post.id}`,
			lastModified: new Date(post.updatedAt),
			priority: 0.7,
		}));
	
		return [
			{
				url: BASE_URL,
				lastModified: new Date(),
				priority: 1,
			},
			{
				url: `${URL}/coffee-list`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 0.5,
			},
			{
				url: `${URL}/search-page/brand--public`,
				lastModified: new Date(),
				changeFrequency: 'weekly',
				priority: 1,
			},
			...posts,
		];
	}




// export default function sitemap(): MetadataRoute.Sitemap {
//   return [
//     {
//       url: 'https://acme.com',
//       lastModified: new Date(),
//       changeFrequency: 'yearly',
//       priority: 1,
//     },
//     {
//       url: 'https://acme.com/about',
//       lastModified: new Date(),
//       changeFrequency: 'monthly',
//       priority: 0.8,
//     },
//     {
//       url: 'https://acme.com/blog',
//       lastModified: new Date(),
//       changeFrequency: 'weekly',
//       priority: 0.5,
//     },
//   ]
// }