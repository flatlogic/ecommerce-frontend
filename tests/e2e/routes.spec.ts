import { expect, test, type Page } from "@playwright/test";

const apiRows = { rows: [], count: 0 };
const authToken =
  "eyJhbGciOiJub25lIn0.eyJpZCI6ImFkbWluLTEiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiZXhwIjo0MTAyNDQ0ODAwfQ.";
const product = {
  id: "afaf98d5-4060-4408-967b-c4f4af3d1861",
  title: "Modern Chair",
  price: 199,
  discount: 0,
  rating: 5,
  status: "in stock",
  image: [{ id: "image-1", publicUrl: "/images/e-commerce/home/product1.png" }],
  categories: [
    { id: "1fcb7ece-6373-405d-92ef-3f3c4e7dc711", title: "furniture" },
  ],
};
const gridProducts = Array.from({ length: 6 }, (_, index) => ({
  ...product,
  id: `${product.id.slice(0, -1)}${index + 1}`,
  title: `Product ${index + 1}`,
  price: [12, 123, 90, 20, 40, 30][index] ?? 0,
  image: [
    {
      id: `image-${index + 1}`,
      publicUrl: `/images/e-commerce/home/product${index + 1}.png`,
    },
  ],
}));
const blogPosts = [
  {
    id: "07aeff53-31e5-4276-8307-f855b22b6436",
    author_name: "Hillary Johnson",
    title: "Wall Murals Add Your Interior Design Maximum Escapism",
    epigraph:
      "These lively patterns will give your interior the look you always wanted. Can you imagine the way it feels to turn your bedroom into a dreamy forest or warm lake?",
    createdAt: "2026-02-10T00:00:00.000Z",
    hero_image: [{ publicUrl: "/images/e-commerce/home/first_hero.jpg" }],
    categories: [],
  },
  {
    id: "c4245ff9-6a53-4b13-8539-0b69b442cfd1",
    author_name: "Phoenix Houston",
    title: "Amber Tones - A Sophisticated Take On Contemporary Country",
    epigraph:
      "Nostalgia and comfort are the words that come to mind. Maximum coziness and simplicity create an unforgettable atmosphere. You should try this concept.",
    createdAt: "2026-02-10T00:00:00.000Z",
    hero_image: [{ publicUrl: "/images/e-commerce/home/second_hero.jpg" }],
    categories: [],
  },
  {
    id: "57fbad3f-528a-43b2-83e8-32ba30708194",
    author_name: "Andreas Walter",
    title: "Distant Shores are Waiting For You And Your Bedroom!",
    epigraph:
      "The getaway lifestyle was reimagined. Prepare yourself for the journey to the distant shores. It will give you a calm and relaxing atmosphere for you to always recharge yourself.",
    createdAt: "2026-02-10T00:00:00.000Z",
    hero_image: [{ publicUrl: "/images/e-commerce/home/first_hero.jpg" }],
    categories: [],
  },
  {
    id: "6fd75915-f1f0-447b-b144-c58c03d4df20",
    author_name: "William Johnson",
    title:
      "Vintage Elements Were Reimagined! Use Retro Pieces and Vibrant Colours",
    epigraph:
      "Provide plenty of contrast to stand out from the crowd. Each and every one of these vintage pieces should mean something to you. In this case, it will be loved by you.",
    createdAt: "2026-02-10T00:00:00.000Z",
    hero_image: [{ publicUrl: "/images/e-commerce/home/second_hero.jpg" }],
    categories: [],
  },
];

async function installApiMocks(page: Page, rows: unknown[] = []) {
  await page.route("**/api/**", async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith("/blogs")) {
      await route.fulfill({
        json: { rows: blogPosts, count: blogPosts.length },
      });
      return;
    }
    if (url.pathname.endsWith(`/products/${product.id}`)) {
      await route.fulfill({ json: product });
      return;
    }
    if (url.pathname.endsWith("/auth/signin/local")) {
      await route.fulfill({ json: authToken });
      return;
    }
    if (url.pathname.endsWith("/auth/me")) {
      await route.fulfill({
        json: {
          id: "admin-1",
          email: "admin@example.com",
          role: "admin",
          wishlist: [],
          avatar: [],
        },
      });
      return;
    }
    if (url.pathname.endsWith("/payment/session-initiate")) {
      await route.fulfill({
        json: { url: "https://checkout.stripe.com/c/pay/test" },
      });
      return;
    }
    await route.fulfill({
      json: rows.length ? { rows, count: rows.length } : apiRows,
    });
  });
}

const smokeRoutes = [
  "/about",
  "/about-team",
  "/account",
  "/billing",
  "/blog",
  "/blog/article",
  "/cart",
  "/categories",
  "/contact",
  "/faq",
  "/forgot",
  "/login",
  "/register",
  "/reset",
  "/search",
  "/search-results",
  "/shop",
  "/verify",
  "/wishlist",
  "/admin/documentation/overview",
];

test.beforeEach(async ({ page }) => installApiMocks(page));

