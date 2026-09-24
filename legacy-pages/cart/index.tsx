import React from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
} from "components/compat/bootstrap";
import { useRouter } from "components/compat/router";
import s from "./Cart.module.scss";
import close from "public/images/e-commerce/close.svg";
import axios from "axios";
import Head from "components/compat/Head";
import { toast, ToastContainer } from "react-toastify";
import { useAppSelector } from "@/redux/hooks";
import { productSchema, type Product } from "types/domain";

type CartProduct = Product & { amount: number; orderId?: string };

interface StoredCartItem {
  id?: string;
  product?: string;
  amount: number;
  orderId?: string;
}

function toCartProduct(
  value: unknown,
  amount: unknown,
  orderId?: string,
): CartProduct | null {
  const parsed = productSchema.safeParse(value);
  if (!parsed.success || typeof amount !== "number") return null;

  const product = { ...parsed.data, amount };
  return orderId ? { ...product, orderId } : product;
}

function readStoredCartItems(): StoredCartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const value: unknown = JSON.parse(localStorage.getItem("products") ?? "[]");
    if (!Array.isArray(value)) return [];

    return value.flatMap((item) => {
      if (typeof item !== "object" || item === null || !("amount" in item)) {
        return [];
      }
      const id =
        "id" in item && typeof item.id === "string" ? item.id : undefined;
      const product =
        "product" in item && typeof item.product === "string"
          ? item.product
          : undefined;
      return typeof item.amount === "number" && (id || product)
        ? [{ id, product, amount: item.amount }]
        : [];
    });
  } catch {
    return [];
  }
}

