import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://qr-universe.vercel.app";

  const routes = [
    "/",
    "/studio",
    "/features",
    "/templates",
    "/analytics",
    "/faq",
    "/about",
    "/donate",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/"
      ? ("weekly" as const)
      : ("monthly" as const),
    priority: route === "/" ? 1 : 0.8,
  }));
}
