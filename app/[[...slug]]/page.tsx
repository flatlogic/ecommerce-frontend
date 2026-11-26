import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegacyRoute } from "../legacy-route";

export const dynamic = "force-dynamic";

const staticRoutes = new Set([
  "/",
  "/about",
  "/about-team",
  "/account",
  "/billing",
  "/blog",
  "/blog/article",
  "/cart",
  "/categories",
  "/contact",
  "/error",
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
  "/admin/dashboard",
  "/admin/password",
  "/admin/documentation/licences",
  "/admin/documentation/overview",
  "/admin/documentation/quick-start",
  "/admin/documentation/whats-inside",
]);

const staticPageTitles: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/about-team": "About Team",
  "/account": "Account",
  "/billing": "Billing",
  "/blog": "Blog",
  "/blog/article": "Blog Article",
  "/cart": "Cart",
  "/categories": "Categories",
  "/contact": "Contact Us",
  "/error": "404",
  "/faq": "FAQ",
  "/forgot": "Forgot password | Ecommerce",
  "/login": "Login | Ecommerce",
  "/register": "Register | Ecommerce",
  "/reset": "Register | Ecommerce",
  "/search": "Search",
  "/search-results": "Search Results",
  "/shop": "Shop",
  "/verify": "Ecommerce",
  "/wishlist": "Wishlist",
  "/admin/dashboard": "Ecommerce dashboard",
  "/admin/password": "Edit Password",
  "/admin/documentation/licences": "Ecommerce Licences",
  "/admin/documentation/overview": "Ecommerce Overview",
  "/admin/documentation/quick-start": "Ecommerce Quick Start",
  "/admin/documentation/whats-inside": "Ecommerce What is inside",
};

const adminResourceTitles: Record<string, string> = {
  blogs: "Blog",
  categories: "Category",
  feedback: "Feedback",
  orders: "Order",
  products: "Product",
  users: "User",
};

const adminListTitles: Record<string, string> = {
  blogs: "Blogs List",
  categories: "Categories List",
  feedback: "Feedback List",
  orders: "Orders List",
  products: "Products List",
  users: "Users List",
};

const id =
  "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";
const dynamicRoute = new RegExp(
  `^(/products/${id}|/category/${id}|/blog/article/${id}|/admin/(blogs|categories|feedback|orders|products|users)(/(new|${id}|edit/${id}))?)$`,
);

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const pathname = `/${slug.join("/")}`.replace(/\/$/, "") || "/";
  let pageTitle = staticPageTitles[pathname];

  const adminMatch = pathname.match(
    /^\/admin\/(blogs|categories|feedback|orders|products|users)(?:\/(new|edit\/[^/]+|[^/]+))?$/,
  );
  if (adminMatch) {
    const resource = adminMatch[1];
    const action = adminMatch[2];
    const resourceTitle = resource ? adminResourceTitles[resource] : undefined;
    if (resourceTitle) {
      pageTitle = !action
        ? adminListTitles[resource ?? ""]
        : action === "new"
          ? `Create new ${resourceTitle.toLowerCase()}`
          : action.startsWith("edit/")
            ? `Edit ${resourceTitle}`
            : `View ${resourceTitle}`;
    }
  }

  return pageTitle ? { title: { absolute: pageTitle } } : {};
}

async function fetchJson(path: string): Promise<unknown> {
  const baseUrl = process.env.API_BASE_URL ?? "http://localhost:8080/api";
  const response = await fetch(`${baseUrl}${path}`, { cache: "no-store" });
  if (!response.ok)
    throw new Error(`API request failed with ${response.status}`);
  return response.json();
}

export default async function Page({ params }: PageProps) {
  const { slug = [] } = await params;
  const pathname = `/${slug.join("/")}`.replace(/\/$/, "") || "/";
  if (!staticRoutes.has(pathname) && !dynamicRoute.test(pathname)) notFound();

  let screenProps: Record<string, unknown> = {};
  let routeError = false;
  try {
    if (pathname === "/") {
      const result = (await fetchJson("/products")) as { rows?: unknown[] };
      screenProps = { products: result.rows ?? [] };
    } else if (pathname.startsWith("/products/")) {
      const id = pathname.split("/").at(-1) ?? "";
      screenProps = {
        product: await fetchJson(`/products/${id}`),
        currentProductId: id,
      };
    } else if (pathname.startsWith("/category/")) {
      const id = pathname.split("/").at(-1) ?? "";
      screenProps = {
        categoryId: id,
        categoryData: await fetchJson(`/categories/${id}`),
      };
    } else if (pathname.startsWith("/blog/article/")) {
      const id = pathname.split("/").at(-1) ?? "";
      screenProps = { post: await fetchJson(`/blogs/${id}`) };
    }
  } catch {
    if (pathname === "/") {
      screenProps = { products: [] };
    } else {
      routeError = true;
    }
  }

  return (
    <LegacyRoute
      pathname={pathname}
      routeError={routeError}
      screenProps={screenProps}
    />
  );
}
