import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { getCollections } from "@/lib/catalog";
import { footerNote } from "@/lib/copy";
import { siteTagline } from "@/lib/site";

export function SiteFooter() {
  const collections = getCollections();
  const year = 2026;

  return (
    <footer className="border-t border-ink/10 bg-bone">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-14 lg:py-20">
        <div className="lg:col-span-4">
          <Link href="/" className="font-serif text-3xl tracking-[0.01em]">
            Intentional Threads
          </Link>
          <p className="mt-3 font-serif text-2xl italic text-muted">{siteTagline}</p>
        </div>

        <nav className="grid grid-cols-2 gap-8 lg:col-span-4" aria-label="Footer">
          <div>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
              Visit
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/shop" className="link-underline">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/mission" className="link-underline">
                  Mission
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
              Collections
            </p>
            <ul className="mt-4 space-y-2">
              {collections.map((collection) => (
                <li key={collection.slug}>
                  <Link href={`/collections/${collection.slug}`} className="link-underline">
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="font-serif text-3xl">The Sunday Intention</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            One email a week. A prompt and a note from the studio.
          </p>
          <div className="mt-6">
            <NewsletterForm finePrint="Unsubscribe anytime." />
          </div>
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 text-sm text-muted sm:px-8 lg:px-14">
          <p>
            {year} Intentional Threads. {siteTagline}
          </p>
          <p>{footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
