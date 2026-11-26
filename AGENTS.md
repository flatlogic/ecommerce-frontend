# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16, React 19, and TypeScript ecommerce template. App Router entry points live in `app/`; `app/[[...slug]]/page.tsx` exposes only the supported storefront and admin URLs. Migrated screen implementations are in `legacy-pages/` while reusable UI remains under `components/admin/` and `components/e-commerce/`. Modern adapters are isolated in `components/compat/`. Redux state is organized by domain in `redux/`; shared API validation and domain schemas live in `lib/` and `types/`. Keep static files in `public/` and colocate `*.module.scss` files with their components.

## Build, Test, and Development Commands

- `npm ci` installs exactly what is recorded in `package-lock.json`.
- `npm run dev` starts the local Next.js server.
- `npm run build` creates the production build; `npm start` serves it.
- `npm run typecheck` runs strict TypeScript validation.
- `npm run lint` checks modern application and infrastructure code.
- `npm run test:coverage` runs Vitest with the 80% coverage gate.
- `npm run test:e2e` and `npm run test:visual` run Playwright flows and screenshots.
- `npm run verify` performs the standard pre-PR validation.

Use Node `22.22.2` from `.nvmrc`. Do not use Yarn or recreate `yarn.lock`.

## Coding Style & Naming Conventions

Use two-space indentation, semicolons, and TypeScript for all application code. Components and exported types use PascalCase; functions, hooks, Redux modules, and variables use camelCase. Name hooks with `use` and scoped styles as `Component.module.scss`. Prefer `@/` or configured root aliases over long relative imports. Validate external data with Zod, narrow `unknown`, and avoid `any` or broad non-null assertions. Run Prettier only on touched files.

## Testing & Pull Requests

Name unit tests `*.test.ts(x)` and Playwright tests `*.spec.ts`. Mock backend responses deterministically; never depend on the hosted demo API. Cover changed business logic and update desktop/mobile screenshots for visible changes. Commits use short imperative subjects, optionally with a Conventional Commit prefix. Pull requests must describe affected routes, API/config assumptions, commands run, linked issues, and before/after screenshots for UI changes.

## Security & Configuration

Copy `.env.example` locally and keep secrets uncommitted. Browser-visible values must use `NEXT_PUBLIC_`; server-only endpoints use `API_BASE_URL`. Never commit tokens, customer data, `.next/`, coverage output, or local OS files.
