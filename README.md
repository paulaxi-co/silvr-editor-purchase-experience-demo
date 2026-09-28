# Silvr editorial shopping demo

A responsive React, TypeScript, Vite, and Tailwind shopping experience adapted from a Figma Make prototype. Readers can explore editorial images and an animated campaign, inspect product hotspots, compare similar items, and open retailer product pages.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To check the production build, run `npm run build` and `npm run preview`.

## Product links

The 16 featured items and 16 alternatives are defined in `src/productCatalog.ts`. The "Shop at store" link opens the corresponding retailer product page in a new tab. `PRODUCT_SOURCES.md` lists every product, price, and destination URL.

Editorial images and product thumbnails are visual style references. The linked products are real store listings but are not represented as the exact garments worn in the editorial unless that match is independently confirmed. Prices are research snapshots and may change with size, region, promotion, and stock. Several men's suit links are for jackets only; matching trousers are sold separately.

## Technical notes

The video is an exported animated GIF with a paused canvas frame, rather than a streaming video. The first editorial image loads from Unsplash, and fonts load from Google Fonts, so those assets require network access. No API keys or environment variables are needed for the demo.
