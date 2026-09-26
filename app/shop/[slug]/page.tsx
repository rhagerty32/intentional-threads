import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { DetailsAccordion } from "@/components/details-accordion";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductSelection } from "@/components/product-selection";
import {
  getCollection,
  getProduct,
  getProducts,
  getRelatedProducts,
  toCard,
} from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";
import { absoluteUrl, formatPrice, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.name,
    description: product.description,
    path: `/shop/${product.slug}`,
    image: `/images/${product.images[0].file}`,
    imageAlt: product.images[0].alt,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const collection = getCollection(product.collection);
  const related = getRelatedProducts(product.slug).map(toCard);
  const productUrl = absoluteUrl(`/shop/${product.slug}`);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        description: product.description,
        sku: product.slug,
        image: product.images.map((image) => absoluteUrl(`/images/${image.file}`)),
        brand: {
          "@type": "Brand",
          name: "Intentional Threads",
        },
        category: product.category,
        offers: {
          "@type": "Offer",
          url: productUrl,
          priceCurrency: "USD",
          price: product.price.toFixed(2),
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Shop",
            item: absoluteUrl("/shop"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: productUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <Container className="py-10 md:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link href="/" className="link-underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/shop" className="link-underline">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <ProductSelection key={product.slug} options={product.options}>
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ProductGallery images={product.images} />
            </div>
            <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            {collection ? (
              <Link
                href={`/collections/${collection.slug}`}
                className="link-underline text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted"
              >
                {collection.name}
              </Link>
            ) : null}
            <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.05] tracking-[-0.01em] md:text-5xl">
              {product.name}
            </h1>
            <span
              className={`mt-5 block h-px w-10 ${
                product.category === "jewelry" ? "bg-gold" : "bg-ink/20"
              }`}
            />
            {product.note ? (
              <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
                {product.note}
              </p>
            ) : null}
            <p className="mt-4 font-serif text-3xl tabular-nums">{formatPrice(product.price)}</p>
            <p className="mt-6 max-w-prose text-[1.05rem] leading-relaxed">{product.description}</p>
            <ProductPurchase
              product={{
                slug: product.slug,
                name: product.name,
                price: product.price,
                optionLabel: product.optionLabel,
                options: product.options,
                sizes: product.sizes,
              }}
            />
            <DetailsAccordion
              details={product.details}
              category={product.category}
              optionLabel={product.optionLabel}
              optionNames={product.options.map((option) => option.name)}
            />
            </div>
          </div>
        </ProductSelection>
      </Container>

      {related.length > 0 && collection ? (
        <section className="border-t border-ink/10 py-16 md:py-24">
          <Container>
            <h2 className="font-serif text-4xl font-medium tracking-[-0.01em]">
              More in {collection.name}
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
              {related.map((item) => (
                <li key={item.slug}>
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