const Index = () => {
  const router = useRouter();
  const currentUser = useAppSelector((store) => store.auth.currentUser);
  const [products, setProducts] = React.useState<CartProduct[]>([]);
  const totalPrice = React.useMemo(
    () => products.reduce((total, item) => total + item.amount * item.price, 0),
    [products],
  );

  React.useEffect(() => {
    let cancelled = false;

    const loadProduct = async (
      productId: string,
      amount: unknown,
      orderId?: string,
    ) => {
      try {
        const productResponse = await axios.get(`/products/${productId}`);
        const data = toCartProduct(productResponse.data, amount, orderId);
        return data;
      } catch {
        return null;
      }
    };

    const loadCart = async () => {
      let items: StoredCartItem[] = [];

      if (currentUser) {
        try {
          const response = await axios.get(
            `/orders?user=${currentUser.id}&status=in+cart`,
          );
          const rows =
            typeof response.data === "object" &&
            response.data !== null &&
            Array.isArray(response.data.rows)
              ? response.data.rows
              : [];
          items = rows.flatMap((item: unknown) => {
            if (typeof item !== "object" || item === null) return [];
            const orderId =
              "id" in item && typeof item.id === "string" ? item.id : undefined;
            const amount = "amount" in item ? item.amount : undefined;
            const product = "product" in item ? item.product : undefined;
            const productId =
              typeof product === "string"
                ? product
                : typeof product === "object" &&
                    product !== null &&
                    "id" in product &&
                    typeof product.id === "string"
                  ? product.id
                  : undefined;
            return productId && typeof amount === "number"
              ? [
                  {
                    product: productId,
                    amount,
                    ...(orderId ? { orderId } : {}),
                  },
                ]
              : [];
          });
        } catch {
          items = [];
        }
      } else {
        items = readStoredCartItems();
      }

      const loadedProducts = await Promise.all(
        items.map((item) => {
          const productId = item.product ?? item.id;
          return productId
            ? loadProduct(productId, item.amount, item.orderId)
            : null;
        }),
      );

      if (!cancelled) {
        setProducts(
          loadedProducts.filter(
            (product): product is CartProduct => product !== null,
          ),
        );
      }
    };

    void loadCart();

    return () => {
      cancelled = true;
    };
  }, [currentUser]);

  const updateQuantity = (index: number, change: number) => {
    const currentProduct = products[index];
    if (!currentProduct) return;

    const amount = Math.max(1, currentProduct.amount + change);
    if (amount === currentProduct.amount) return;

    const product = { ...currentProduct, amount };
    const nextProducts = products.map((item, itemIndex) =>
      itemIndex === index ? product : item,
    );
    setProducts(nextProducts);

    if (currentUser && product.orderId) {
      void axios.put(`/orders/${product.orderId}`, {
        data: {
          product: product.id,
          amount: product.amount,
          status: "in cart",
          user: currentUser.id,
        },
        id: product.orderId,
      });
    } else if (typeof window !== "undefined") {
      localStorage.setItem("products", JSON.stringify(nextProducts));
    }
  };

  const reduceQuantity = (index: number) => updateQuantity(index, -1);
  const increaseQuantity = (index: number) => updateQuantity(index, 1);

  const removeFromProducts = (id: string) => {
    const productIndex = products.findIndex((item) => item.id === id);
    const product = products[productIndex];
    const nextProducts = products.filter(
      (_item, index) => index !== productIndex,
    );
    setProducts(nextProducts);

    if (currentUser) {
      if (!product?.orderId) {
        setProducts(products);
        toast.error("Unable to remove product from cart");
        return;
      }
      void axios.delete(`/orders/${product.orderId}`).catch(() => {
        setProducts(products);
        toast.error("Unable to remove product from cart");
      });
    } else if (typeof window !== "undefined") {
      localStorage.setItem("products", JSON.stringify(nextProducts));
    }
  };

  return (
    <Container>
      <Head>
        <title>Cart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          name="description"
          content="Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development"
        />
        <meta name="keywords" content="flatlogic, react templates" />
        <meta name="author" content="Flatlogic LLC." />
        <meta charSet="utf-8" />

        <meta
          property="og:title"
          content="Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://flatlogic-ecommerce.herokuapp.com/"
        />
        <meta
          property="og:image"
          content="https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg"
        />
        <meta
          property="og:description"
          content="Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="fb:app_id" content="712557339116053" />

        <meta property="og:site_name" content="Flatlogic" />
        <meta name="twitter:site" content="@flatlogic" />
      </Head>
      <Row className={"mb-5"} style={{ marginTop: 32 }}>
        <ToastContainer />
        <Col xs={12} lg={8}>
          <h2 className={`${s.sectionTitle} fw-bold mt-4 mb-5`}>
            Shopping Cart
          </h2>
          <Table
            borderless
            className={`${s.cartTable} ${products.length === 0 ? s.emptyCartTable : ""}`}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid #D9D9D9" }}>
                <th className={"bg-transparent text-dark px-0"}>Product</th>
                <th className={"bg-transparent text-dark px-0"}>Quantity</th>
                <th className={"bg-transparent text-dark px-0"}>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr className={s.emptyRow}>
                  <td>
                    <h5 className={"fw-bold mt-3"}>No items</h5>
                  </td>
                  <td />
                  <td />
                </tr>
              ) : (
                <>
                  {products.map((item, index) => (
                    <tr className={"mt-2"} key={`${item.id}-${index}`}>
                      <td className={"px-0 pt-4"}>
                        <div className={"d-flex align-items-center"}>
                          <img
                            src={item.image[0]?.publicUrl}
                            width={100}
                            className={s.productImage}
                            alt={item.title}
                          />
                          <div>
                            <h6 className={"text-muted"}>
                              {item.categories[0]?.title
                                ? item.categories[0].title[0]?.toUpperCase() +
                                  item.categories[0].title.slice(1)
                                : ""}
                            </h6>
                            <h5 className={"fw-bold"}>{item.title}</h5>
                          </div>
                        </div>
                      </td>
                      <td className={"px-0 pt-4"}>
                        <div className={"d-flex align-items-center"}>
                          <Button
                            className={`${s.quantityBtn} ${s.quantityDecrease} bg-transparent border-0 p-1 fw-bold`}
                            onClick={() => reduceQuantity(index)}
                          >
                            -
                          </Button>
                          <p className={"fw-bold mb-0"}>{item.amount}</p>
                          <Button
                            className={`${s.quantityBtn} ${s.quantityIncrease} bg-transparent border-0 p-1 fw-bold`}
                            onClick={() => increaseQuantity(index)}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className={"px-0 pt-4"}>
                        <h6 className={"fw-bold mb-0"}>{item.price}$</h6>
                      </td>
                      <td className={"px-0 pt-4"}>
                        <Button
                          className={"bg-transparent border-0 p-0"}
                          onClick={() => {
                            removeFromProducts(item.id);
                            toast.info("product successfully removed");
                          }}
                        >
                          <img src={close} alt={"close"} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </Table>
        </Col>
        <Col xs={12} lg={4}>
          <section className={s.cartTotal}>
            <h2 className={`${s.sectionTitle} fw-bold mb-5`}>Cart Total</h2>
            <div className={"d-flex"}>
              <h6 className={`${s.summaryLabel} fw-bold mb-0`}>Subtotal:</h6>
              <h6 className={"fw-bold mb-0"}>{totalPrice}$</h6>
            </div>
            <hr className={"my-4"} />
            <div className={"d-flex"}>
              <h6 className={`${s.summaryLabel} fw-bold mb-0`}>Shipping:</h6>
              <div>
                <h6 className={"fw-bold mb-3"}>Free Shipping</h6>
                <p className={"mb-0"}>
                  Shipping options will be updated during checkout.
                </p>
              </div>
            </div>
            <hr className={"my-4"} />
            <div className={"d-flex"}>
              <h5 className={"fw-bold"} style={{ marginRight: 63 }}>
                Total:
              </h5>
              <h5 className={"fw-bold"}>{totalPrice}$</h5>
            </div>
            <Button
              color={"primary"}
              className={`${s.checkOutBtn} text-uppercase mt-auto fw-bold`}
              onClick={() => router.push("/billing")}
            >
              Check out
            </Button>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export async function getServerSideProps(_context: unknown) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Index;