for (const route of smokeRoutes) {
  test(`renders ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("body")).not.toBeEmpty();
  });
}

test("unknown technical routes return 404", async ({ page }) => {
  const response = await page.goto("/admin/products/ProductsListTable");
  expect(response?.status()).toBe(404);
});

test("failed product requests render the legacy generic error state", async ({
  page,
}) => {
  const response = await page.goto(
    "/products/afaf98d5-4060-4408-967b-c4f4af3d1864",
  );
  expect(response?.status()).toBeLessThan(400);

  const message = page.getByRole("heading", {
    name: "An unexpected error has occurred.",
    exact: true,
  });
  const errorLayout = message.locator("xpath=../../..");
  const footer = page.locator("footer");

  await expect(message).toBeVisible();
  await expect(message).toHaveCSS("font-size", "14px");
  await expect(message).toHaveCSS("font-weight", "400");
  await expect(message).toHaveCSS("line-height", "49px");
  await expect(errorLayout).toHaveCSS("display", "flex");
  await expect(errorLayout).toHaveCSS("align-items", "center");
  await expect(errorLayout).toHaveCSS("justify-content", "center");
  await expect(
    page.getByText(/Cannot read properties of undefined/),
  ).toHaveCount(0);

  const geometry = await Promise.all(
    [errorLayout, message, footer].map((locator) =>
      locator.evaluate((node) => {
        const rect = node.getBoundingClientRect();
        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        };
      }),
    ),
  );
  const [layoutRect, messageRect, footerRect] = geometry;
  const viewport = page.viewportSize();
  if (!layoutRect || !messageRect || !footerRect || !viewport) {
    throw new Error("The generic error layout could not be measured");
  }

  expect(layoutRect.height).toBeCloseTo(viewport.height, 0);
  expect(messageRect.x).toBeCloseTo(
    (viewport.width - messageRect.width) / 2,
    0,
  );
  expect(messageRect.y + messageRect.height / 2).toBeCloseTo(
    layoutRect.y + layoutRect.height / 2,
    0,
  );
  expect(footerRect.y).toBeCloseTo(layoutRect.y + layoutRect.height, 0);
});

test("bundled storefront artwork resolves to real image URLs", async ({
  page,
}) => {
  await page.goto("/categories");
  const images = page.locator("img");
  await expect(images.first()).toBeVisible();
  await expect
    .poll(() =>
      images.first().evaluate((node) => {
        const image = node as HTMLImageElement;
        return image.complete && image.naturalWidth > 0;
      }),
    )
    .toBe(true);

  const sources = await images.evaluateAll((nodes) =>
    nodes.map((node) => (node as HTMLImageElement).src),
  );
  expect(sources.length).toBeGreaterThan(0);
  expect(
    sources.every(
      (source) =>
        source.length > 0 && !source.includes("%5Bobject%20Object%5D"),
    ),
  ).toBe(true);
  for (const source of new Set(sources)) {
    expect((await page.request.get(source)).ok()).toBe(true);
  }
});

test("categories main banner keeps the legacy centered overlay", async ({
  page,
}) => {
  await page.goto("/categories");

  const heading = page.getByRole("heading", { name: "NEW ARRIVALS" });
  await expect(heading).toBeVisible();
  const bannerColumn = heading.locator(
    "xpath=ancestor::*[contains(concat(' ', normalize-space(@class), ' '), ' col-md-12 ')][1]",
  );
  await expect(bannerColumn).toHaveCSS("position", "relative");

  const layout = await heading.evaluate((node) => {
    const column = node.closest(".col-md-12");
    if (!(column instanceof HTMLElement)) {
      throw new Error("Categories banner column was not found");
    }

    const headingRect = node.getBoundingClientRect();
    const columnRect = column.getBoundingClientRect();

    return {
      horizontalOffset:
        headingRect.x +
        headingRect.width / 2 -
        (columnRect.x + columnRect.width / 2),
      verticalOffset:
        headingRect.y +
        headingRect.height / 2 -
        (columnRect.y + columnRect.height / 2),
    };
  });

  expect(layout.horizontalOffset).toBeCloseTo(0, 1);
  expect(layout.verticalOffset).toBeCloseTo(0, 1);
});

test("categories recommendations preserve the legacy carousel layout", async ({
  page,
}) => {
  await page.goto("/categories");

  const heading = page.getByRole("heading", { name: "You may also like:" });
  const carousel = page.locator('[class*="relatedCarousel"]');
  const cards = page.locator('div[class*="Categories_product"]');
  const firstCard = cards.first();

  await expect(heading).toHaveCSS("font-size", "20px");
  await expect(carousel).toHaveCSS("position", "relative");
  await expect(cards).toHaveCount(8);
  await expect(firstCard.locator("a").nth(1)).toHaveCSS(
    "text-decoration-line",
    "none",
  );
  await expect(firstCard.locator("p")).toHaveCSS("color", "rgb(85, 85, 85)");

  const layout = await heading.evaluate((node) => {
    const row = node.parentElement;
    const carousel = node.nextElementSibling;
    const card = carousel?.querySelector('div[class*="Categories_product"]');
    const slide = card?.parentElement;
    const image = card?.querySelector("img");
    const buttons = carousel
      ? Array.from(carousel.querySelectorAll("button"))
      : [];

    if (!row || !carousel || !card || !slide || !image) {
      throw new Error("Categories recommendation layout is incomplete");
    }

    const rect = (element: Element) => {
      const bounds = element.getBoundingClientRect();
      return {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
      };
    };

    return {
      row: rect(row),
      heading: rect(node),
      carousel: rect(carousel),
      card: rect(card),
      slide: rect(slide),
      image: rect(image),
      cardPaddingLeft: getComputedStyle(card).paddingLeft,
      cardPaddingRight: getComputedStyle(card).paddingRight,
      buttons: buttons.map(rect),
    };
  });

  const slideWidth = layout.row.width / 4;
  const carouselHeight = slideWidth * (400 / 300);

  expect(layout.heading.x).toBeCloseTo(layout.row.x, 1);
  expect(layout.heading.width).toBeCloseTo(205.84, 1);
  expect(layout.carousel.x).toBeCloseTo(layout.row.x, 1);
  expect(layout.carousel.width).toBeCloseTo(layout.row.width, 1);
  expect(layout.carousel.height).toBeCloseTo(carouselHeight, 1);
  expect(layout.slide.width).toBeCloseTo(slideWidth, 1);
  expect(layout.slide.height).toBeCloseTo(carouselHeight, 1);
  expect(layout.card.width).toBeCloseTo(slideWidth, 1);
  expect(layout.cardPaddingLeft).toBe("20px");
  expect(layout.cardPaddingRight).toBe("20px");
  expect(layout.image.width).toBeCloseTo(slideWidth - 40, 1);
  expect(layout.buttons[0]?.x).toBeCloseTo(layout.row.x - 20, 1);
  expect(layout.buttons[1]?.x).toBeCloseTo(
    layout.row.x + layout.row.width - 4,
    1,
  );
  expect(layout.buttons[0]?.y).toBeCloseTo(
    layout.carousel.y + carouselHeight * 0.35,
    1,
  );
});

test("search keeps the public query contract", async ({ page }) => {
  await page.goto("/search");
  await page.waitForLoadState("networkidle");
  await page.getByPlaceholder("Index For ...").fill("chair");
  await page.getByPlaceholder("Index For ...").press("Enter");
  await expect(page).toHaveURL(/\/search-results\?searchValue=chair$/);
  await expect(page.getByText("Search results for:")).toBeVisible();
});

test("filters, wishlist, and cart keep their local contracts", async ({
  page,
}) => {
  await page.unroute("**/api/**");
  await installApiMocks(page, [product]);
  await page.goto("/shop");
  await expect(page.getByText(product.title)).toBeVisible();
  const actions = page
    .locator('[class*="product__actions"]')
    .first()
    .locator("button");
  await actions.nth(0).click();
  await actions.nth(2).click();
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("wishlist") ?? "[]"),
    ),
  ).toHaveLength(1);
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("products") ?? "[]"),
    ),
  ).toHaveLength(1);
  const filtersButton = page.getByRole("button", { name: "Filters" });
  const mobileFilters = (page.viewportSize()?.width ?? 1440) <= 768;
  if (mobileFilters) {
    await expect(filtersButton).toBeVisible();
    await filtersButton.click();
  }
  const sidebar = page
    .locator(
      mobileFilters
        ? '[class*="filterColumn"][class*="showFilter"]'
        : '[class*="filterColumn"]',
    )
    .first();
  await sidebar.getByText("Furniture", { exact: true }).click();
  await expect(page.getByText(product.title)).toBeVisible();
});

test("cart preserves the legacy empty and populated layouts", async ({
  page,
  isMobile,
}) => {
  await page.goto("/cart");

  const shoppingTitle = page.getByRole("heading", { name: "Shopping Cart" });
  const totalPanel = page
    .getByRole("heading", { name: "Cart Total" })
    .locator("..");
  const table = page.locator("table");
  const headers = table.locator("th");
  const checkout = page.getByRole("button", { name: "Check out" });

  await expect(shoppingTitle).toHaveCSS("font-size", "28px");
  await expect(headers.first()).toHaveCSS("padding-top", "10.5px");
  await expect(table).toHaveCSS("vertical-align", "baseline");
  await expect(page.getByText("No items", { exact: true })).toBeVisible();
  await expect(totalPanel).toHaveCSS("background-color", "rgb(245, 245, 245)");
  await expect(totalPanel).toHaveCSS("padding", "32px");
  await expect(totalPanel).toHaveCSS("height", isMobile ? "400px" : "500px");
  await expect(page.getByText("Subtotal:", { exact: true })).toHaveCSS(
    "margin-right",
    "42px",
  );
  await expect(page.getByText("Shipping:", { exact: true })).toHaveCSS(
    "margin-right",
    "42px",
  );
  await expect(checkout).toHaveCSS("display", "block");
  await expect(checkout).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(checkout.locator("xpath=..")).toHaveClass(/cartTotal/);
  await expect(checkout).toHaveCSS("width", isMobile ? "350px" : "340px");

  await page.addInitScript((productId) => {
    localStorage.setItem(
      "products",
      JSON.stringify([{ amount: 1, product: productId }]),
    );
  }, product.id);
  await page.reload();

  await expect(page.getByText(product.title)).toBeVisible();
  await expect(page.getByAltText(product.title)).toHaveCSS(
    "margin-right",
    "21px",
  );
  await expect(page.getByText("Furniture", { exact: true })).toHaveCSS(
    "color",
    "rgb(85, 85, 85)",
  );
  await expect(page.getByRole("button", { name: "-", exact: true })).toHaveCSS(
    "margin-right",
    "14px",
  );
  await expect(page.getByRole("button", { name: "+", exact: true })).toHaveCSS(
    "margin-left",
    "14px",
  );

  await checkout.click();
  await expect(page).toHaveURL(/\/billing$/);
});

test("authenticated cart mutations address the cart order", async ({
  page,
}) => {
  const orderId = "order-1";
  await page.addInitScript((token) => {
    localStorage.setItem("token", token);
  }, authToken);
  await page.unroute("**/api/**");
  await page.route("**/api/**", async (route) => {
    const request = route.request();
    const url = new URL(request.url());

    if (url.pathname.endsWith("/auth/me")) {
      await route.fulfill({
        json: {
          id: "admin-1",
          email: "admin@example.com",
          role: "admin",
          wishlist: [product.id],
          avatar: [],
        },
      });
      return;
    }
    if (
      request.method() === "GET" &&
      url.pathname.endsWith("/orders") &&
      url.searchParams.get("status") === "in cart"
    ) {
      await route.fulfill({
        json: {
          rows: [{ id: orderId, amount: 1, product }],
          count: 1,
        },
      });
      return;
    }
    if (url.pathname.endsWith(`/products/${product.id}`)) {
      await route.fulfill({ json: product });
      return;
    }
    await route.fulfill({ json: {} });
  });

  await page.goto("/cart");
  await expect(page.getByText(product.title)).toBeVisible();

  const updateRequestPromise = page.waitForRequest(
    (request) =>
      request.method() === "PUT" &&
      new URL(request.url()).pathname.endsWith(`/orders/${orderId}`),
  );
  await page.getByRole("button", { name: "+", exact: true }).click();
  const updateRequest = await updateRequestPromise;
  expect(updateRequest.postDataJSON()).toMatchObject({
    id: orderId,
    data: { product: product.id, amount: 2, user: "admin-1" },
  });

  const deleteRequestPromise = page.waitForRequest(
    (request) =>
      request.method() === "DELETE" &&
      new URL(request.url()).pathname.endsWith(`/orders/${orderId}`),
  );
  await page.getByAltText("close").locator("..").click();
  await deleteRequestPromise;
  await expect(page.getByText(product.title)).toHaveCount(0);
});

test("shop sidebar preserves its filters and legacy spacing", async ({
  page,
}) => {
  await page.unroute("**/api/**");
  await installApiMocks(page, [product]);
  await page.goto("/shop");

  const filtersButton = page.getByRole("button", { name: "Filters" });
  const mobileFilters = (page.viewportSize()?.width ?? 1440) <= 768;
  if (mobileFilters) {
    await expect(filtersButton).toBeVisible();
    await filtersButton.click();
  }
  const sidebar = page
    .locator(
      mobileFilters
        ? '[class*="filterColumn"][class*="showFilter"]'
        : '[class*="filterColumn"]',
    )
    .first();
  await expect(sidebar).toBeVisible();

  await expect(
    sidebar.getByRole("heading", { name: "CATEGORIES" }),
  ).toBeVisible();
  await expect(sidebar.getByRole("heading", { name: "PRICE" })).toBeVisible();
  await expect(sidebar.getByRole("heading", { name: "BRANDS" })).toBeVisible();
  await expect(
    sidebar.getByRole("heading", { name: "AVAILABILITY" }),
  ).toBeVisible();

  const checkboxes = sidebar.getByRole("checkbox");
  await expect(checkboxes).toHaveCount(13);
  await expect(checkboxes.first().locator("..")).toHaveCSS(
    "margin-bottom",
    "7px",
  );

  const sliders = sidebar.getByRole("slider");
  await expect(sliders).toHaveCount(2);
  await expect(sidebar.locator(".input-range__label")).toHaveText([
    "0 $",
    "1000 $",
  ]);
  const rangeGeometry = await sidebar
    .locator(".input-range")
    .evaluate((range) => {
      const track = range.querySelector(".input-range__track--background");
      const thumbs = [...range.querySelectorAll(".input-range__slider")];
      if (!track || thumbs.length !== 2) return null;
      const trackRect = track.getBoundingClientRect();
      return {
        trackCenter: trackRect.top + trackRect.height / 2,
        thumbCenters: thumbs.map((thumb) => {
          const rect = thumb.getBoundingClientRect();
          return rect.top + rect.height / 2;
        }),
      };
    });
  expect(rangeGeometry).not.toBeNull();
  for (const center of rangeGeometry?.thumbCenters ?? []) {
    expect(
      Math.abs(center - (rangeGeometry?.trackCenter ?? center)),
    ).toBeLessThan(0.25);
  }
  await sliders.first().press("ArrowRight");
  await expect(sidebar.locator(".input-range__label").first()).toHaveText(
    "1 $",
  );

  await sidebar.getByText("Furniture", { exact: true }).click();
  await expect(checkboxes.first()).toBeChecked();
  await expect(page.getByText(product.title)).toBeVisible();
});

test("shop grid and sorting preserve the legacy storefront layout", async ({
  page,
}) => {
  await page.unroute("**/api/**");
  await installApiMocks(page, gridProducts);
  await page.goto("/shop");

  const images = page.locator('[class*="productImage"]');
  await expect(images).toHaveCount(6);
  const geometry = await images.evaluateAll((nodes) =>
    nodes.map((image) => {
      const card = image.closest(".col-lg-4");
      const row = card?.parentElement;
      const imageRect = image.getBoundingClientRect();
      const cardRect = card?.getBoundingClientRect();
      const rowRect = row?.getBoundingClientRect();
      return {
        image: { width: imageRect.width, height: imageRect.height },
        card: cardRect
          ? { x: cardRect.x, y: cardRect.y, width: cardRect.width }
          : null,
        rowWidth: rowRect?.width ?? 0,
        cardPadding: card ? getComputedStyle(card).padding : "",
      };
    }),
  );

  for (const item of geometry) {
    expect(item.image.height).toBeCloseTo(264, 0);
    expect(item.cardPadding).toBe("0px 20px");
    expect(item.card).not.toBeNull();
    expect(item.image.width).toBeCloseTo((item.card?.width ?? 40) - 40, 0);
  }

  const desktop = (page.viewportSize()?.width ?? 1440) > 768;
  if (desktop) {
    expect(geometry[0]?.card?.y).toBeCloseTo(geometry[2]?.card?.y ?? 0, 0);
    expect(geometry[3]?.card?.y ?? 0).toBeGreaterThan(
      geometry[0]?.card?.y ?? 0,
    );
    expect(geometry[0]?.card?.width).toBeCloseTo(
      (geometry[0]?.rowWidth ?? 0) / 3,
      0,
    );
  }

  const productInfo = page.locator('[class*="productInfo"]').first();
  await expect(productInfo.locator("a").first()).toHaveCSS(
    "text-decoration-line",
    "none",
  );
  await expect(productInfo.locator("a").nth(1)).toHaveCSS(
    "text-decoration-line",
    "none",
  );
  await expect(page.locator(".pagination")).toHaveCount(0);

  const sort = page.locator("select");
  if (desktop) {
    await expect(sort).toHaveClass(/form-control/);
    await expect(sort).toHaveCSS("width", "180px");
    await expect(sort).toHaveCSS("height", "50px");
    await expect(sort).toHaveCSS("border-radius", "0px");
    const orderBefore = await page
      .locator('[class*="productInfo"] h6.fw-bold')
      .allTextContents();
    await sort.selectOption("Price: low to high");
    await expect(sort).toHaveValue("Price: low to high");
    await expect(page.locator('[class*="productInfo"] h6.fw-bold')).toHaveText(
      orderBefore,
    );
  } else {
    await expect(sort).toHaveCount(0);
  }
});

test("wishlist preserves its product layout and cart contract", async ({
  page,
}) => {
  await page.addInitScript((productId) => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify([{ amount: 1, product: productId }]),
    );
  }, product.id);

  await page.goto("/wishlist");
  await expect(page.getByText(product.title)).toBeVisible();
  await expect(page.getByText("Furniture")).toBeVisible();
  await expect(page.getByText("$199")).toBeVisible();
  await expect(page.getByText("IN STOCK")).toBeVisible();

  const productImage = page.getByAltText(product.title);
  await expect(productImage).toHaveCSS("margin-right", "21px");
  await expect(page.getByText("Furniture")).toHaveCSS(
    "color",
    "rgb(85, 85, 85)",
  );

  await page.getByRole("button", { name: /add to cart/i }).click();
  await expect(page.getByText("No items")).toBeVisible();
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("products") ?? "[]"),
    ),
  ).toHaveLength(1);
});

test("shared product benefits preserve the legacy tablet layout", async ({
  page,
  isMobile,
}) => {
  test.skip(
    Boolean(isMobile),
    "Tablet geometry uses the desktop browser context",
  );
  await page.setViewportSize({ width: 800, height: 900 });
  await page.goto("/categories");

  const items = page.locator('[class*="InfoBlock_infoItem"]');
  await expect(items).toHaveCount(3);

  const geometry = await items.evaluateAll((nodes) => {
    const row = nodes[0]?.parentElement?.getBoundingClientRect();
    return {
      row: row ? { x: row.x, width: row.width } : null,
      items: nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { x: rect.x, width: rect.width };
      }),
    };
  });

  expect(geometry.row).not.toBeNull();
  expect(geometry.row?.x).toBeCloseTo(40, 0);
  expect(geometry.row?.width).toBeCloseTo(720, 0);
  geometry.items.forEach((item, index) => {
    expect(item.x).toBeCloseTo(40 + index * 240, 0);
    expect(item.width).toBeCloseTo(240, 0);
  });

  await expect(items.nth(0)).toHaveCSS(
    "border-right",
    "1px solid rgb(217, 217, 217)",
  );
  await expect(items.nth(1)).toHaveCSS(
    "border-right",
    "1px solid rgb(217, 217, 217)",
  );
  await expect(items.nth(2)).toHaveCSS("border-right-width", "0px");

  await page.setViewportSize({ width: 768, height: 900 });

  const boundaryGeometry = await items.evaluateAll((nodes) => {
    const info = nodes[0]?.parentElement?.parentElement?.parentElement;
    const row = nodes[0]?.parentElement;
    const infoRect = info?.getBoundingClientRect();
    const rowStyle = row ? getComputedStyle(row) : null;

    return {
      info: infoRect ? { height: infoRect.height } : null,
      rowDirection: rowStyle?.flexDirection,
      items: nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { height: rect.height, width: rect.width };
      }),
    };
  });

  expect(boundaryGeometry.info?.height).toBeCloseTo(97, 0);
  expect(boundaryGeometry.rowDirection).toBe("row");
  boundaryGeometry.items.forEach((item) => {
    expect(item.height).toBeCloseTo(97, 0);
    expect(item.width).toBeCloseTo(240, 0);
  });
  await expect(items.nth(0)).toHaveCSS("border-right-width", "0px");
  await expect(items.nth(1)).toHaveCSS("border-right-width", "0px");
});

test("shared Instagram strip preserves the legacy responsive layout", async ({
  page,
  isMobile,
}) => {
  await page.goto("/categories");

  const heading = page.getByRole("heading", {
    name: "Follow us on Instagram",
  });
  const section = heading.locator("..");
  const row = section.locator(".row");
  const columns = row.locator(":scope > div");
  const images = row.locator("img");

  await expect(heading).toHaveCSS("font-size", "24.5px");
  await expect(heading).toHaveCSS("line-height", "29.4px");
  await expect(heading).toHaveCSS("margin-bottom", "21px");
  await expect(section).toHaveCSS("margin-top", "80px");
  await expect(section).toHaveCSS("margin-bottom", "80px");
  await expect(columns).toHaveCount(6);
  await expect(images).toHaveCount(6);

  const viewportWidth = page.viewportSize()?.width ?? 1440;
  const columnsPerRow = viewportWidth >= 768 ? 6 : viewportWidth >= 576 ? 3 : 2;
  const expectedWidth = viewportWidth / columnsPerRow;
  const geometry = await columns.evaluateAll((nodes) => {
    const rowRect = nodes[0]?.parentElement?.getBoundingClientRect();
    return {
      row: rowRect ? { x: rowRect.x, width: rowRect.width } : null,
      columns: nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        const imageRect = node.querySelector("img")?.getBoundingClientRect();
        const style = getComputedStyle(node);
        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          position: style.position,
          paddingLeft: style.paddingLeft,
          paddingRight: style.paddingRight,
          imageWidth: imageRect?.width ?? 0,
          imageHeight: imageRect?.height ?? 0,
        };
      }),
    };
  });

  expect(geometry.row).not.toBeNull();
  expect(geometry.row?.x).toBeCloseTo(0, 0);
  expect(geometry.row?.width).toBeCloseTo(viewportWidth, 0);
  geometry.columns.forEach((column, index) => {
    expect(column.x).toBeCloseTo((index % columnsPerRow) * expectedWidth, 0);
    expect(column.width).toBeCloseTo(expectedWidth, 0);
    expect(column.position).toBe("relative");
    expect(column.paddingLeft).toBe("0px");
    expect(column.paddingRight).toBe("0px");
    expect(column.imageWidth).toBeCloseTo(expectedWidth, 0);
    expect(column.imageHeight).toBeGreaterThan(0);
    if (index >= columnsPerRow) {
      expect(column.y).toBeGreaterThan(
        geometry.columns[index - columnsPerRow]?.y ?? 0,
      );
    }
  });

  if (!isMobile) {
    await page.setViewportSize({ width: 576, height: 900 });

    const boundaryColumns = await columns.evaluateAll((nodes) =>
      nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { x: rect.x, y: rect.y, width: rect.width };
      }),
    );

    boundaryColumns.forEach((column, index) => {
      expect(column.x).toBeCloseTo((index % 3) * 192, 0);
      expect(column.width).toBeCloseTo(192, 0);
      if (index >= 3) {
        expect(column.y).toBeGreaterThan(boundaryColumns[index - 3]?.y ?? 0);
      }
    });
  }
});

test("blog page preserves the legacy main layout", async ({
  page,
  isMobile,
}) => {
  await page.goto("/blog");

  const blogHeading = page.getByRole("heading", { name: "Blog", exact: true });
  const searchHeading = page.getByRole("heading", {
    name: "Search",
    exact: true,
  });
  const recentHeading = page.getByRole("heading", {
    name: "Recent Posts",
    exact: true,
  });
  const container = blogHeading.locator(
    "xpath=ancestor::*[contains(concat(' ', normalize-space(@class), ' '), ' container ')][1]",
  );
  const posts = container.locator('div[class*="blogPost"]');
  const firstPost = posts.first();
  const firstImage = firstPost.getByAltText("img1");
  const firstAuthor = firstPost.getByText("Hillary Johnson", { exact: true });
  const firstTitle = firstPost.getByRole("heading", {
    name: "Wall Murals Add Your Interior Design Maximum Escapism",
  });
  const searchInput = page.getByPlaceholder("Index in blog");
  const categoryHeading = page.getByRole("heading", {
    name: "Cathegories",
    exact: true,
  });
  const categoryRows = container.locator('div[class*="categroryWrapper"]');
  const categoryLinks = categoryRows.locator("a");
  const categoryAmounts = categoryRows.locator('p[class*="categoryAmount"]');
  const dividers = container.locator("hr");
  const recentRow = recentHeading.locator("xpath=following-sibling::*[1]");
  const recentCards = recentRow.locator(":scope > div");
  const recentImage = container.getByAltText("article", { exact: true });
  const recentDate = container
    .getByText("March 12, 2020", { exact: true })
    .first();

  await expect(posts).toHaveCount(blogPosts.length);
  await expect(blogHeading).toHaveCSS("font-size", "24.5px");
  await expect(blogHeading).toHaveCSS("line-height", "29.4px");
  await expect(searchHeading).toHaveCSS("font-size", "24.5px");
  await expect(recentHeading).toHaveCSS("font-size", "24.5px");
  await expect(firstImage).toHaveCSS("height", "500px");
  await expect(firstAuthor).toHaveCSS("color", "rgb(189, 116, 76)");
  await expect(firstTitle.locator("..")).toHaveCSS(
    "text-decoration-line",
    "none",
  );
  await expect(categoryHeading).toHaveCSS("font-size", "14px");
  await expect(categoryHeading).toHaveCSS("font-weight", "700");
  await expect(categoryHeading).toHaveCSS("margin-bottom", "21px");
  await expect(categoryRows).toHaveCount(6);
  await expect(categoryLinks).toHaveCount(6);
  await expect(categoryAmounts).toHaveCount(6);
  for (const link of await categoryLinks.all()) {
    await expect(link).toHaveCSS("text-decoration-line", "none");
    await expect(link).toHaveCSS("font-size", "14px");
    await expect(link).toHaveCSS("font-weight", "300");
    await expect(link).toHaveCSS("color", "rgb(60, 72, 79)");
  }
  for (const amount of await categoryAmounts.all()) {
    await expect(amount).toHaveCSS("font-weight", "700");
    await expect(amount).toHaveCSS("margin-bottom", "0px");
  }
  await expect(
    container.getByText("Read More").first().locator(".."),
  ).toHaveCSS("text-decoration-line", "none");
  await expect(searchInput).toHaveCSS("color", "rgb(73, 80, 87)");
  await expect(dividers.first()).toHaveCSS("box-sizing", "content-box");
  await expect(dividers.first()).toHaveCSS("height", "0px");
  await expect(dividers.first()).toHaveCSS("opacity", "1");
  await expect(dividers.first()).toHaveCSS("overflow", "visible");
  await expect(dividers.first()).toHaveCSS("color", "rgb(128, 128, 128)");
  await expect(recentCards).toHaveCount(2);
  await expect(recentCards.first()).toHaveCSS("padding", "0px 20px");
  await expect(recentCards.first()).toHaveCSS("margin-bottom", "21px");
  await expect(recentDate).toHaveCSS("color", "rgb(85, 85, 85)");
  await expect(recentDate).toHaveCSS("margin-top", "14px");

  const readRect = (locator: typeof container) =>
    locator.evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      };
    });
  const [
    containerRect,
    blogHeadingRect,
    firstPostRect,
    firstImageRect,
    firstAuthorRect,
    firstTitleRect,
    searchHeadingRect,
    searchInputRect,
    firstDividerRect,
    categoryHeadingRect,
    firstCategoryRect,
    lastCategoryRect,
    secondDividerRect,
    recentHeadingRect,
    firstRecentCardRect,
    recentImageRect,
    recentDateRect,
  ] = await Promise.all([
    readRect(container),
    readRect(blogHeading),
    readRect(firstPost),
    readRect(firstImage),
    readRect(firstAuthor),
    readRect(firstTitle),
    readRect(searchHeading),
    readRect(searchInput),
    readRect(dividers.first()),
    readRect(categoryHeading),
    readRect(categoryRows.first()),
    readRect(categoryRows.last()),
    readRect(dividers.nth(1)),
    readRect(recentHeading),
    readRect(recentCards.first()),
    readRect(recentImage),
    readRect(recentDate),
  ]);
  const expectWithinOnePixel = (actual: number, expected: number) => {
    expect(Math.abs(actual - expected)).toBeLessThan(1);
  };

  expectWithinOnePixel(containerRect.y, 92);
  expectWithinOnePixel(blogHeadingRect.y, 92);
  expectWithinOnePixel(blogHeadingRect.height, 29.4);
  expectWithinOnePixel(firstPostRect.y, 163.4);
  expectWithinOnePixel(firstImageRect.y, 163.4);
  expectWithinOnePixel(firstImageRect.height, 500);
  expectWithinOnePixel(firstAuthorRect.y, 695.4);
  expectWithinOnePixel(firstTitleRect.y, 719.4);

  if (isMobile) {
    expectWithinOnePixel(containerRect.x, 0);
    expectWithinOnePixel(containerRect.width, 390);
    expectWithinOnePixel(blogHeadingRect.x, 20);
    expectWithinOnePixel(blogHeadingRect.width, 350);
    expectWithinOnePixel(firstPostRect.x, 20);
    expectWithinOnePixel(firstPostRect.width, 350);
    expectWithinOnePixel(firstPostRect.height, 790);
    expectWithinOnePixel(searchHeadingRect.x, 20);
    expectWithinOnePixel(searchHeadingRect.y, 3551.4);
    expectWithinOnePixel(searchInputRect.x, 20);
    expectWithinOnePixel(searchInputRect.y, 3601.8);
    expectWithinOnePixel(searchInputRect.width, 350);
    expectWithinOnePixel(firstDividerRect.y, 3683.8);
    expectWithinOnePixel(categoryHeadingRect.y, 3726.8);
    expectWithinOnePixel(firstCategoryRect.y, 3764.6);
    expectWithinOnePixel(lastCategoryRect.y, 3939.6);
    expectWithinOnePixel(secondDividerRect.y, 4002.6);
    expectWithinOnePixel(recentHeadingRect.x, 20);
    expectWithinOnePixel(recentHeadingRect.y, 4045.6);
    expectWithinOnePixel(firstRecentCardRect.x, 0);
    expectWithinOnePixel(firstRecentCardRect.width, 390);
    expectWithinOnePixel(recentImageRect.x, 20);
    expectWithinOnePixel(recentImageRect.y, 4117);
    expectWithinOnePixel(recentImageRect.width, 350);
    expectWithinOnePixel(recentImageRect.height, 240.4);
    expectWithinOnePixel(recentDateRect.y, 4371.4);
  } else {
    expectWithinOnePixel(containerRect.x, 150);
    expectWithinOnePixel(containerRect.width, 1140);
    expectWithinOnePixel(blogHeadingRect.x, 170);
    expectWithinOnePixel(blogHeadingRect.width, 720);
    expectWithinOnePixel(firstPostRect.x, 170);
    expectWithinOnePixel(firstPostRect.width, 720);
    expectWithinOnePixel(firstPostRect.height, 682);
    expectWithinOnePixel(searchHeadingRect.x, 930);
    expectWithinOnePixel(searchHeadingRect.y, 92);
    expectWithinOnePixel(searchInputRect.x, 930);
    expectWithinOnePixel(searchInputRect.y, 142.4);
    expectWithinOnePixel(searchInputRect.width, 340);
    expectWithinOnePixel(firstDividerRect.y, 224.4);
    expectWithinOnePixel(categoryHeadingRect.y, 267.4);
    expectWithinOnePixel(firstCategoryRect.y, 305.2);
    expectWithinOnePixel(lastCategoryRect.y, 480.2);
    expectWithinOnePixel(secondDividerRect.y, 543.2);
    expectWithinOnePixel(recentHeadingRect.x, 930);
    expectWithinOnePixel(recentHeadingRect.y, 586.2);
    expectWithinOnePixel(firstRecentCardRect.x, 910);
    expectWithinOnePixel(firstRecentCardRect.width, 380);
    expectWithinOnePixel(recentImageRect.x, 930);
    expectWithinOnePixel(recentImageRect.y, 657.6);
    expectWithinOnePixel(recentImageRect.width, 340);
    expectWithinOnePixel(recentImageRect.height, 233.5);
    expectWithinOnePixel(recentDateRect.y, 905.1);
  }
});

test("blog article preserves the legacy layout", async ({ page, isMobile }) => {
  await page.goto("/blog/article");

  const hero = page.getByAltText("header", { exact: true });
  const title = page.getByRole("heading", {
    name: "The beauty of astronomy is that anybody can do it",
  });
  const main = title.locator(
    "xpath=ancestor::*[contains(concat(' ', normalize-space(@class), ' '), ' container ')][1]",
  );
  const avatar = main.getByAltText("person", { exact: true });
  const author = main.getByText("By James Lee Cooper", { exact: true });
  const articleImage = main.getByAltText("article", { exact: true });
  const caption = main.getByText(
    "There is a lot of exciting stuff going on in the stars",
    { exact: true },
  );
  const dividers = main.locator("hr");
  const moreHeading = page.getByRole("heading", {
    name: "More From Our Blog",
    exact: true,
  });
  const moreContainer = moreHeading.locator(
    "xpath=ancestor::*[contains(concat(' ', normalize-space(@class), ' '), ' container ')][1]",
  );
  const moreCards = moreContainer
    .locator(":scope > .row")
    .last()
    .locator(":scope > div");
  const moreImages = moreCards.locator("img");
  const readMoreLinks = moreContainer.getByRole("link", {
    name: "Read More",
  });
  const finalContainer = moreContainer.locator("xpath=following-sibling::*[1]");

  await expect(title).toHaveCSS("font-size", "40px");
  await expect(title).toHaveCSS("line-height", "60px");
  await expect(avatar).toHaveCSS("margin-right", "14px");
  await expect(caption).toHaveCSS("color", "rgb(85, 85, 85)");
  await expect(dividers).toHaveCount(2);
  await expect(dividers.first()).toHaveCSS("box-sizing", "content-box");
  await expect(dividers.first()).toHaveCSS("height", "0px");
  await expect(dividers.first()).toHaveCSS("opacity", "1");
  await expect(dividers.first()).toHaveCSS("overflow", "visible");
  await expect(dividers.first()).toHaveCSS("color", "rgb(128, 128, 128)");
  await expect(moreHeading).toHaveCSS("font-size", "24.5px");
  await expect(moreHeading).toHaveCSS("line-height", /^29\.4/);
  await expect(moreCards).toHaveCount(3);
  await expect(moreImages).toHaveCount(3);
  await expect(moreImages.first()).toHaveCSS("display", "block");
  await expect(readMoreLinks).toHaveCount(3);
  for (const link of await readMoreLinks.all()) {
    await expect(link).toHaveCSS("text-decoration-line", "none");
  }

  const readRect = (locator: typeof title) =>
    locator.evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      };
    });
  const [
    heroRect,
    mainRect,
    titleRect,
    avatarRect,
    authorRect,
    articleImageRect,
    moreContainerRect,
    firstCardRect,
    finalContainerRect,
  ] = await Promise.all([
    readRect(hero),
    readRect(main),
    readRect(title),
    readRect(avatar),
    readRect(author),
    readRect(articleImage),
    readRect(moreContainer),
    readRect(moreCards.first()),
    readRect(finalContainer),
  ]);
  const expectWithinOnePixel = (actual: number, expected: number) => {
    expect(Math.abs(actual - expected)).toBeLessThan(1);
  };

  expectWithinOnePixel(heroRect.y, 160);
  expectWithinOnePixel(mainRect.x, isMobile ? 0 : 150);
  expectWithinOnePixel(titleRect.x, isMobile ? 20 : 390);
  expectWithinOnePixel(avatarRect.x, isMobile ? 20 : 390);
  expectWithinOnePixel(authorRect.x, isMobile ? 87 : 457);
  expectWithinOnePixel(articleImageRect.width, 1110);
  expectWithinOnePixel(moreContainerRect.y, isMobile ? 3189.8 : 2754.6);
  expectWithinOnePixel(firstCardRect.y, isMobile ? 3352.2 : 2875);
  expectWithinOnePixel(finalContainerRect.y, isMobile ? 4489 : 3300.4);

  if (isMobile) {
    expectWithinOnePixel(heroRect.width, 390);
    expectWithinOnePixel(heroRect.height, 119.2);
    expectWithinOnePixel(mainRect.width, 390);
    expectWithinOnePixel(mainRect.y, 321.2);
    expectWithinOnePixel(titleRect.width, 350);
    expectWithinOnePixel(titleRect.height, 240);
    expectWithinOnePixel(articleImageRect.x, -360);
  } else {
    expectWithinOnePixel(heroRect.width, 1440);
    expectWithinOnePixel(heroRect.height, 440);
    expectWithinOnePixel(mainRect.width, 1140);
    expectWithinOnePixel(mainRect.y, 642);
    expectWithinOnePixel(titleRect.width, 660);
    expectWithinOnePixel(titleRect.height, 120);
    expectWithinOnePixel(articleImageRect.x, 165);
  }
});

test("account page preserves the legacy My Account and My Orders layout", async ({
  page,
  isMobile,
}) => {
  await page.goto("/account");

  const accountHeading = page.getByRole("heading", {
    name: "My Account",
    exact: true,
  });
  const ordersHeading = page.getByRole("heading", {
    name: "My Orders",
    exact: true,
  });
  const container = accountHeading.locator(
    "xpath=ancestor::*[contains(concat(' ', normalize-space(@class), ' '), ' container ')][1]",
  );
  const promos = page.locator('section[class*="promo"]');
  const table = page.getByRole("table");
  const profile = page
    .getByText("Michael Daineka", { exact: true })
    .locator("xpath=ancestor::section[1]");

  await expect(accountHeading).toHaveCSS("font-size", "24.5px");
  await expect(accountHeading).toHaveCSS("line-height", "29.4px");
  await expect(ordersHeading).toHaveCSS("font-size", "24.5px");
  await expect(promos).toHaveCount(2);
  await expect(promos.first()).toHaveCSS("height", "200px");
  await expect(page.locator(".text-muted").first()).toHaveCSS(
    "color",
    "rgb(85, 85, 85)",
  );
  await expect(table.locator("th").first()).toHaveCSS("padding-top", "10.5px");
  await expect(table.locator("th").first()).toHaveCSS(
    "padding-bottom",
    "10.5px",
  );
  await expect(table.locator("tbody td").first()).toHaveCSS(
    "padding-bottom",
    "10.5px",
  );
  await expect(table).toHaveCSS("vertical-align", "baseline");
  await expect(table.locator("thead")).toHaveCSS("vertical-align", "middle");
  await expect(table.locator("tbody tr").first()).toHaveCSS(
    "vertical-align",
    "middle",
  );
  await expect(table.locator("tbody td").first()).toHaveCSS(
    "border-top-style",
    "none",
  );
  await expect(table.locator("tbody td").first()).toHaveCSS(
    "border-bottom-style",
    "none",
  );
  await expect(page.locator('img[src*="products"]').first()).toHaveCSS(
    "margin-right",
    "21px",
  );
  await expect(page.locator('img[alt="visa"]')).toHaveCSS(
    "margin-right",
    "14px",
  );
  await expect(profile).toHaveCSS("background-color", "rgb(245, 245, 245)");
  await expect(profile).toHaveCSS("padding", "30px 40px");
  await expect(profile.locator('img[alt="avatar"]')).toHaveCSS("width", "80px");
  await expect(profile.locator('img[alt="avatar"]')).toHaveCSS(
    "height",
    "80px",
  );
  await expect(profile.locator('img[alt="settings"]')).toHaveCSS("top", "15px");
  await expect(profile.locator('img[alt="settings"]')).toHaveCSS(
    "right",
    "15px",
  );

  const profileDivider = profile.locator("hr").first();
  await expect(profileDivider).toHaveCSS("box-sizing", "content-box");
  await expect(profileDivider).toHaveCSS("height", "0px");
  await expect(profileDivider).toHaveCSS("opacity", "1");
  await expect(profileDivider).toHaveCSS("overflow", "visible");
  await expect(profileDivider).toHaveCSS("color", "rgb(128, 128, 128)");

  const readRect = (locator: typeof container) =>
    locator.evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      };
    });
  const [
    containerRect,
    headingRect,
    promoOne,
    promoTwo,
    ordersRect,
    tableRect,
    profileRect,
  ] = await Promise.all([
    readRect(container),
    readRect(accountHeading),
    readRect(promos.first()),
    readRect(promos.nth(1)),
    readRect(ordersHeading),
    readRect(table),
    readRect(profile),
  ]);
  const expectWithinOnePixel = (actual: number, expected: number) => {
    expect(Math.abs(actual - expected)).toBeLessThan(1);
  };

  if (isMobile) {
    const tableWrapper = table.locator("..");
    await expect(tableWrapper).toHaveCSS("overflow-x", "auto");
    expect(
      await tableWrapper.evaluate((node) => ({
        clientWidth: node.clientWidth,
        scrollWidth: node.scrollWidth,
      })),
    ).toEqual({ clientWidth: 390, scrollWidth: 540 });

    expect(containerRect).toMatchObject({ x: 0, y: 92, width: 390 });
    expect(headingRect).toMatchObject({ x: 20, y: 92, width: 350 });
    expect(promoOne).toMatchObject({ x: 20, width: 350, height: 200 });
    expect(promoTwo).toMatchObject({ x: 20, width: 350, height: 200 });
    expectWithinOnePixel(promoOne.y, 142.4);
    expectWithinOnePixel(promoTwo.y, 372.4);
    expectWithinOnePixel(ordersRect.y, 614.4);
    expect(tableRect).toMatchObject({ x: 20, width: 500 });
    expectWithinOnePixel(tableRect.y, 664.8);
    expectWithinOnePixel(tableRect.height, 463.74);
    expect(profileRect).toMatchObject({ x: 20, width: 350 });
    expectWithinOnePixel(profileRect.y, 1142.54);
    expectWithinOnePixel(profileRect.height, 735.19);
  } else {
    expect(containerRect).toMatchObject({ x: 150, y: 92, width: 1140 });
    expect(headingRect).toMatchObject({ x: 170, y: 92, width: 720 });
    expect(promoOne).toMatchObject({ x: 170, width: 340, height: 200 });
    expect(promoTwo).toMatchObject({ x: 550, width: 340, height: 200 });
    expectWithinOnePixel(promoOne.y, 142.4);
    expectWithinOnePixel(promoTwo.y, 142.4);
    expectWithinOnePixel(ordersRect.y, 384.4);
    expect(tableRect).toMatchObject({ x: 170, width: 720 });
    expectWithinOnePixel(tableRect.y, 434.8);
    expectWithinOnePixel(tableRect.height, 463.74);
    expect(profileRect).toMatchObject({ x: 930, y: 92, width: 340 });
    expectWithinOnePixel(profileRect.height, 820.54);
  }
});

test("local authentication still opens the admin area", async ({ page }) => {
  await page.goto("/login");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/admin\/dashboard$/);
  expect(await page.evaluate(() => localStorage.getItem("token"))).toBe(
    authToken,
  );
});

test("login preserves its form layout and password controls", async ({
  page,
}) => {
  await page.goto("/login");
  await expect(page).toHaveTitle("Login | Ecommerce");

  const email = page.getByLabel("Email");
  const password = page.getByLabel("Password");
  await expect(email).toHaveValue("admin@flatlogic.com");
  await expect(password).toHaveValue("password");
  await expect(password).toHaveAttribute("type", "password");

  await page.locator('img[src*="eye-off"]').click();
  await expect(password).toHaveAttribute("type", "text");

  const createAccount = page.getByRole("link", { name: "Create an account" });
  await expect(createAccount).toHaveAttribute("href", "/register");
  await expect(createAccount).toHaveCSS("font-weight", "300");
  await expect(createAccount).toHaveCSS("text-decoration-line", "none");
  await expect(page.getByRole("button", { name: "Login" })).toHaveCSS(
    "color",
    "rgb(255, 255, 255)",
  );
  await expect(
    page.getByRole("link", { name: "Forgot password" }),
  ).toHaveAttribute("href", "/forgot");
});

test("forgot password preserves the production form layout", async ({
  page,
  isMobile,
}) => {
  await page.goto("/forgot");
  await expect(page).toHaveTitle("Forgot password | Ecommerce");

  const widget = page.locator(".widget-auth");
  const heading = page.getByRole("heading", { name: "Forgot password?" });
  const input = widget.getByPlaceholder("Email");
  const formGroup = input.locator("..");
  const button = page.getByRole("button", { name: "Send" });
  const accountLink = page.getByRole("link", {
    name: "Enter the account",
  });
  const logoIcons = page.locator(".auth-logo svg");

  await expect(widget).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(widget).toHaveCSS("margin-bottom", "40px");
  await expect(heading).toHaveCSS("color", "rgb(68, 68, 68)");
  await expect(heading).toHaveCSS("font-size", "24.5px");
  await expect(heading).toHaveCSS("line-height", /29\.4\d*px/);
  await expect(heading).toHaveCSS("margin", "0px");
  await expect(formGroup).toHaveCSS("margin-bottom", "14px");
  await expect(input).toHaveCSS("background-color", "rgb(242, 242, 242)");
  await expect(input).toHaveCSS("color", "rgb(73, 80, 87)");
  await expect(button).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(accountLink).toHaveAttribute("href", "/login");
  await expect(accountLink).toHaveCSS("display", "inline");
  await expect(accountLink).toHaveCSS("text-decoration-line", "none");
  await expect(logoIcons).toHaveCount(2);

  for (const icon of await logoIcons.all()) {
    await expect(icon).toHaveCSS("display", "inline-block");
    await expect(icon).toHaveCSS("width", "13px");
    await expect(icon).toHaveCSS("height", "13px");
    await expect(icon).toHaveCSS("margin-left", "20px");
    await expect(icon).toHaveCSS("margin-right", "20px");
  }

  const elementSize = (node: Element) => {
    const { width, height } = node.getBoundingClientRect();
    return { width, height };
  };
  const [widgetRect, inputRect, buttonRect] = await Promise.all([
    widget.evaluate(elementSize),
    input.evaluate(elementSize),
    button.evaluate(elementSize),
  ]);

  expect(widgetRect.width).toBe(isMobile ? 350 : 360);
  expect(inputRect).toEqual({ width: isMobile ? 290 : 300, height: 40 });
  expect(buttonRect.width).toBe(isMobile ? 290 : 300);
  expect(Math.abs(buttonRect.height - 48.38)).toBeLessThan(1);
});

test("checkout redirects with the URL returned by the API", async ({
  page,
}) => {
  await page.route("https://checkout.stripe.com/**", (route) =>
    route.fulfill({ body: "checkout" }),
  );
  await page.goto("/billing");
  await page.waitForLoadState("networkidle");
  const responsePromise = page.waitForResponse((response) =>
    response.url().includes("/payment/session-initiate"),
  );
  await page.getByRole("button", { name: "PLACE ORDER" }).click();
  expect((await responsePromise).status()).toBe(200);
  await expect(page).toHaveURL("https://checkout.stripe.com/c/pay/test");
});

test("admin product CRUD list consumes the unchanged API fields", async ({
  page,
}) => {
  await page.unroute("**/api/**");
  await installApiMocks(page, [product]);
  await page.addInitScript(
    (token) => localStorage.setItem("token", token),
    authToken,
  );
  await page.goto("/admin/products");
  await expect(page.getByText(product.title)).toBeVisible();
  await expect(page.getByRole("button", { name: /new/i })).toBeVisible();
});

test("admin CRUD forms preserve their public paths", async ({ page }) => {
  test.setTimeout(60_000);
  await page.addInitScript(
    (token) => localStorage.setItem("token", token),
    authToken,
  );

  const resources = [
    "blogs",
    "categories",
    "feedback",
    "orders",
    "products",
    "users",
  ];
  for (const resource of resources) {
    const response = await page.goto(`/admin/${resource}/new`);
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("h4").first()).toBeVisible();
  }
});

test("login and storefront preserve their visual layout @visual", async ({
  page,
}) => {
  await page.goto("/login");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("login.png", {
    maxDiffPixelRatio: 0.005,
    animations: "disabled",
    caret: "initial",
  });
  await page.goto("/categories");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("categories.png", {
    maxDiffPixelRatio: 0.005,
    animations: "disabled",
    caret: "initial",
    fullPage: true,
  });
});
