# Yerba Buena

A React + TypeScript web app for herbs, remedies, and everyday well-being.

## Getting started

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install
npm run dev        # start the dev server at http://localhost:5173
npm test           # run unit tests
npm run build      # type-check and build for production (output in dist/)
```

## Features

| Route | Feature |
| --- | --- |
| `/herbs` | **Herb Search**: search 43 herbs and teas by name, other names, scientific name, or benefit. Filter by herbal vs. true tea. Matching remedies appear below the herbs. |
| `/herbs/:herbId` | **Herb page**: description, parts used, flavor, how to use it, traditional benefits, cautions, the remedies that use it, and herbs it pairs with. |
| `/remedies` | **Remedies**: 25 simple teas, syrups, and steams, with a filter. |
| `/remedies/:remedyId` | **Remedy page**: ingredients (linked to herb pages), steps, and cautions for the remedy and every herb in it. |
| `/trail-map` | **Trail Map**: route stops on an OpenStreetMap map. Edit the stops in `src/features/trail-map/stops.ts`. |
| `/check-in` | **Well-being Check-in**: a quick "how are you feeling today?" check-in. If someone isn't feeling good, it asks what's going on and shows support and helplines that match (for example, grief resources after a loss, or crisis lines if they mention self-harm). Edit topics and helplines in `src/features/wellbeing/support.ts`. |

Coming soon: sign-up and log-in, avatar, workouts, and habit tracker.

## Project structure

```
src/
  main.tsx, App.tsx       # entry point and routes
  styles.css              # global styles (light and dark mode)
  components/             # shared UI: layout, back link
  hooks/                  # shared hooks
  pages/                  # home and not-found pages
  features/
    herbs/
      data/herbs.ts       # herb profiles (the HerbId type comes from this list)
      data/benefits.ts    # benefit list from the source article, verbatim
      data/remedies.ts    # remedy recipes
      data/index.ts       # catalog helpers: getHerb, remediesForHerb, ...
      lib/                # search and text normalization (with tests)
      components/, pages/
    trail-map/
    wellbeing/
```

New features go in their own folder under `src/features/` and get a route in `src/App.tsx`.

### Adding an herb or remedy

1. Add the id to `HERB_IDS` and its profile to `HERB_PROFILES` in `data/herbs.ts`. TypeScript reports an error if either one is missing.
2. To give it benefits, add a line to `RAW` in `data/benefits.ts` and map the name in `SOURCE_NAME_TO_ID`.
3. Add remedies to `data/remedies.ts`. Set `herbId` on an ingredient to link it to an herb page.
4. Run `npm test`. The catalog tests check that every herb has benefits and cautions, and that no remedy uses an herb marked as not for homemade remedies.

## Sources and disclaimer

Herb benefits are adapted from The Tea House on Los Rios, ["The Power of Tea: 100 Health and Wellness Benefits"](https://theteahouseonlosrios.com/blogs/news/the-power-of-tea-100-health-and-wellness-benefits). The herb descriptions, cautions, and remedies were written for this app from general herbal knowledge. They should be reviewed before launch.

This information is educational and isn't medical advice. Talk with a healthcare professional before using herbs, especially if you're pregnant, nursing, or taking medication.
