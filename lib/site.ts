export const siteName = "Intentional Threads";
export const siteTagline = "Made on purpose.";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://intentional-threads.vercel.app";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
