import Image from "next/image";
import { Container } from "@/components/container";
import { PrimaryLink } from "@/components/links";
import { editorial, manifesto, origin, values } from "@/lib/copy";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Mission",
  description:
    "Why Intentional Threads exists. A short manifesto, four values, and how the first sweatshirt started.",
  path: "/mission",
  image: `/images/${editorial.hands.file}`,
  imageAlt: editorial.hands.alt,
});

export default function MissionPage() {
  return (
    <>
      <Container className="py-16 md:py-24">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
          Mission
        </p>
        <h1 className="mt-5 max-w-3xl font-serif text-5xl font-medium leading-[0.95] tracking-[-0.02em] md:text-7xl">
          Most of life happens by default.
        </h1>
        <div className="mt-12 max-w-2xl space-y-6 text-[1.075rem] leading-[1.75]">
          {manifesto.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-12 font-serif text-3xl italic">Made on purpose.</p>
      </Container>

      <div className="relative aspect-[3/2] max-h-[720px] w-full">
        <Image
          src={`/images/${editorial.hands.file}`}
          alt={editorial.hands.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Container className="py-20 md:py-28">
        <h2 className="font-serif text-4xl font-medium tracking-[-0.01em] md:text-5xl">Values</h2>
        <ol className="mt-12 grid gap-12 sm:grid-cols-2">
          {values.map((value, index) => (
            <li key={value.title} className="border-t border-ink/10 pt-6">
              <p className="font-serif text-3xl italic text-muted">0{index + 1}</p>
              <h3 className="mt-3 font-serif text-3xl">{value.title}</h3>
              <p className="mt-3 max-w-md text-[1.02rem] leading-relaxed">{value.body}</p>
            </li>
          ))}
        </ol>
      </Container>

      <section className="border-t border-ink/10">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[280px] lg:min-h-[640px]">
            <Image
              src={`/images/${editorial.workshop.file}`}
              alt={editorial.workshop.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex items-center px-5 py-16 sm:px-10 lg:px-16">
            <div className="max-w-xl">
              <h2 className="font-serif text-4xl font-medium tracking-[-0.01em] md:text-5xl">
                How it started
              </h2>
              <div className="mt-8 space-y-6 text-[1.05rem] leading-[1.75]">
                {origin.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Container className="py-20 md:py-28">
        <p className="max-w-xl font-serif text-4xl leading-tight md:text-5xl">
          If one of these is the reminder you wanted, start there.
        </p>
        <div className="mt-8">
          <PrimaryLink href="/shop">Shop the collection</PrimaryLink>
        </div>
      </Container>
    </>
  );
}
