# SDIS Atlas

An unofficial, student-built Course Explorer for UNC Chapel Hill. React + TypeScript + Vite, Tailwind CSS, Motion, and Lucide. No backend or accounts.

## Run

Requires Node.js 20.19+.

```sh
npm install
npm run dev
```

Open the printed localhost URL. `npm run build` checks TypeScript and produces `dist/`; `npm run preview` serves the production build. `npm test` runs search, filter, storage, and dataset checks.

## Features

Search codes, names, catalog descriptions and Atlas skill tags; combine department, course-number level, and credit filters; view full descriptions and requisites in a keyboard-accessible native dialog; save courses in localStorage; browse your saved collection; switch between persisted light/dark appearance. Layout adapts to mobile, with reduced-motion support. Data is bundled synchronously, so no artificial loading state is needed.

## Data provenance

16 selected courses from the **2026–2027 UNC catalog**, retrieved November 3, 2026:

- https://catalog.unc.edu/courses/inls/
- https://catalog.unc.edu/courses/data/

`src/data/courses.json` contains catalog titles, full descriptions, credits and requisites. A null prerequisites value means no explicit Requisites field was listed, not guaranteed unrestricted enrollment. Additional conditions may appear in the description. Catalog listings do not establish term offerings, seat availability, or eligibility. Course level means the numeric hundred band, not a recommendation about difficulty.

`skills` are Atlas-generated metadata, not official UNC outcomes. This prototype is neither affiliated with nor endorsed by UNC.

To refresh, manually download the two catalog HTML pages to `/tmp/atlas-inls.html` and `/tmp/atlas-data.html`, review the year, and run `python3 scripts/import_catalog.py`. The importer is intentionally bounded to 16 selected codes, makes no requests, and preserves descriptions and explicit requisites. Review the resulting diff against the catalog, update dates/year labels, and run checks. It is not an API integration or scheduled scraper.

## Structure and next steps

`src/components` contains reusable cards, bookmark controls, and the detail dialog. `src/lib/courses.ts` defines the course model and pure filtering/storage helpers. `src/App.tsx` coordinates local state and navigation. Future Skill Tree and Research Discovery can use separate feature modules; their sidebar labels are explicitly coming soon and do not pretend to navigate.

Next: expand verified coverage, add course comparison, consider URL-based filters, and perform broader assistive-technology and cross-browser testing. No current enrollment feeds, recommendations, backend, or authentication are implemented. Bookmarks stay in this browser only.
