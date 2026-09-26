"use client";

import Image from "next/image";
import { useState } from "react";
import type { CatalogImage } from "@/lib/types";

export function ProductGallery({ images }: { images: CatalogImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[4/5] border border-ink/10 bg-bone">
        <Image
          src={`/images/${current.file}`}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-contain p-4 sm:p-8"
        />
      </div>
      {images.length > 1 ? (
        <ul className="mt-3 flex gap-3">
          {images.map((image, index) => {
            const selected = index === active;
            return (
              <li key={image.file}>
                <button
                  type="button"
                  aria-label={`Show image ${index + 1} of ${images.length}`}
                  aria-pressed={selected}
                  onClick={() => setActive(index)}
                  className={`relative aspect-[4/5] w-16 border bg-bone sm:w-20 ${
                    selected ? "border-ink" : "border-ink/15"
                  }`}
                >
                  <Image
                    src={`/images/${image.file}`}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
