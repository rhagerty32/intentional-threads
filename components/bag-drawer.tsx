"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useBag } from "@/components/bag-context";
import { useFocusTrap } from "@/components/use-focus-trap";
import { formatPrice } from "@/lib/site";

export function BagDrawer() {
  const { lines, subtotal, isOpen, closeBag, setQuantity, remove } = useBag();
  const panelRef = useRef<HTMLDivElement>(null);
  const [askedCheckout, setAskedCheckout] = useState(false);
  const titleId = "bag-title";

  useFocusTrap(isOpen, panelRef, closeBag);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute inset-0 bg-ink/40"
        onClick={closeBag}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="drawer-in absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-bone shadow-none"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4 sm:px-6">
          <h2 id={titleId} className="font-serif text-3xl">
            Your bag
          </h2>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center"
            onClick={closeBag}
          >
            <span className="sr-only">Close bag</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col justify-between px-5 py-8 sm:px-6">
            <p className="font-serif text-3xl">Nothing in here yet.</p>
            <Link href="/shop" className="btn-primary" onClick={closeBag}>
              Shop the collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 border-b border-ink/10 py-5 first:pt-0">
                  <Link
                    href={`/shop/${line.slug}`}
                    onClick={closeBag}
                    className="relative h-24 w-20 shrink-0 border border-ink/10 bg-bone"
                  >
                    <Image
                      src={`/images/${line.image}`}
                      alt={line.imageAlt}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/shop/${line.slug}`}
                        onClick={closeBag}
                        className="link-underline font-serif text-2xl leading-tight"
                      >
                        {line.name}
                      </Link>
                      <p className="shrink-0 text-sm tabular-nums">
                        {formatPrice(line.price * line.quantity)}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {line.color}
                      {line.size ? `, size ${line.size}` : ""}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center border border-ink/15">
                        <button
                          type="button"
                          className="h-11 w-11"
                          aria-label={`Decrease quantity of ${line.name}`}
                          onClick={() => setQuantity(line.id, line.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="min-w-6 text-center text-sm tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          className="h-11 w-11"
                          aria-label={`Increase quantity of ${line.name}`}
                          onClick={() => setQuantity(line.id, line.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="link-underline text-sm text-muted"
                        onClick={() => remove(line.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-ink/10 px-5 py-5 sm:px-6">
              <div className="flex items-baseline justify-between">
                <p className="text-sm uppercase tracking-[0.16em]">Subtotal</p>
                <p className="font-serif text-3xl tabular-nums">{formatPrice(subtotal)}</p>
              </div>
              <p className="mt-3 text-sm text-muted">
                This is a concept store. Nothing is charged and nothing ships.
              </p>
              <button
                type="button"
                className="btn-primary mt-5 w-full"
                onClick={() => setAskedCheckout(true)}
              >
                Checkout
              </button>
              {askedCheckout ? (
                <p role="status" className="mt-4 text-sm">
                  Checkout is coming soon. Your bag stays in this browser.
                </p>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
