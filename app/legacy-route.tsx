"use client";

import dynamic from "next/dynamic";
import { useEffect, type ComponentType, type ReactNode } from "react";
import { Container } from "components/compat/bootstrap";
import AdminLayout from "components/admin/Layout";
import BreadcrumbHistory from "components/admin/BreadcrumbHistory";
import Footer from "components/e-commerce/Footer";
import Header from "components/e-commerce/Header";
import Sidebar from "components/e-commerce/Sidebar";
import type { Product } from "types/domain";

type ScreenProps = Record<string, unknown>;
type Screen = ComponentType<ScreenProps>;

function lazyScreen(loader: () => Promise<unknown>): Screen {
  return dynamic<ScreenProps>(async () => {
    const loadedModule = await loader();
    return (loadedModule as { default: Screen }).default;
  });
}

const TypedAdminLayout = AdminLayout as unknown as ComponentType<{
  children: ReactNode;
}>;
const TypedBreadcrumbHistory = BreadcrumbHistory as unknown as ComponentType<{
  url: string;
  product?: Product | undefined;
}>;

const screens: Record<string, Screen> = {
  "/": lazyScreen(() => import("legacy-pages/index")),
  "/about": lazyScreen(() => import("legacy-pages/about")),
  "/about-team": lazyScreen(() => import("legacy-pages/about-team")),
  "/account": lazyScreen(() => import("legacy-pages/account")),
  "/billing": lazyScreen(() => import("legacy-pages/billing")),
  "/blog": lazyScreen(() => import("legacy-pages/blog")),
  "/blog/article": lazyScreen(() => import("legacy-pages/blog/article")),
  "/cart": lazyScreen(() => import("legacy-pages/cart")),
  "/categories": lazyScreen(() => import("legacy-pages/categories")),
  "/contact": lazyScreen(() => import("legacy-pages/contact")),
  "/error": lazyScreen(() => import("legacy-pages/error")),
  "/faq": lazyScreen(() => import("legacy-pages/faq")),
  "/forgot": lazyScreen(() => import("legacy-pages/forgot")),
  "/login": lazyScreen(() => import("legacy-pages/login")),
  "/register": lazyScreen(() => import("legacy-pages/register")),
  "/reset": lazyScreen(() => import("legacy-pages/reset")),
  "/search": lazyScreen(() => import("legacy-pages/search")),
  "/search-results": lazyScreen(() => import("legacy-pages/search-results")),
  "/shop": lazyScreen(() => import("legacy-pages/shop")),
  "/verify": lazyScreen(() => import("legacy-pages/verify")),
  "/wishlist": lazyScreen(() => import("legacy-pages/wishlist")),
  "/admin/dashboard": lazyScreen(() => import("legacy-pages/admin/dashboard")),
  "/admin/password": lazyScreen(() => import("legacy-pages/admin/password")),
  "/admin/documentation/licences": lazyScreen(
    () => import("legacy-pages/admin/documentation/licences"),
  ),
  "/admin/documentation/overview": lazyScreen(
    () => import("legacy-pages/admin/documentation/overview"),
  ),
  "/admin/documentation/quick-start": lazyScreen(
    () => import("legacy-pages/admin/documentation/quick-start"),
  ),
  "/admin/documentation/whats-inside": lazyScreen(
    () => import("legacy-pages/admin/documentation/whats-inside"),
  ),
};

