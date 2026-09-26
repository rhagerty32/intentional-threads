import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PrimaryLink, TextLink } from "@/components/links";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page is not on the Intentional Threads site.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-24">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">404</p>
      <h1 className="mt-4 max-w-xl font-serif text-5xl font-medium leading-[0.95] tracking-[-0.02em] md:text-7xl">
        This page is not here.
      </h1>
      <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed">
        The link may be old, or the address may be off by a letter.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <PrimaryLink href="/">Back home</PrimaryLink>
        <TextLink href="/shop">Shop the collection</TextLink>
      </div>
    </Container>
  );
}
