"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useBag } from "@/components/bag-context";
import { useFocusTrap } from "@/components/use-focus-trap";
import { siteTagline } from "@/lib/site";

type NavCollection = { slug: string; name: string };

export function SiteHeader({ collections }: { collections: NavCollection[] }) {
  const pathname = usePathname();
  const { count, isOpen: bagOpen, openBag } = useBag();
  const [menuOpen, setMenuOpen] = useState(false);
  const [seenPath, setSeenPath] = useState(pathname);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const closeMenu = () => setMenuOpen(false);

  if (pathname !== seenPath) {
    setSeenPath(pathname);
    setMenuOpen(false);
  }

  if (bagOpen && menuOpen) {
    setMenuOpen(false);
  }

  useFocusTrap(menuOpen, menuRef, closeMenu);

  const shopCurrent = pathname === "/shop" || pathname.startsWith("/shop/");
  const missionCurrent = pathname === "/mission";

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-bone">
      <div className="mx-auto flex h-[var(--header-h)] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-14">
        <Link
          href="/"
          className="font-serif leading-none text-ink"
          aria-label="Intentional Threads, home"
        >
          <span className="font-serif text-[1.7rem] italic sm:hidden">IT</span>
          <span className="hidden text-[1.45rem] tracking-[0.02em] sm:inline">
            Intentional Threads
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          <Link
            href="/shop"
            aria-current={shopCurrent ? "page" : undefined}
            className={`link-underline text-[0.78rem] uppercase tracking-[0.16em] ${
              shopCurrent ? "text-ink" : "text-muted"
            }`}
          >
            Shop
          </Link>
          <Link
            href="/mission"
            aria-current={missionCurrent ? "page" : undefined}
            className={`link-underline text-[0.78rem] uppercase tracking-[0.16em] ${
              missionCurrent ? "text-ink" : "text-muted"
            }`}
          >
            Mission
          </Link>
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 px-2 text-[0.72rem] font-medium uppercase tracking-[0.16em]"
            onClick={openBag}
            aria-label={count > 0 ? `Open bag, ${count} items` : "Open bag"}
          >
            Bag
            {count > 0 ? <span className="tabular-nums">{count}</span> : null}
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none">
              <path d="M3 8h18M3 16h18" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen
        ? createPortal(
            <div
          id={menuId}
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          tabIndex={-1}
          className="menu-in fixed inset-0 z-50 flex flex-col overflow-y-auto bg-bone px-6 py-5"
        >
          <div className="flex items-center justify-between">
            <p className="font-serif text-xl italic">{siteTagline}</p>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center"
              onClick={closeMenu}
            >
              <span className="sr-only">Close menu</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-5" aria-label="Mobile">
            <Link href="/shop" className="font-serif text-5xl leading-none">
              Shop
            </Link>
            <p className="mt-6 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
              Collections
            </p>
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="font-serif text-4xl leading-none"
              >
                {collection.name}
              </Link>
            ))}
            <Link href="/mission" className="mt-6 font-serif text-5xl leading-none">
              Mission
            </Link>
          </nav>
        </div>,
            document.body,
          )
        : null}
    </header>
  );
}
