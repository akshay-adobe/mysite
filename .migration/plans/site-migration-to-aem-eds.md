# Migrate the About Us Page to AEM Edge Delivery Services

## Overview
Migrate a single page — **/about-us** — as standard content to AEM Edge Delivery Services. The page will be scraped, its structure analyzed, mapped to EDS blocks, imported, styled to match the original, and validated in the local preview. No commerce or forms plugins are required for this page.

## Required Input Before Execution
- **Base site domain** — you chose "base + /about-us" and confirmed standard content, but the base domain hasn't been shared yet. I'll target `{base-domain}/about-us`. Execution cannot begin without this.

## Decisions Captured
- **Scope:** Single page — `/about-us`.
- **Content type:** Standard content (text, images, hero, cards, etc.).
- **Plugins:** None needed — commerce and forms are not required for standard content.
- **Discovery method:** Direct page URL (no sitemap crawl needed for a single page).

## Checklist

### Phase 1 — Scrape & Analyze
- [ ] Confirm the base domain and construct the full URL `{base-domain}/about-us`.
- [ ] Scrape the page: capture metadata, download images, and produce cleaned HTML.
- [ ] Analyze the page structure: identify sections, content sequences, and authoring decisions.
- [ ] Survey the available EDS block palette (local project + Block Collection) and map content to blocks.
- [ ] Identify or create any new block variants the design requires.

### Phase 2 — Import Infrastructure
- [ ] Generate block parsers for each block variant on the page.
- [ ] Generate page transformers (cleanup, sections, media handling).
- [ ] Assemble the import script combining the page template, parsers, and transformers.

### Phase 3 — Content Import
- [ ] Run the bulk import for the single `/about-us` URL.
- [ ] Review the imported output and fix parsers/transformers as needed.

### Phase 4 — Design & Styling
- [ ] Extract design tokens (colors, typography, spacing) from the source page.
- [ ] Apply site-level styles and per-block styling to match the original.

### Phase 5 — Validation
- [ ] Run post-import validation: score the page for content completeness (source vs. output).
- [ ] Visually critique the migrated page against the original and fix any divergences.
- [ ] Verify rendering in the local preview.

### Phase 6 — Ship
- [ ] Open a PR that includes a preview link for the migrated page.
- [ ] Publish/preview the content as appropriate and hand off.

## Notes
- Execution requires **Execute mode** — this plan cannot be carried out while in Plan mode.
- Since this is a single standard-content page, the workflow is streamlined: no plugin enablement, no template-grouping, and no site-wide discovery step.
- Once you share the base domain and switch to Execute mode, I'll start with Phase 1 (scrape & analyze).
