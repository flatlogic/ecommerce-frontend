import React from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Modal,
} from "components/compat/bootstrap";
import Link from "components/compat/Link";
import s from "./Shop.module.scss";

import InfoBlock from "components/e-commerce/InfoBlock";
import InstagramWidget from "components/e-commerce/Instagram";
import filter from "public/images/e-commerce/filter.svg";
import relevant from "public/images/e-commerce/relevant.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Head from "components/compat/Head";
import { useRouter } from "components/compat/router";
import { useAppSelector } from "@/redux/hooks";
import { pageResultSchema, productSchema, type Product } from "types/domain";
import type { GetServerSidePropsContext } from "next";

let categoriesList: string[] = [],
  brandsList: string[] = [];

interface CategoryMetadata {
  meta_description?: string;
  keywords?: string;
  meta_author?: string;
  meta_og_title?: string;
  meta_og_url?: string;
  meta_og_image?: string;
  meta_fb_id?: string;
  meta_og_sitename?: string;
  post_twitter?: string;
}

interface CategoryPageProps {
  categoryId: string;
  categoryData: CategoryMetadata;
}

type OpenState = Record<string, boolean>;
interface OpenAction {
  type: string;
}

const Index = ({ categoryId, categoryData }: CategoryPageProps) => {
  const router = useRouter();
  const openReducer = (state: OpenState, action: OpenAction): OpenState => {
    switch (action.type) {
      case "open0":
        return {
          ...state,

          open0: !state.open0,
        };
      case "open1":
        return {
          ...state,
          open1: !state.open1,
        };
      case "open2":
        return {
          ...state,

          open2: !state.open2,
        };
      case "open3":
        return {
          ...state,

          open3: !state.open3,
        };
      case "open4":
        return {
          ...state,

          open4: !state.open4,
        };
      case "open5":
        return {
          ...state,

          open5: !state.open5,
        };
      case "open6":
        return {
          ...state,

          open6: !state.open6,
        };
      case "open7":
        return {
          ...state,

          open7: !state.open6,
        };
      case "open8":
        return {
          ...state,

          open8: !state.open8,
        };
      default:
        return state;
    }
  };
  const { categoryName } = router.query;
  const [width, setWidth] = React.useState(1440);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [showFilter, setShowFilter] = React.useState(false);
  const [, setAllProducts] = React.useState<Product[]>([]);
  const [openState, dispatch] = React.useReducer(openReducer, {
    open0: false,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    open7: false,
    open8: false,
  });
  const currentUser = useAppSelector((store) => store.auth.currentUser);
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    axios.get(`/products?categories=${categoryId}`).then((res) => {
      const parsed = pageResultSchema(productSchema).safeParse(res.data);
      if (!parsed.success) return;
      setAllProducts(parsed.data.rows);
      setProducts([...parsed.data.rows]);
    });
  }, [categoryName, categoryId]);

  const addToCart = (id: string) => {
    if (currentUser) {
      axios.post(`/orders/`, {
        data: {
          amount: 1,
          order_date: new Date(),
          product: id,
          status: "in cart",
          user: currentUser.id,
        },
      });
      return;
    }
    const localProducts =
      (typeof window !== "undefined" &&
        (JSON.parse(localStorage.getItem("products") ?? "[]") as unknown[])) ||
      [];
    localProducts.push({
      amount: 1,
      order_date: new Date(),
      product: id,
      status: "in cart",
    });
    if (typeof window !== "undefined") {
      localStorage.setItem("products", JSON.stringify(localProducts));
    }
  };

  const addToWishlist = (id: string) => {
    if (currentUser) {
      axios.put(`/users/${currentUser.id}`, {
        id: currentUser.id,
        data: {
          ...currentUser,
          wishlist: [id],
        },
      });
    }
    const localWishlist =
      (typeof window !== "undefined" &&
        (JSON.parse(localStorage.getItem("wishlist") ?? "[]") as unknown[])) ||
      [];
    localWishlist.push({ amount: 1, product: id });
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(localWishlist));
    }
  };

  const filterByCategory = (category: string, brands = false) => {
    let count = 0,
      brandsCount = 0,
      brandsString = "",
      categoriesString = "";
    if (brands) {
      brandsList.push(category);
      brandsList.forEach((item) => {
        if (item === category) brandsCount += 1;
      });
      brandsList = brandsList.filter((item) => {
        if (brandsList.length === 1) {
          return true;
        }
        if (brandsCount === 1 && item === category) return true;
        return item !== category;
      });
      brandsString = brandsList.join("|");
    } else {
      categoriesList.push(category);
      categoriesList.forEach((item) => {
        if (item === category) count += 1;
      });
      categoriesList = categoriesList.filter((item) => {
        if (categoriesList.length === 1) {
          return true;
        }
        if (count === 1 && item === category) return true;
        return item !== category;
      });
      categoriesString = categoriesList.join("|");
    }
    axios
      .get(`/products?categories=${categoriesString}&brand=${brandsString}`)
      .then((res) => {
        const parsed = pageResultSchema(productSchema).safeParse(res.data);
        if (parsed.success) setProducts([...parsed.data.rows]);
      });
  };
  return (
    <>
      <Head>
        <title>{categoryName} Category</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          name="description"
          content={`${categoryData.meta_description || "Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development"}`}
        />
        <meta
          name="keywords"
          content={`${categoryData.keywords || "flatlogic, react templates"}`}
        />
        <meta
          name="author"
          content={`${categoryData.meta_author || "Flatlogic LLC."}`}
        />
        <meta charSet="utf-8" />

        <meta
          property="og:title"
          content={`${categoryData.meta_og_title || "Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes"}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${categoryData.meta_og_url || "https://flatlogic-ecommerce.herokuapp.com/"}`}
        />
        <meta
          property="og:image"
          content={`${categoryData.meta_og_image || "https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg"}`}
        />
        <meta
          property="og:description"
          content={`${categoryData.meta_description || "Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development"}`}
        />
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          property="fb:app_id"
          content={`${categoryData.meta_fb_id || "712557339116053"}`}
        />

        <meta
          property="og:site_name"
          content={`${categoryData.meta_og_sitename || "Flatlogic"}`}
        />
        <meta
          name="twitter:site"
          content={`${categoryData.post_twitter || "@flatlogic"}`}
        />
      </Head>
      <Container className={"mb-5"} style={{ marginTop: 21 }}>
        <Row>
          <ToastContainer />
          <Col
            sm={3}
            className={`${s.filterColumn} ${showFilter ? s.showFilter : ""}`}
          >
            <div className={s.filterTitle}>
              <h5 className={"fw-bold mb-5 text-uppercase"}>Categories</h5>
              <span onClick={() => setShowFilter(false)}>✕</span>
            </div>
            <div className={"d-flex align-items-center"}>
              <input
                type={"checkbox"}
                onClick={() =>
                  filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc711")
                }
              />
              <p className={"d-inline-block ml-2 mb-0"}>Furniture</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input
                type={"checkbox"}
                onClick={() =>
                  filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc712")
                }
              />
              <p className={"d-inline-block ml-2 mb-0"}>Lighting</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input
                type={"checkbox"}
                onClick={() =>
                  filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc713")
                }
              />
              <p className={"d-inline-block ml-2 mb-0"}>Decoration</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input
                type={"checkbox"}
                onClick={() =>
                  filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc714")
                }
              />
              <p className={"d-inline-block ml-2 mb-0"}>Bedding</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input
                type={"checkbox"}
                onClick={() =>
                  filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc715")
                }
              />
              <p className={"d-inline-block ml-2 mb-0"}>Bath & Shower</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input
                type={"checkbox"}
                onClick={() =>
                  filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc716")
                }
              />
              <p className={"d-inline-block ml-2 mb-0"}>Curtains</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input
                type={"checkbox"}
                onClick={() =>
                  filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc717")
                }
              />
              <p className={"d-inline-block ml-2 mb-0"}>Toys</p>
            </div>
            <h5 className={"fw-bold mb-5 mt-5 text-uppercase"}>Price</h5>
            <p>Price Range: $0 - $1000</p>
            <input
              type="range"
              min="0"
              max="1400"
              defaultValue={"1000"}
              className={"w-100"}
            />
            <h5 className={"fw-bold mb-5 mt-5 text-uppercase"}>Brands</h5>
            <div className={"d-flex align-items-center"}>
              <input
                type={"checkbox"}
                onClick={() =>
                  filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc721", true)
                }
              />
              <p className={"d-inline-block ml-2 mb-0"}>Poliform</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input
                type={"checkbox"}
                onClick={() =>
                  filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc722", true)
                }
              />
              <p className={"d-inline-block ml-2 mb-0"}>Roche Bobois</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input
                type={"checkbox"}
                onClick={() =>
                  filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc723", true)
                }
              />
              <p className={"d-inline-block ml-2 mb-0"}>Edra</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input
                type={"checkbox"}
                onClick={() =>
                  filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc724", true)
                }
              />
              <p className={"d-inline-block ml-2 mb-0"}>Kartell</p>
            </div>
            <h5 className={"fw-bold mb-5 mt-5 text-uppercase"}>Rooms</h5>
            <div className={"d-flex align-items-center"}>
              <input type={"checkbox"} />
              <p className={"d-inline-block ml-2 mb-0"}>Bedroom</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input type={"checkbox"} />
              <p className={"d-inline-block ml-2 mb-0"}>Kitchen</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input type={"checkbox"} />
              <p className={"d-inline-block ml-2 mb-0"}>Living Room</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input type={"checkbox"} />
              <p className={"d-inline-block ml-2 mb-0"}>Bathroom</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input type={"checkbox"} />
              <p className={"d-inline-block ml-2 mb-0"}>Wine Cellar</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input type={"checkbox"} />
              <p className={"d-inline-block ml-2 mb-0"}>Balcony</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input type={"checkbox"} />
              <p className={"d-inline-block ml-2 mb-0"}>Games Room</p>
            </div>
            <h5 className={"fw-bold mb-5 mt-5 text-uppercase"}>Availability</h5>
            <div className={"d-flex align-items-center"}>
              <input type={"checkbox"} />
              <p className={"d-inline-block ml-2 mb-0"}>On Stock</p>
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <input type={"checkbox"} />
              <p className={"d-inline-block ml-2 mb-0"}>Out of Stock</p>
            </div>
          </Col>
          <Col sm={width <= 768 ? 12 : 9}>
            {!(width <= 768) ? (
              <div
                className={"d-flex justify-content-between align-items-center"}
                style={{ marginBottom: 50, marginTop: 33 }}
              >
                <h6>
                  Showing{" "}
                  <span className={"fw-bold text-primary"}>
                    {products.length}
                  </span>{" "}
                  of <span className={"fw-bold text-primary"}>15</span> Products
                </h6>
                <div className={"d-flex align-items-center"}>
                  <h6 className={"text-nowrap mr-3 mb-0"}>Sort by:</h6>
                  <Input type={"select"} style={{ height: 50, width: 160 }}>
                    <option>Most Popular</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </div>
              </div>
            ) : (
              <>
                <div className={"d-flex justify-content-between"}>
                  <Button
                    className={"text-dark bg-transparent border-0"}
                    style={{ padding: "14px 0 22px 0" }}
                    onClick={() => setShowFilter(true)}
                  >
                    <img src={filter} alt="" /> Filters
                  </Button>
                  <Button
                    className={"text-dark bg-transparent border-0"}
                    style={{ padding: "14px 0 22px 0" }}
                  >
                    <img src={relevant} alt="" /> Relevant
                  </Button>
                </div>
                <hr style={{ marginTop: 0, marginBottom: "2rem" }} />
              </>
            )}
            <Row>
              {products.map((c, index) => {
                return (
                  <Col
                    key={c.id}
                    xs={12}
                    md={6}
                    sm={6}
                    lg={4}
                    className={`mb-4 ${s.product}`}
                  >
                    <Modal
                      isOpen={Boolean(openState[`open${index}`])}
                      toggle={() => dispatch({ type: `open${index}` })}
                    >
                      <img src={c.image[0]?.publicUrl} alt={c.title} />
                    </Modal>
                    <div style={{ position: "relative" }}>
                      <Link href={`/products/${c.id}`}>
                        <a>
                          <img
                            src={c.image[0]?.publicUrl}
                            className={"img-fluid"}
                            alt={c.title}
                          />
                        </a>
                      </Link>
                      <div
                        className={`d-flex flex-column justify-content-center ${s.product__actions}`}
                        style={{
                          position: "absolute",
                          height: "100%",
                          top: 0,
                          right: 15,
                        }}
                      >
                        <Button
                          className={"p-0 bg-transparent border-0"}
                          onClick={() => {
                            addToWishlist(c.id);
                            toast.info(
                              "products successfully added to your wishlist",
                            );
                          }}
                        >
                          <div
                            className={`mb-4 ${s.product__actions__heart}`}
                          />
                        </Button>
                        <Button
                          className={"p-0 bg-transparent border-0"}
                          onClick={() => {
                            dispatch({ type: `open${index}` });
                          }}
                        >
                          <div className={`mb-4 ${s.product__actions__max}`} />
                        </Button>
                        <Button
                          className={"p-0 bg-transparent border-0"}
                          onClick={() => {
                            addToCart(c.id);
                            toast.info(
                              "products successfully added to your cart",
                            );
                          }}
                        >
                          <div className={`mb-4 ${s.product__actions__cart}`} />
                        </Button>
                      </div>
                    </div>
                    <p className={"mt-3 text-muted mb-0"}>
                      {c.categories[0]?.title
                        ? c.categories[0].title[0]?.toUpperCase() +
                          c.categories[0].title.slice(1)
                        : ""}
                    </p>
                    <Link href={`/products/${c.id}`}>
                      <a>
                        <h6
                          className={"fw-bold font-size-base mt-1"}
                          style={{ fontSize: 16 }}
                        >
                          {c.title}
                        </h6>
                      </a>
                    </Link>
                    <h6 style={{ fontSize: 16 }}>${c.price}</h6>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
      <InfoBlock />
      <InstagramWidget />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const categoryId = Array.isArray(context.query.id)
    ? context.query.id[0]
    : context.query.id;
  const res = await axios.get<unknown>(`/categories/${categoryId}`);
  const category =
    typeof res.data === "object" && res.data !== null
      ? (res.data as CategoryMetadata)
      : {};

  return {
    props: { categoryId: categoryId ?? "", categoryData: category }, // will be passed to the page component as props
  };
}

export default Index;
