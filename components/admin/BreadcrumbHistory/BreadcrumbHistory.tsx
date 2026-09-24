import React from "react";
import { Breadcrumb, BreadcrumbItem } from "components/compat/bootstrap";
import Link from "components/compat/Link";
import { useRouter } from "components/compat/router";
import axios from "axios";
import { productSchema, type Product } from "types/domain";

const BreadcrumbHistory = ({
  url,
  product,
}: {
  url: string;
  product?: Product | undefined;
}) => {
  const router = useRouter();
  const [fetchedRoute, setFetchedRoute] = React.useState<{
    productId: string;
    items: string[];
  }>();
  const productId = router.query.id ?? url.split("/")[2];
  const categoryName = router.query.categoryName;
  const isProductDetail = url.startsWith("/products/");

  const capitalizeFirstLetter = (value?: string) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1) : "";

  React.useEffect(() => {
    if (!isProductDetail || product || typeof productId !== "string") return;

    let cancelled = false;
    axios
      .get(`/products/${productId}`)
      .then((response) => {
        const parsedProduct = productSchema.parse(response.data);
        const category = parsedProduct.categories[0];
        if (!cancelled) {
          setFetchedRoute({
            productId,
            items: [
              "Products",
              category ? `${category.id}__${category.title}` : "",
              parsedProduct.title,
            ],
          });
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [isProductDetail, product, productId]);

  let route: string[];
  if (isProductDetail) {
    const category = product?.categories[0];
    route = product
      ? [
          "Products",
          category ? `${category.id}__${category.title}` : "",
          product.title,
        ]
      : typeof productId === "string" && fetchedRoute?.productId === productId
        ? fetchedRoute.items
        : [];
  } else {
    route = url
      .split("/")
      .slice(1)
      .map((routePart, index) => {
        if (router.pathname.includes("category") && index === 1) {
          const name =
            typeof categoryName === "string" ? categoryName : categoryName?.[0];
          return name ? capitalizeFirstLetter(name) : "furniture";
        }
        return capitalizeFirstLetter(routePart);
      });
  }

  const renderBreadCrumbs = () => {
    const length = route.length;
    return route.map((item, index) => {
      let middlewareUrl =
        "/" +
        url
          .split("/")
          .slice(1, index + 2)
          .join("/");
      if (isProductDetail && index === 0) {
        middlewareUrl = "/shop";
      } else if (isProductDetail && index === 1) {
        middlewareUrl = `/category/${route[1]?.split("__")[0] ?? ""}`;
        item = capitalizeFirstLetter(route[1]?.split("__")[1]);
      }
      return length > 1 ? (
        <BreadcrumbItem key={`${item}-${index}`}>
          {length === index + 1 ? (
            item
          ) : (
            <Link href={middlewareUrl}>{item}</Link>
          )}
        </BreadcrumbItem>
      ) : null;
    });
  };
  return (
    <div>
      <Breadcrumb
        tag="nav"
        listTag="div"
        style={{
          marginTop: router.pathname.includes("admin")
            ? 0
            : route.length > 1
              ? 85
              : 60,
          borderBottom: route.length > 1 ? "1px solid #d9d9d9" : undefined,
          marginBottom: router.pathname.includes("admin") ? 32 : 0,
        }}
      >
        {renderBreadCrumbs()}
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbHistory;
