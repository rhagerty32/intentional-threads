"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { CardProduct } from "@/lib/types";

type CollectionOption = { slug: string; name: string };
type CategoryFilter = "all" | "apparel" | "jewelry";

const categories: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "apparel", label: "Apparel" },
  { id: "jewelry", label: "Jewelry" },
];

export function ShopBrowser({
  products,
  collections,
}: {
  products: CardProduct[];
  collections: CollectionOption[];
}) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [collection, setCollection] = useState("all");

  const visible = useMemo(
    () =>
      products.filter((product) => {
        if (category !== "all" && product.category !== category) return false;
        if (collection !== "all" && product.collection !== collection) return false;
        return true;
      }),
    [products, category, collection],
  );

  return (
    <div>
      <div className="flex flex-col gap-8 border-b border-ink/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <fieldset className="min-w-0 border-0 p-0">
          <legend className="sr-only">Category</legend>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {categories.map((item) => {
              const active = category === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(item.id)}
                  className={`min-h-11 text-sm ${
                    active
                      ? "text-ink underline decoration-1 underline-offset-8"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </fieldset>
        <fieldset className="min-w-0 border-0 p-0">
          <legend className="sr-only">Collection</legend>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <button
              type="button"
              aria-pressed={collection === "all"}
              onClick={() => setCollection("all")}
              className={`min-h-11 text-sm ${
                collection === "all"
                  ? "text-ink underline decoration-1 underline-offset-8"
                  : "text-muted hover:text-ink"
              }`}
            >
              All collections
            </button>
            {collections.map((item) => {
              const active = collection === item.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCollection(item.slug)}
                  className={`min-h-11 text-sm ${
                    active
                      ? "text-ink underline decoration-1 underline-offset-8"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <p className="mt-8 text-sm text-muted" aria-live="polite">
        {visible.length} {visible.length === 1 ? "piece" : "pieces"}
      </p>

      {visible.length === 0 ? (
        <div className="py-24">
          <p className="font-serif text-4xl">Nothing in this combination.</p>
          <p className="mt-3 text-muted">Try another filter.</p>
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {visible.map((product, index) => (
            <li key={product.slug}>
              <ProductCard product={product} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
