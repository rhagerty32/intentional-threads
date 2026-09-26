import type { MetadataRoute } from "next";
import { getCollections, getProducts } from "@/lib/catalog";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-26");
  const staticRoutes = ["", "/shop", "/mission"].map((path) => ({
    url: new URL(path || "/", siteUrl).toString(),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const collectionRoutes = getCollections().map((collection) => ({
    url: new URL(`/collections/${collection.slug}`, siteUrl).toString(),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productRoutes = getProducts().map((product) => ({
    url: new URL(`/shop/${product.slug}`, siteUrl).toString(),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
