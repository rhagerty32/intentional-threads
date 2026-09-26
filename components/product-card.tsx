import Image from "next/image";
import Link from "next/link";
import type { CardProduct } from "@/lib/types";
import { formatPrice } from "@/lib/site";

export function ProductCard({
  product,
  priority = false,
}: {
  product: CardProduct;
  priority?: boolean;
}) {
  const categoryLabel = product.category === "jewelry" ? "Jewelry" : "Apparel";

  return (
    <article>
      <Link href={`/shop/${product.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden border border-ink/10 bg-bone">
          <Image
            src={`/images/${product.image}`}
            alt={product.imageAlt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 50vw"
            className="object-contain p-3 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.03] sm:p-5"
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p
            className={`text-[0.68rem] font-medium uppercase tracking-[0.18em] ${
              product.category === "jewelry" ? "text-gold-deep" : "text-muted"
            }`}
          >
            {categoryLabel}
          </p>
          {product.note ? (
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
              {product.note}
            </p>
          ) : null}
        </div>
        <h3 className="mt-2 font-serif text-[1.65rem] leading-tight tracking-[-0.01em] underline decoration-transparent underline-offset-[6px] group-hover:decoration-ink">
          {product.name}
        </h3>
        <p className="mt-1 text-sm tabular-nums">{formatPrice(product.price)}</p>
      </Link>
    </article>
  );
}
