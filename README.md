# Intentional Threads

A concept storefront for Intentional Threads, a fictional brand. The tagline is "Made on purpose." The shop carries sweatshirts, hoodies, tees, and jewelry. Nothing is for sale.

## Run it locally

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

`npm run build` prerenders every page as static HTML: home, shop, mission, each collection, and each product.

## Deploy on Vercel

1. Push this repo to GitHub.
2. In Vercel, import the repository. The framework preset is Next.js. There is no extra config.
3. Optional: set `NEXT_PUBLIC_SITE_URL` to the production URL, for example `https://your-domain.com`. Canonical links, the sitemap, and Open Graph URLs use that value. If you leave it unset, the site falls back to `https://intentional-threads.vercel.app`.

## Images

Photography lives in `public/images/`. Replace a file and keep the same filename. The site picks it up with no code changes.

Product photos are shown with `object-contain` on a bone (`#F5F0E8`) background, so a landscape studio shot sits flush in the card and the gallery. Heroes, collection banners, and mission photos use `object-cover`.

The wordmark in the header is set in Cormorant Garamond. `logo-wordmark.png` is the type-set file, if you need it outside the site.

Expected filenames:

- `collection-daily-practice.jpg`
- `collection-first-light.jpg`
- `collection-north-star.jpg`
- `compass-pendant-necklace.jpg`
- `compass-pendant-necklace-on-body.jpg`
- `daily-practice-tee.jpg`
- `decide-tee.jpg`
- `first-light-crewneck.jpg`
- `first-light-crewneck-on-body.jpg`
- `first-light-hoops.jpg`
- `hero-morning-journal.jpg`
- `hero-morning-walk.jpg`
- `intention-chain-bracelet.jpg`
- `intentional-hoodie.jpg`
- `intentional-hoodie-on-body.jpg`
- `logo-wordmark.png`
- `mission-hands-journal.jpg`
- `mission-thread-workshop.jpg`
- `monogram-crewneck.jpg`
- `north-star-signet-ring.jpg`
- `north-star-signet-ring-on-hand.jpg`
- `on-purpose-bar-necklace.jpg`
- `on-purpose-crewneck.jpg`
- `on-purpose-crewneck-detail.jpg`
- `promise-cuff.jpg`
- `slow-morning-zip-hoodie.jpg`
- `thread-knot-ring.jpg`
- `threadline-studs.jpg`

## What is real, and what is not

The bag is saved in the browser with `localStorage`. Newsletter signup is interface only. Checkout says it is coming soon. There is no payment and no backend.

Product copy and prices live in `data/catalog.json`.
