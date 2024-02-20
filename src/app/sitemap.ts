import { MetadataRoute } from "next";

const BASE_URL = 'https://koffy.app'


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	
		return [
			{
				url: BASE_URL,
				lastModified: new Date().toISOString().split("T")[0],
				priority: 1,
			},
			{
				url: `${URL}/coffee-list`,
				lastModified: new Date().toISOString().split("T")[0],
				priority: 0.5,
			},
			{
				url: `${URL}/search-page/brand--public`,
				lastModified: new Date().toISOString().split("T")[0],
				priority: 1,
			},

		];
	}