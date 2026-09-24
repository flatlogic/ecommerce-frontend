import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
} from "components/compat/bootstrap";
import s from "pages/index.module.scss";
import Link from "components/compat/Link";
import axios from "axios";
import Carousel from "components/compat/Carousel";
import Head from "components/compat/Head";

import arrowRight from "public/images/e-commerce/home/arrow-right.svg";

import InfoBlock from "components/e-commerce/InfoBlock";
import InstagramWidget from "components/e-commerce/Instagram";
import article1 from "public/images/e-commerce/home/article1.jpg";
import article2 from "public/images/e-commerce/home/article2.jpg";
import article3 from "public/images/e-commerce/home/article3.jpg";

import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Countdown from "./home/Countdown";
import rating from "../public/images/e-commerce/details/stars.svg";
import productsListActions from "../redux/actions/products/productsListActions";
import { pageResultSchema, productSchema, type Product } from "types/domain";

type OpenState = Record<string, boolean>;
type OpenAction = { type: string };

const CarouselViewMoreButton = () => (
  <Link href="/shop">
    <Button color="primary" className="d-md-none text-uppercase mt-4 fw-bold">
      view more
    </Button>
    <Button
      outline
      color="primary"
      className={`d-none d-md-flex text-uppercase mt-4 mr-auto fw-bold align-items-center ${s.viewMoreBtn}`}
    >
      <p className="mb-0">view more</p>{" "}
      <div className={`ml-2 ${s.arrowRight}`} />
    </Button>
  </Link>
);

