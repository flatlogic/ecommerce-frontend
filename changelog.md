# Changelog

## [2.0.2] - 26/11/2026

### Fixed

- Keep products visible in the shop when the catalog API returns null for optional SEO fields.
- Show the product total returned by the catalog API when browsing or filtering the shop.

## [2.0.1] - 26/11/2026

### Security

- Updated Next.js from 16.3.6 to 16.4.6 and Zod from 4.6.5 to 4.6.7.
- Updated Vite to 8.3.8, Vitest and its coverage provider to 5.1.2, and refreshed the npm lockfile to pick up fixes for transitive dependencies.

### Fixed

- Restored the checkout request to the backend's payment endpoint when the storefront API URL ends in `/api`.

## [2.0.0] - 24/09/2026

This release delivers a complete modernization of the ecommerce frontend while preserving its existing UI, public routes, and API contracts.

## Highlights

- Migrated all application code from JavaScript to TypeScript
- Upgraded Next.js from 10 to 16 and adopted the App Router
- Upgraded React from 16 to 19
- Migrated the Redux setup to Redux Toolkit 2
- Upgraded Bootstrap from 4 to 5.3
- Replaced deprecated React libraries with maintained alternatives
- Migrated Moment.js usage to Day.js
- Added Zod validation for API responses and domain models
- Migrated Sass modules to the modern module system
- Switched package management from Yarn to npm
- Standardized the runtime on Node.js 22 LTS

## Testing and Quality

- Added strict TypeScript validation
- Added ESLint and Prettier checks
- Added Vitest and React Testing Library unit tests
- Added Playwright end-to-end tests for desktop and mobile

## [1.0.2] - 27/11/2024

- Updated dependencies

## [1.0.1] - 29/12/2023

- Updated dependencies

## [1.0.0]

Initial production release
