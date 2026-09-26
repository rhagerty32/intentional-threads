import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { NewsletterForm } from "@/components/newsletter-form";
import { PrimaryLink, TextLink } from "@/components/links";
import { ProductCard } from "@/components/product-card";
import { collectionAccent, getCollections, getFeaturedProducts, toCard } from "@/lib/catalog";
import { editorial, homeCopy, values } from "@/lib/copy";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  description:
    "Heavyweight sweatshirts and everyday jewelry from Intentional Threads. Made on purpose.",
  path: "/",
  image: `/images/${editorial.hero.file}`,
  imageAlt: editorial.hero.alt,
});

export default function HomePage() {
  const collections = getCollections();
  const featured = getFeaturedProducts().map(toCard);

  return (
    <>
      <section className="relative flex min-h-[calc(100svh-var(--header-h))] items-end">
        <Image
          src={`/images/${editorial.hero.file}`}
          alt={editorial.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative z-10 m-3 mb-4 max-w-2xl bg-bone px-5 py-8 sm:m-8 sm:px-10 sm:py-12 lg:m-12 lg:px-12">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
            {homeCopy.heroEyebrow}
          </p>
          <h1 className="mt-4 font-serif text-[3.25rem] font-medium leading-[0.9] tracking-[-0.02em] sm:text-7xl lg:text-[6.25rem]">
            Made
            <span className="mt-1 block italic">on purpose.</span>
          </h1>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed">{homeCopy.heroBody}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <PrimaryLink href="/collections/first-light">Shop the collection</PrimaryLink>
            <TextLink href="/mission">Read the manifesto</TextLink>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
            {homeCopy.collectionsEyebrow}
          </p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-xl font-serif text-4xl font-medium tracking-[-0.01em] md:text-5xl">
              {homeCopy.collectionsTitle}
            </h2>
            <p className="max-w-md text-[1.05rem] leading-relaxed lg:text-right">
              {homeCopy.collectionsBody}
            </p>
          </div>
          <ul className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
            {collections.map((collection) => (
              <li key={collection.slug}>
                <Link href={`/collections/${collection.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-oat">
                    <Image
                      src={`/images/${collection.banner}`}
                      alt={collection.bannerAlt}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
                    />
                  </div>
                  <span
                    className={`mt-5 block h-px w-8 ${collectionAccent(collection.slug)}`}
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-serif text-3xl leading-tight underline decoration-transparent underline-offset-[6px] group-hover:decoration-ink">
                    {collection.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{collection.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-ink/10 py-20 md:py-28">
        <Container>
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
            {homeCopy.featuredEyebrow}
          </p>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-xl font-serif text-4xl font-medium tracking-[-0.01em] md:text-5xl">
              {homeCopy.featuredTitle}
            </h2>
            <p className="max-w-sm text-[1.05rem] leading-relaxed">{homeCopy.featuredBody}</p>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-3 lg:gap-x-8">
            {featured.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <TextLink href="/shop">Shop all pieces</TextLink>
          </div>
        </Container>
      </section>

      <section className="bg-oat py-20 md:py-28">
        <Container>
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
            {homeCopy.materialsEyebrow}
          </p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl font-medium tracking-[-0.01em] md:text-5xl">
            {homeCopy.materialsTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed">{homeCopy.materialsBody}</p>
          <ul className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-0">
            {homeCopy.materialsFacts.map((fact, index) => (
              <li
                key={fact.title}
                className={`sm:px-8 ${index === 0 ? "sm:pl-0" : ""} ${
                  index > 0 ? "border-t border-ink/10 pt-8 sm:border-t-0 sm:border-l sm:pt-0" : ""
                }`}
              >
                <h3 className="font-serif text-3xl">{fact.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{fact.detail}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[640px]">
          <Image
            src={`/images/${editorial.walk.file}`}
            alt={editorial.walk.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center bg-bone px-5 py-16 sm:px-10 lg:px-16">
          <div className="max-w-md">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
              {homeCopy.manifestoEyebrow}
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.05] tracking-[-0.01em] md:text-5xl">
              {homeCopy.manifestoTitle}
            </h2>
            <p className="mt-6 font-serif text-2xl italic leading-snug">{homeCopy.manifestoBody}</p>
            <div className="mt-8">
              <TextLink href="/mission">Read the manifesto</TextLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 py-20 md:py-28">
        <Container>
          <h2 className="font-serif text-4xl font-medium tracking-[-0.01em] md:text-5xl">Values</h2>
          <ol className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <li key={value.title}>
                <p className="font-serif text-3xl italic text-muted">0{index + 1}</p>
                <h3 className="mt-4 font-serif text-[1.75rem] leading-tight">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{value.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-oat py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-xl">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
              {homeCopy.newsletterEyebrow}
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.01em] md:text-5xl">
              {homeCopy.newsletterTitle}
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed">{homeCopy.newsletterBody}</p>
            <div className="mt-8">
              <NewsletterForm finePrint={homeCopy.newsletterFine} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