const Index = ({ products: serverSideProducts }: { products: Product[] }) => {
  const [quantity, setQuantity] = React.useState(1);
  const dispatchStore = useAppDispatch();
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
  const products = serverSideProducts;

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

  const addToCart = (id?: string, quantity = 1) => {
    if (currentUser) {
      axios.post(`/orders/`, {
        data: {
          amount: quantity,
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
        JSON.parse(localStorage.getItem("products") ?? "[]")) ||
      [];
    localProducts.push({
      amount: quantity,
      order_date: new Date(),
      product: id,
      status: "in cart",
    });
    if (typeof window !== "undefined") {
      localStorage.setItem("products", JSON.stringify(localProducts));
    }
    dispatchStore(productsListActions.doAdd(localProducts));
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
        JSON.parse(localStorage.getItem("wishlist") ?? "[]")) ||
      [];
    localWishlist.push({ amount: 1, product: id });
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(localWishlist));
    }
  };

  return (
    <>
      <Head>
        <title>Home</title>
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
      <ToastContainer />
      <Carousel prevLabel="prev" nextLabel="next">
        <Carousel.Item interval={1000}>
          <section className={`${s.carousel} ${s.firstImg}`}>
            <Container className={"h-100"}>
              <Row className={"h-100"}>
                <Col
                  sm={12}
                  className={
                    "h-100 d-flex flex-column justify-content-center align-items-center align-items-md-start"
                  }
                >
                  <p className={"text-uppercase text-primary fw-bold mb-2"}>
                    chair
                  </p>
                  <h2 className={"mb-2"}>get all</h2>
                  <h1 className={"text-uppercase fw-bold mt-1"}>
                    the good stuff
                  </h1>
                  <CarouselViewMoreButton />
                </Col>
              </Row>
            </Container>
          </section>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <section className={`${s.carousel} ${s.secondImg}`}>
            <Container className={"h-100"}>
              <Row className={"h-100"}>
                <Col
                  sm={12}
                  className={
                    "h-100 d-flex flex-column justify-content-center align-items-center align-items-md-start"
                  }
                >
                  <p className={"text-uppercase text-primary fw-bold mb-2"}>
                    chair
                  </p>
                  <h2 className={"mb-2"}>get all</h2>
                  <h1 className={"text-uppercase fw-bold mt-1"}>
                    the good stuff
                  </h1>
                  <CarouselViewMoreButton />
                </Col>
              </Row>
            </Container>
          </section>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <section className={`${s.carousel} ${s.thirdImg}`}>
            <Container className={"h-100"}>
              <Row className={"h-100"}>
                <Col
                  sm={12}
                  className={
                    "h-100 d-flex flex-column justify-content-center align-items-center align-items-md-start"
                  }
                >
                  <p className={"text-uppercase text-primary fw-bold mb-2"}>
                    chair
                  </p>
                  <h2 className={"mb-2"}>get all</h2>
                  <h1 className={"text-uppercase fw-bold mt-1"}>
                    the good stuff
                  </h1>
                  <CarouselViewMoreButton />
                </Col>
              </Row>
            </Container>
          </section>
        </Carousel.Item>
      </Carousel>
      <Container style={{ marginTop: 80, marginBottom: 80 }}>
        <h3 className={`text-center fw-bold mb-4`}>New Arrivals</h3>
        <Row className={"justify-content-center mb-2"}>
          <Col sm={8}>
            <p className={"text-center text-muted mb-4"}>
              Check out our new furniture collection! Cozy sofa, fancy chair,
              wooden casket, and many more. The new collection brings an
              informal elegance to your home.
            </p>
          </Col>
        </Row>
        <Row>
          {products.map((item, index) => {
            const category = item.categories.at(0);
            const categoryTitle = category?.title
              ? category.title.charAt(0).toUpperCase() + category.title.slice(1)
              : "";
            return (
              <Col
                sm={6}
                md={3}
                xs={12}
                className={`mb-4 ${s.product}`}
                key={index}
              >
                <Modal
                  isOpen={openState[`open${index}`] ?? false}
                  toggle={() => dispatch({ type: `open${index}` })}
                >
                  <div className={s.modalWidndow}>
                    <div className={s.image}>
                      <img
                        src={item.image[0]?.publicUrl}
                        width={"100%"}
                        height={"100%"}
                        alt="img"
                      />
                    </div>
                    <div
                      className={`${s.content} p-4 d-flex flex-column justify-content-between`}
                    >
                      <Link href={`/products/${item.id}`}>
                        <a className={"fw-semi-bold"}>
                          More about product
                          <img
                            src={arrowRight}
                            alt={"arrow"}
                            className={"ml-2"}
                          />
                        </a>
                      </Link>
                      <h6 className={`text-muted`}>{categoryTitle}</h6>
                      <h4 className={"fw-bold"}>{item.title}</h4>
                      <div className={"d-flex align-items-center"}>
                        <img src={rating} alt={"rating"} />
                        <p className={"text-primary ml-3 mb-0"}>12 reviews</p>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In ut ullamcorper leo, eget euismod orci. Cum sociis
                        natoque penatibus et magnis dis parturient montes,
                        nascetur ridiculus mus. Vestibulum ultricies aliquam.
                      </p>
                      <div className={"d-flex"}>
                        <div
                          className={
                            "d-flex flex-column mr-5 justify-content-between"
                          }
                        >
                          <h6 className={"fw-bold text-muted text-uppercase"}>
                            Quantity
                          </h6>
                          <div className={"d-flex align-items-center"}>
                            <Button
                              className={`bg-transparent border-0 p-1 fw-bold mr-3 ${s.quantityBtn}`}
                              onClick={() => {
                                if (quantity === 1) return;
                                setQuantity((prevState) => prevState - 1);
                              }}
                            >
                              -
                            </Button>
                            <p className={"fw-bold mb-0"}>{quantity}</p>
                            <Button
                              className={`bg-transparent border-0 p-1 fw-bold ml-3 ${s.quantityBtn}`}
                              onClick={() => {
                                if (quantity < 1) return;
                                setQuantity((prevState) => prevState + 1);
                              }}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div
                          className={
                            "d-flex flex-column justify-content-between"
                          }
                        >
                          <h6 className={"fw-bold text-muted text-uppercase"}>
                            Price
                          </h6>
                          <h6 className={"fw-bold"}>{item.price}$</h6>
                        </div>
                      </div>
                      <div className={"d-flex mt-5"}>
                        <Button
                          outline
                          color={"primary"}
                          className={"flex-fill mr-4 text-uppercase fw-bold"}
                          style={{ width: "50%" }}
                          onClick={() => {
                            toast.info(
                              "products successfully added to your cart",
                            );
                            addToCart();
                          }}
                        >
                          Add to Cart
                        </Button>
                        <Link
                          href={"/billing"}
                          className={"d-inline-block flex-fill"}
                        >
                          <Button
                            color={"primary"}
                            className={"text-uppercase fw-bold"}
                            style={{ width: "50%" }}
                          >
                            Buy now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Modal>
                <div style={{ position: "relative" }}>
                  <Link href={`/products/${item.id}`}>
                    <a>
                      <div
                        style={{
                          background: `url(${item.image[0]?.publicUrl}) no-repeat center`,
                          backgroundSize: "contain",
                          transition: "all .65s ease",
                        }}
                        className={s.productImage}
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
                        addToWishlist(item.id);
                        toast.info(
                          "products successfully added to your wishlist",
                        );
                      }}
                    >
                      <div className={`mb-4 ${s.product__actions__heart}`} />
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
                        addToCart(item.id);
                        toast.info("products successfully added to your cart");
                      }}
                    >
                      <div className={`mb-4 ${s.product__actions__cart}`} />
                    </Button>
                  </div>
                </div>
                <div className={s.productInfo}>
                  <div>
                    <Link
                      href={
                        category ? `/category/${category.id}` : "/categories"
                      }
                    >
                      <a className={"mt-3 text-muted mb-0 d-inline-block"}>
                        {categoryTitle}
                      </a>
                    </Link>
                    <Link href={`/products/${item.id}`}>
                      <a>
                        <h6
                          className={"fw-bold font-size-base mt-1"}
                          style={{ fontSize: 16 }}
                        >
                          {item.title}
                        </h6>
                      </a>
                    </Link>
                    <h6 style={{ fontSize: 16 }}>${item.price}</h6>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row className={"d-flex justify-content-center"}>
          <Link href={"/shop"}>
            <Button
              outline
              color="primary"
              className={"text-uppercase mx-auto mt-5 fw-bold"}
            >
              view more
            </Button>
          </Link>
        </Row>
      </Container>
      <section className={s.promo}>
        <Container className={"h-100"}>
          <Row className={"h-100"}>
            <Col
              md={6}
              xs={12}
              className={
                "h-100 d-flex flex-column justify-content-center align-items-center align-items-md-start"
              }
            >
              <h5 className={"text-uppercase fw-bold mb-3"}>
                news and inspiration
              </h5>
              <h1
                className={`text-uppercase fw-bold mb-0 ${s.newArrivals}`}
                style={{ fontSize: 50 }}
              >
                new arrivals
              </h1>
              <div
                className={`${s.stroke} mt-4`}
                style={{ marginBottom: 30 }}
              />
              <Countdown />
              <section className={"d-flex mt-5 align-itens-center"}>
                <h2
                  className={"text-muted mr-3 mb-0 d-flex align-items-center"}
                >
                  <del>$ 140,56</del>
                </h2>
                <h1 className={"text-primary fw-bold mb-0"}>$ 70</h1>
              </section>
            </Col>
          </Row>
        </Container>
      </section>
      <Container
        className={s.topSelling}
        style={{ marginTop: 80, marginBottom: 80 }}
      >
        <h3 className={"text-center fw-bold mb-4"}>Top Selling Products</h3>
        <Row className={"justify-content-center mb-2"}>
          <Col sm={8}>
            <p className={"text-center text-muted mb-4"}>
              These furniture sets will become an essential part of an ecosystem
              of elements in your home. Your domestic space will easily embrace
              these tables, chairs, and bookshelves.
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Link href={"/products/afaf98d5-4060-4408-967b-c4f4af3d1869"}>
              <a>
                <section className={`${s.top_first} img-fluid`}>
                  <h6 className={"text-uppercase text-primary fw-bold"}>
                    All new
                  </h6>
                  <h2 className={"fw-bold"}>SPRING THINGS</h2>
                  <div className={s.stroke} />
                  <h6 className={"text-muted mt-4"}>Save up to 30%</h6>
                </section>
              </a>
            </Link>
          </Col>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={12} md={6} className={s.topMargin}>
                <Link href="/products/afaf98d5-4060-4408-967b-c4f4af3d1862">
                  <a>
                    <div className={`${s.top2} img-fluid`}>
                      <div>
                        <h6 className={"text-primary fw-bold"}>
                          Online Exclusive
                        </h6>
                        <p>
                          <u>shop now</u>
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>
                <Link href="/products/afaf98d5-4060-4408-967b-c4f4af3d1863">
                  <a>
                    <div className={`${s.top4} img-fluid`}>
                      <div className={`${s.label}`}>
                        <h6
                          className={"fw-bold text-uppercase mb-0 text-white"}
                        >
                          spring sale
                        </h6>
                      </div>
                    </div>
                  </a>
                </Link>
              </Col>
              <Col xs={12} md={6}>
                <Link href="/products/afaf98d5-4060-4408-967b-c4f4af3d1864">
                  <div className={`${s.top3} img-fluid`}>
                    <div className={`${s.label}`}>
                      <h6 className={"fw-bold text-uppercase mb-0 text-white"}>
                        70% SALE
                      </h6>
                    </div>
                  </div>
                </Link>
                <Link href="/products/afaf98d5-4060-4408-967b-c4f4af3d1865">
                  <div className={`${s.top5} img-fluid`}>
                    <div>
                      <div className={s.stroke} />
                      <div>
                        <p className={"mb-0"}>collection</p>
                        <h5 className={"fw-bold text-primary text-uppercase"}>
                          summer
                        </h5>
                      </div>
                      <div className={s.stroke} />
                    </div>
                  </div>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <InfoBlock />
      <Container
        className={s.blogSection}
        style={{ marginTop: 80, marginBottom: 80 }}
      >
        <h3 className={`text-center fw-bold mb-4 ${s.blogHeading}`}>
          From Our Blogs
        </h3>
        <Row className="justify-content-center mb-2">
          <Col sm={8}>
            <p className={`text-center mb-4 ${s.blogMuted}`}>
              Design your home interior story! Here are the latest trends, tips,
              and design tricks to help you out.
            </p>
          </Col>
        </Row>
        <Row>
          <Col
            xs={12}
            md={4}
            className={"mb-4 d-flex flex-column align-items-center"}
          >
            <div className={s.imgAnimation}>
              <Link href="/blog/article/07aeff53-31e5-4276-8307-f855b22b6436">
                <img
                  src={article1}
                  className="img-fluid"
                  alt="What is Shabby Chic?"
                />
              </Link>
            </div>
            <p className={`mt-3 mb-0 ${s.blogMuted}`}>March 12, 2020</p>
            <h6
              className={"fw-bold font-size-base mt-1"}
              style={{ fontSize: 16 }}
            >
              What is Shabby Chic?
            </h6>
            <h6 style={{ fontSize: 16 }} className={"fw-bold text-primary"}>
              <Link
                href="/blog/article/07aeff53-31e5-4276-8307-f855b22b6436"
                className={s.blogReadMore}
              >
                Read More
              </Link>
            </h6>
          </Col>
          <Col
            xs={12}
            md={4}
            className={"mb-4 d-flex flex-column align-items-center"}
          >
            <div className={s.imgAnimation}>
              <Link href="/blog/article/c4245ff9-6a53-4b13-8539-0b69b442cfd1">
                <img
                  src={article2}
                  className="img-fluid"
                  alt="Best Examples of Maximalism"
                />
              </Link>
            </div>
            <p className={`mt-3 mb-0 ${s.blogMuted}`}>March 12, 2020</p>
            <h6
              className={"fw-bold font-size-base mt-1"}
              style={{ fontSize: 16 }}
            >
              Best Examples of Maximalism
            </h6>
            <h6 style={{ fontSize: 16 }} className={"fw-bold text-primary"}>
              <Link
                href="/blog/article/c4245ff9-6a53-4b13-8539-0b69b442cfd1"
                className={s.blogReadMore}
              >
                Read More
              </Link>
            </h6>
          </Col>
          <Col
            xs={12}
            md={4}
            className={"mb-4 d-flex flex-column align-items-center"}
          >
            <div className={s.imgAnimation}>
              <Link href="/blog/article/57fbad3f-528a-43b2-83e8-32ba30708194">
                <img
                  src={article3}
                  className="img-fluid"
                  alt="What is Lorem Ipsum?"
                />
              </Link>
            </div>
            <p className={`mt-3 mb-0 ${s.blogMuted}`}>March 12, 2020</p>
            <h6
              className={"fw-bold font-size-base mt-1"}
              style={{ fontSize: 16 }}
            >
              What is Lorem Ipsum?
            </h6>
            <h6 style={{ fontSize: 16 }} className={"fw-bold text-primary"}>
              <Link
                href="/blog/article/57fbad3f-528a-43b2-83e8-32ba30708194"
                className={s.blogReadMore}
              >
                Read More
              </Link>
            </h6>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Link
            href="/blog"
            className={`btn btn-outline-primary text-uppercase mx-auto mt-5 fw-bold ${s.blogButton}`}
          >
            view more
          </Link>
        </Row>
      </Container>
      <InstagramWidget />
    </>
  );
};

export async function getServerSideProps(_context: unknown) {
  const res = await axios.get("/products");
  const products = pageResultSchema(productSchema).parse(res.data).rows;

  return {
    props: { products }, // will be passed to the page component as props
  };
}

export default Index;
