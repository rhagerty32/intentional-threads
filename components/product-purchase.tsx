"use client";

import { useEffect, useState } from "react";
import { useBag } from "@/components/bag-context";
import type { Swatch } from "@/lib/types";

export function ProductPurchase({
  product,
}: {
  product: {
    slug: string;
    name: string;
    price: number;
    image: string;
    imageAlt: string;
    optionLabel: "Color" | "Metal";
    options: Swatch[];
    sizes: string[];
  };
}) {
  const { addItem } = useBag();
  const [color, setColor] = useState(product.options[0]?.name ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(timer);
  }, [added]);

  function onAdd() {
    if (!color) return;
    if (product.sizes.length > 0 && !size) return;
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      imageAlt: product.imageAlt,
      color,
      size: product.sizes.length > 0 ? size : null,
      quantity,
    });
    setAdded(true);
  }

  const sizeLabel = product.optionLabel === "Metal" ? "US size" : "Size";

  return (
    <div className="mt-8">
      <fieldset className="border-0 p-0">
        <legend className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
          {product.optionLabel}
          <span className="ml-3 normal-case tracking-normal text-ink">{color}</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {product.options.map((option) => {
            const selected = option.name === color;
            return (
              <button
                key={option.name}
                type="button"
                aria-pressed={selected}
                aria-label={option.name}
                onClick={() => setColor(option.name)}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${
                  selected ? "ring-1 ring-ink ring-offset-2 ring-offset-bone" : ""
                }`}
              >
                <span
                  className="block h-5 w-5 rounded-full border border-ink/20"
                  style={{ backgroundColor: option.hex }}
                />
              </button>
            );
          })}
        </div>
      </fieldset>

      {product.sizes.length > 0 ? (
        <fieldset className="mt-8 border-0 p-0">
          <legend className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
            {sizeLabel}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((option) => {
              const selected = option === size;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSize(option)}
                  className={`min-h-11 min-w-11 border px-3 text-sm ${
                    selected
                      ? "border-ink bg-ink text-bone"
                      : "border-ink/20 bg-transparent text-ink hover:border-ink"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div className="mt-8">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
          Quantity
        </p>
        <div className="mt-3 inline-flex items-center border border-ink/20">
          <button
            type="button"
            className="h-11 w-11"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          >
            -
          </button>
          <span className="min-w-8 text-center text-sm tabular-nums">{quantity}</span>
          <button
            type="button"
            className="h-11 w-11"
            aria-label="Increase quantity"
            onClick={() => setQuantity((current) => Math.min(10, current + 1))}
          >
            +
          </button>
        </div>
      </div>

      <button type="button" className="btn-primary mt-8 w-full" onClick={onAdd}>
        {added ? "Added" : "Add to bag"}
      </button>
      <p className="sr-only" role="status">
        {added ? `${product.name} added to your bag.` : ""}
      </p>
    </div>
  );
}
