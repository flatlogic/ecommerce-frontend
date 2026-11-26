# Flatlogic Ecommerce React

A free storefront and admin dashboard for a furniture shop, built with Next.js 16, React 19, TypeScript and Bootstrap 5. Shoppers can browse products, save favorites and add items to their cart. The admin dashboard manages the catalog, orders and blog.

[Browse the live shop](https://flatlogic-ecommerce.flatlogic.com/shop) · [Demo sign-in](https://flatlogic-ecommerce.flatlogic.com/login) · [Backend setup](https://github.com/flatlogic/ecommerce-backend#-quick-start) · [Latest release](https://github.com/flatlogic/ecommerce-frontend/releases/latest) · [Changelog](changelog.md)

[![Flatlogic storefront with the home collection and new arrivals](public/images/screenshot.png)](https://flatlogic-ecommerce.flatlogic.com/)

You can browse the shop as a guest. To open the [admin dashboard](https://flatlogic-ecommerce.flatlogic.com/admin/dashboard), sign in first. The demo catalog is shared, so changes can appear to other visitors.

## Run locally

Start the [companion Node.js API](https://github.com/flatlogic/ecommerce-backend) with its PostgreSQL database and sample data. The frontend expects the API at `http://localhost:8080/api`.

With [nvm](https://github.com/nvm-sh/nvm) installed, run the following in a separate terminal. The repository pins Node in [`.nvmrc`](.nvmrc) and npm in [`package.json`](package.json).

```sh
git clone https://github.com/flatlogic/ecommerce-frontend.git
cd ecommerce-frontend
nvm install
npm ci
cp .env.example .env.local
npm run dev
```

Open [the local shop](http://localhost:3000/shop). If the catalog is empty, check that the backend is running, has sample products and is reachable at the API URL in `.env.local`.

## Configuration

The defaults in [`.env.example`](.env.example) work for a frontend and API running on the same computer. For another deployment, set these values before building.

| Variable | Used for |
| --- | --- |
| `API_BASE_URL` | API URL reachable from the Next.js server, including `/api`. |
| `NEXT_PUBLIC_API_BASE_URL` | API URL reachable from the shopper’s browser, including `/api`. |
| `NEXT_PUBLIC_APP_URL` | Public storefront URL used for checkout return links. |

The billing page demonstrates Stripe Checkout with a sample line item. To take payments for a real cart, configure Stripe on the backend and calculate the order total there.

## Build and test

| Command | What it does |
| --- | --- |
| `npm run build` | Build the production frontend. |
| `npm start` | Serve the production build. |
| `npm run verify` | Type-check, lint, run unit tests with coverage and build. |
| `npm run test:e2e` | Run desktop and mobile Playwright tests. |
| `npm run test:visual` | Compare storefront screenshots with the saved baselines. |

Before the first browser test, run `npx playwright install chromium webkit`. The visual baselines in this repository were captured on macOS.

## License and support

Released under the [MIT License](LICENSE). [Report a bug](https://github.com/flatlogic/ecommerce-frontend/issues) or ask a question on the [Flatlogic forum](https://flatlogic.com/forum).
