import type { Metadata } from "next";
import { absoluteUrl, siteName, siteUrl } from "@/lib/site";
import { editorial } from "@/lib/copy";

type MetaInput = {
  title?: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  image = `/images/${editorial.hero.file}`,
  imageAlt = editorial.hero.alt,
}: MetaInput): Metadata {
  const fullTitle = title ? `${title} · ${siteName}` : siteName;
  const imageUrl = absoluteUrl(image);

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: new URL(path, siteUrl).toString(),
      siteName,
      locale: "en_US",
      type: "website",
      images: [{ url: imageUrl, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}
