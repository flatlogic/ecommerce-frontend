import React from "react";
import { Container, Row, Col } from "components/compat/bootstrap";
import { ToastContainer } from "react-toastify";
import Link from "components/compat/Link";
import product1 from "public/images/e-commerce/home/product1.png";
import product2 from "public/images/e-commerce/home/product2.png";
import product3 from "public/images/e-commerce/home/product3.png";
import product4 from "public/images/e-commerce/home/product4.png";
import mainBanner from "public/images/e-commerce/main_banner.jpg";
import s from "./Categories.module.scss";

import InfoBlock from "components/e-commerce/InfoBlock";
import InstagramWidget from "components/e-commerce/Instagram";
import chevronRightIcon from "public/images/e-commerce/details/chevron-right.svg";
import chevronLeftIcon from "public/images/e-commerce/details/chevron-left.svg";
import Head from "components/compat/Head";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "components/compat/PureCarousel";

const products = [
  {
    id: 0,
    img: product1,
  },
  {
    id: 1,
    img: product2,
  },
  {
    id: 2,
    img: product3,
  },
  {
    id: 3,
    img: product4,
  },
  {
    id: 3,
    img: product1,
  },
  {
    id: 4,
    img: product2,
  },
  {
    id: 5,
    img: product3,
  },
  {
    id: 6,
    img: product4,
  },
];

const Categories = () => {
  const [width, setWidth] = React.useState(1440);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Head>
        <title>Categories</title>
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
      <Container className={s.bannersContainer}>
        <Row>
          <Col md={12} className={s.mainBannerColumn}>
            <Link href="/shop">
              <div className={s.mainBanner}>
                <img src={mainBanner} alt="banner" />
                <h2>NEW ARRIVALS</h2>
              </div>
            </Link>
          </Col>
          <Col md={6} xs={12}>
            <Link href="/category/1fcb7ece-6373-405d-92ef-3f3c4e7dc711">
              <div className={`${s.categoryBlock}`}>
                <div className={s.rightDiscount}>SPRING SALE</div>
              </div>
            </Link>
          </Col>
          <Col md={6} xs={12}>
            <Link href="/category/1fcb7ece-6373-405d-92ef-3f3c4e7dc712">
              <div className={`${s.livingRoomBanner}`}>
                <div className={s.textContent}>
                  <div>
                    <span>Accessories</span>
                    <strong>For Living Room</strong>
                    <b>View Collection</b>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
          <Col md={3} xs={12}>
            <Link href="/category/1fcb7ece-6373-405d-92ef-3f3c4e7dc713">
              <div className={s.pillows}>
                <div>
                  <span>up to 60%</span>
                  <strong>Pillows</strong>
                </div>
              </div>
            </Link>
          </Col>
          <Col md={6} xs={12}>
            <Link href="/category/1fcb7ece-6373-405d-92ef-3f3c4e7dc714">
              <div className={`${s.kitchenBanner}`}>
                <div className={s.textContent}>
                  <div>
                    <span>Accessories</span>
                    <strong>For Living Room</strong>
                    <b>View Collection</b>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
          <Col md={3} xs={12}>
            <Link href="/category/1fcb7ece-6373-405d-92ef-3f3c4e7dc715">
              <div className={s.bedLinen}>
                <strong>Bed Linen</strong>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className={"mb-5"} style={{ position: "relative" }}>
          <h2 className={s.relatedTitle}>You may also like:</h2>
          <CarouselProvider
            className={s.relatedCarousel}
            totalSlides={8}
            visibleSlides={width > 992 ? 4 : width > 576 ? 2 : 1}
            style={{ width: "100%" }}
            infinite
            dragEnabled
            naturalSlideHeight={400}
            naturalSlideWidth={300}
          >
            <ButtonBack
              style={{
                position: "absolute",
                top: "35%",
                zIndex: 99,
                left: -20,
              }}
              className={"btn bg-transparent border-0 p-0"}
            >
              <img src={chevronLeftIcon} alt="Previous products" />
            </ButtonBack>
            <Slider>
              {products.map((c, index) => (
                <Slide index={index} key={index}>
                  <Col className={`${s.product}`}>
                    <Link
                      href={`/products/afaf98d5-4060-4408-967b-c4f4af3d186${index + 1}`}
                    >
                      <a>
                        <img
                          src={c.img}
                          className={"img-fluid"}
                          style={{ width: "100%" }}
                          alt="Awesome Product Name"
                        />
                      </a>
                    </Link>
                    <p className={`${s.productCategory} mt-3 text-muted mb-0`}>
                      Category
                    </p>
                    <Link
                      href={`/products/afaf98d5-4060-4408-967b-c4f4af3d1861`}
                    >
                      <a>
                        <h6
                          className={"fw-bold font-size-base mt-1"}
                          style={{ fontSize: 16 }}
                        >
                          Awesome Product Name
                        </h6>
                      </a>
                    </Link>
                    <h6 style={{ fontSize: 16 }}>$70</h6>
                  </Col>
                </Slide>
              ))}
            </Slider>
            <ButtonNext
              style={{
                position: "absolute",
                top: "35%",
                zIndex: 99,
                right: -20,
              }}
              className={"btn bg-transparent border-0 p-0"}
            >
              <img src={chevronRightIcon} alt="Next products" />
            </ButtonNext>
          </CarouselProvider>
        </Row>
      </Container>
      <InfoBlock />
      <InstagramWidget />
    </>
  );
};

export default Categories;
