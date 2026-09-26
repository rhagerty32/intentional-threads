import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { BagProvider } from "@/components/bag-context";
import { BagDrawer } from "@/components/bag-drawer";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { editorial } from "@/lib/copy";
import { getCollections } from "@/lib/catalog";
import { siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const dynamic = "error";

export const viewport: Viewport = {
  themeColor: "#F5F0E8",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: "Heavyweight sweatshirts and everyday jewelry. Made on purpose.",
  applicationName: siteName,
  openGraph: {
    title: siteName,
    description: "Heavyweight sweatshirts and everyday jewelry. Made on purpose.",
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `/images/${editorial.hero.file}`,
        alt: editorial.hero.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      slogan: "Made on purpose.",
      description: "Heavyweight sweatshirts and everyday jewelry. Made on purpose.",
    },
    {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      description: "Heavyweight sweatshirts and everyday jewelry. Made on purpose.",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const collections = getCollections().map(({ slug, name }) => ({ slug, name }));

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-bone text-ink">
        <JsonLd data={structuredData} />
        <BagProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SiteHeader collections={collections} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <BagDrawer />
        </BagProvider>
      </body>
    </html>
  );
}
