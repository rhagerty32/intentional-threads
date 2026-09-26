import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { ProductCard } from "@/components/product-card";
import {
  collectionAccent,
  getCollection,
  getCollections,
  getProductsByCollection,
  toCard,
} from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getCollections().map((collection) => ({ slug: collection.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return buildMetadata({
    title: collection.name,
    description: collection.description,
    path: `/collections/${collection.slug}`,
    image: `/images/${collection.banner}`,
    imageAlt: collection.bannerAlt,
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const products = getProductsByCollection(collection.slug).map(toCard);

  return (
    <>
      <div className="relative aspect-video max-h-[640px] w-full">
        <Image
          src={`/images/${collection.banner}`}
          alt={collection.bannerAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <Container className="relative pb-20 md:pb-28">
        <div className="-mt-16 max-w-2xl bg-bone pt-8 sm:-mt-24 sm:pt-10">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-x-2">
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
                {collection.name}
              </li>
            </ol>
          </nav>
          <p className="mt-8 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
            Collection
          </p>
          <h1 className="mt-4 font-serif text-5xl font-medium leading-[0.95] tracking-[-0.01em] md:text-7xl">
            {collection.name}
          </h1>
          <span
            className={`mt-6 block h-px w-10 ${collectionAccent(collection.slug)}`}
            aria-hidden="true"
          />
          <p className="mt-6 font-serif text-2xl italic leading-snug md:text-3xl">
            {collection.tagline}
          </p>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed">{collection.description}</p>
          <p className="mt-6 text-sm text-muted">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {products.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
