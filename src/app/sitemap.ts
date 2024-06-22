import type { MetadataRoute } from "next";
import { findSearchPost } from "@/app/search-page/actions";

const BASE_URL = "https://koffy.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const allPost = await findSearchPost("brand", "", "public");

	if (!allPost)
		return [
			{
				url: `${BASE_URL}/coffee-list`,
				lastModified: new Date(),
				priority: 0.5,
			},
			{
				url: `${BASE_URL}/search-page/brand--public`,
				lastModified: new Date(),
				priority: 0.8,
			},
		];

	const posts = allPost.map((post) => ({
		url: `${BASE_URL}/coffee-list/${post.id}`,
		lastModified: new Date(post.updatedAt),
		priority: 0.7,
	}));

	return [
		{
			url: BASE_URL,
			lastModified: new Date().toISOString().split("T")[0],
			priority: 1,
		},
		{
			url: `${BASE_URL}/coffee-list`,
			lastModified: new Date().toISOString().split("T")[0],
			priority: 0.5,
		},
		{
			url: `${BASE_URL}/search-page/brand--public`,
			lastModified: new Date().toISOString().split("T")[0],
			priority: 0.8,
		},
		...posts,
	];
}
