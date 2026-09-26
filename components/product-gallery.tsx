"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CatalogImage } from "@/lib/types";
import { useProductSelection } from "@/components/product-selection";

function FrameImage({
  file,
  alt,
  visible,
  sizes,
  className,
}: {
  file: string;
  alt: string;
  visible: boolean;
  sizes: string;
  className: string;
}) {
  return (
    <Image
      src={`/images/${file}`}
      alt={visible ? alt : ""}
      fill
      priority
      sizes={sizes}
      className={`${className} ${visible ? "z-10 opacity-100" : "z-0 opacity-0"}`}
    />
  );
}

export function ProductGallery({ images }: { images: CatalogImage[] }) {
  const { options, color, active, setActive } = useProductSelection();
  const extras = images.slice(1);
  const shots = extras.length + 1;
  const rootRef = useRef<HTMLDivElement>(null);
  const optionKey = options.map((option) => option.image).join("|");
  const extraKey = extras.map((image) => image.file).join("|");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const decodeAll = () => {
      root.querySelectorAll("img").forEach((img) => {
        if (img.decode) void img.decode().catch(() => undefined);
      });
    };
    decodeAll();
    root.addEventListener("load", decodeAll, true);
    return () => root.removeEventListener("load", decodeAll, true);
  }, [optionKey, extraKey]);

  return (
    <div ref={rootRef}>
      <div className="relative aspect-video border border-ink/10 bg-bone">
        {options.map((option) => (
          <FrameImage
            key={option.name}
            file={option.image}
            alt={option.imageAlt}
            visible={active === 0 && option.name === color}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-center"
          />
        ))}
        {extras.map((image, index) => (
          <FrameImage
            key={image.file}
            file={image.file}
            alt={image.alt}
            visible={active === index + 1}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-center"
          />
        ))}
      </div>
      {shots > 1 ? (
        <ul className="mt-3 flex gap-3">
          <li>
            <button
              type="button"
              aria-label={`Show image 1 of ${shots}`}
              aria-pressed={active === 0}
              onClick={() => setActive(0)}
              className={`relative aspect-video w-24 border bg-bone sm:w-28 ${
                active === 0 ? "border-ink" : "border-ink/15"
              }`}
            >
              {options.map((option) => (
                <FrameImage
                  key={option.name}
                  file={option.image}
                  alt=""
                  visible={option.name === color}
                  sizes="120px"
                  className="object-cover object-center"
                />
              ))}
            </button>
          </li>
          {extras.map((image, index) => {
            const shot = index + 1;
            const selectedShot = active === shot;
            return (
              <li key={image.file}>
                <button
                  type="button"
                  aria-label={`Show image ${shot + 1} of ${shots}`}
                  aria-pressed={selectedShot}
                  onClick={() => setActive(shot)}
                  className={`relative aspect-video w-24 border bg-bone sm:w-28 ${
                    selectedShot ? "border-ink" : "border-ink/15"
                  }`}
                >
                  <Image
                    src={`/images/${image.file}`}
                    alt=""
                    fill
                    priority
                    sizes="120px"
                    className="object-cover object-center"
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