const resourceScreens: Record<string, Record<string, Screen>> = {
  blogs: {
    list: lazyScreen(() => import("legacy-pages/admin/blogs")),
    new: lazyScreen(() => import("legacy-pages/admin/blogs/new")),
    view: lazyScreen(() => import("legacy-pages/admin/blogs/[id]")),
    edit: lazyScreen(() => import("legacy-pages/admin/blogs/edit/[id]")),
  },
  categories: {
    list: lazyScreen(() => import("legacy-pages/admin/categories")),
    new: lazyScreen(() => import("legacy-pages/admin/categories/new")),
    view: lazyScreen(() => import("legacy-pages/admin/categories/[id]")),
    edit: lazyScreen(() => import("legacy-pages/admin/categories/edit/[id]")),
  },
  feedback: {
    list: lazyScreen(() => import("legacy-pages/admin/feedback")),
    new: lazyScreen(() => import("legacy-pages/admin/feedback/new")),
    view: lazyScreen(() => import("legacy-pages/admin/feedback/[id]")),
    edit: lazyScreen(() => import("legacy-pages/admin/feedback/edit/[id]")),
  },
  orders: {
    list: lazyScreen(() => import("legacy-pages/admin/orders")),
    new: lazyScreen(() => import("legacy-pages/admin/orders/new")),
    view: lazyScreen(() => import("legacy-pages/admin/orders/[id]")),
    edit: lazyScreen(() => import("legacy-pages/admin/orders/edit/[id]")),
  },
  products: {
    list: lazyScreen(() => import("legacy-pages/admin/products")),
    new: lazyScreen(() => import("legacy-pages/admin/products/new")),
    view: lazyScreen(() => import("legacy-pages/admin/products/[id]")),
    edit: lazyScreen(() => import("legacy-pages/admin/products/edit/[id]")),
  },
  users: {
    list: lazyScreen(() => import("legacy-pages/admin/users")),
    new: lazyScreen(() => import("legacy-pages/admin/users/new")),
    view: lazyScreen(() => import("legacy-pages/admin/users/[id]")),
    edit: lazyScreen(() => import("legacy-pages/admin/users/edit/[id]")),
  },
};

const ProductScreen = lazyScreen(() => import("legacy-pages/products/[id]"));
const CategoryScreen = lazyScreen(() => import("legacy-pages/category/[id]"));
const BlogArticleScreen = lazyScreen(
  () => import("legacy-pages/blog/article/[id]"),
);

function resolveScreen(pathname: string): Screen | undefined {
  if (pathname.startsWith("/products/")) return ProductScreen;
  if (pathname.startsWith("/category/")) return CategoryScreen;
  if (pathname.startsWith("/blog/article/")) return BlogArticleScreen;

  const match = pathname.match(
    /^\/admin\/(blogs|categories|feedback|orders|products|users)(?:\/(new|edit\/[^/]+|[^/]+))?$/,
  );
  if (match) {
    const [, resource, action] = match;
    if (!resource) return undefined;
    const group = resourceScreens[resource];
    if (!group) return undefined;
    if (!action) return group.list;
    if (action === "new") return group.new;
    if (action.startsWith("edit/")) return group.edit;
    return group.view;
  }
  return screens[pathname];
}

export function LegacyRoute({
  pathname,
  routeError = false,
  screenProps,
}: {
  pathname: string;
  routeError?: boolean;
  screenProps: ScreenProps;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  const ScreenComponent = resolveScreen(pathname);
  if (!ScreenComponent) return null;
  const breadcrumbProduct = pathname.startsWith("/products/")
    ? (screenProps.product as Product | undefined)
    : undefined;

  if (routeError) {
    return (
      <>
        <Sidebar />
        <Header />
        <Container>
          <TypedBreadcrumbHistory url={pathname} />
        </Container>
        <div
          style={{
            color: "rgb(0, 0, 0)",
            background: "rgb(255, 255, 255)",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
            height: "100vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                textAlign: "left",
                lineHeight: "49px",
                height: 49,
                verticalAlign: "middle",
              }}
            >
              <h2
                style={{
                  fontSize: 14,
                  fontWeight: "normal",
                  lineHeight: "inherit",
                  margin: 0,
                  padding: 0,
                }}
              >
                An unexpected error has occurred.
              </h2>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // The component comes from a stable module-level route registry.
  // eslint-disable-next-line react-hooks/static-components
  const screen = <ScreenComponent {...screenProps} />;

  if (pathname.startsWith("/admin"))
    return <TypedAdminLayout>{screen}</TypedAdminLayout>;
  if (pathname === "/login" || pathname === "/register") return screen;
  if (pathname.includes("search"))
    return (
      <>
        <Header />
        {screen}
      </>
    );

  return (
    <>
      <Sidebar />
      <Header />
      {pathname !== "/" && (
        <Container>
          <TypedBreadcrumbHistory url={pathname} product={breadcrumbProduct} />
        </Container>
      )}
      {screen}
      <Footer />
    </>
  );
}
