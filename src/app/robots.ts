import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/create-card",
    },
    sitemap: "https://koffy.app/sitemap.xml",
  };
}
