import { Container } from "@/components/container";
import { ShopBrowser } from "@/components/shop-browser";
import { getCollections, getProducts, toCard } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Shop",
  description:
    "Sweatshirts, tees, rings, necklaces, bracelets, and earrings from Intentional Threads.",
  path: "/shop",
});

export default function ShopPage() {
  const products = getProducts().map(toCard);
  const collections = getCollections().map(({ slug, name }) => ({ slug, name }));

  return (
    <Container className="py-14 md:py-20">
      <header className="max-w-2xl">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
          The shop
        </p>
        <h1 className="mt-4 font-serif text-5xl font-medium tracking-[-0.01em] md:text-7xl">
          All pieces
        </h1>
        <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed">
          Sweatshirts, tees, rings, necklaces, bracelets, and earrings.
        </p>
      </header>
      <div className="mt-12">
        <ShopBrowser products={products} collections={collections} />
      </div>
    </Container>
  );
}
