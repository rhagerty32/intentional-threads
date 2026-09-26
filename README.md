# Intentional Threads

A concept shop for a fictional brand. Sweatshirts, hoodies, tees, and a short jewelry line. The tagline is "Made on purpose." Nothing on the site is for sale, and the story is invented.

It runs on Next.js (App Router) and TypeScript, with Tailwind CSS. The pages are static. The bag stays in the browser. There is no payment system.

## Run locally

Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

`npm run build` then `npm start` serves the production build.

## Deploy to Vercel

Push the repo and import it in Vercel. Vercel detects Next.js. You do not need extra config.

Set `NEXT_PUBLIC_SITE_URL` to the live address if you want the sitemap and link previews to use your domain. If you leave it unset, those URLs use `https://intentional-threads.vercel.app`.

Photos are in `public/images/`. Replace a file and keep the same name.
