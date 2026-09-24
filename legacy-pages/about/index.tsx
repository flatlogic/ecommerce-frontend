import React from "react";
import { Container, Row, Col } from "components/compat/bootstrap";
import img1 from "public/images/e-commerce/about/img1.png";
import img2 from "public/images/e-commerce/about/img2.png";
import s from "./About.module.scss";
import Head from "components/compat/Head";

const Index = () => {
  return (
    <>
      <Head>
        <title>About</title>
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
      <Container
        className={`${s.aboutContainer} mb-5`}
        style={{ marginTop: 32 }}
      >
        <Row>
          <Col lg={7} md={7} xs={12}>
            <h3 className={`${s.pageTitle} fw-bold mb-5`}>About Us</h3>
            <div style={{ position: "relative" }} className="mb-5">
              <h1
                style={{
                  fontSize: 88,
                  color: "#f5f5f5",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  zIndex: -1,
                }}
                className="fw-bold"
              >
                01
              </h1>
              <div style={{ paddingLeft: 67, paddingTop: 28 }}>
                <h6 className="text-primary text-uppercase mb-3 fw-bold">
                  Technology
                </h6>
                <h4
                  className={`${s.articleTitle} fw-bold mb-4`}
                  style={{ width: "80%" }}
                >
                  Sustainable Furniture Rocks This World! Check Out New
                  Minimalistic Wooden Collection
                </h4>
                <p>
                  There is no denying that eco-friendly materials can easily
                  conquer the market. But can we produce enough to fulfill the
                  growing demands? Can we create an astonishing look for the new
                  collection of eco-friendly furniture? That is a tough
                  question. But did make an effort!{" "}
                </p>
                <div className={`${s.borderLine}`} />
                <hr className={`${s.divider} mt-4`} />
              </div>
            </div>
            <div style={{ position: "relative" }} className="mb-5">
              <h1
                style={{
                  fontSize: 88,
                  color: "#f5f5f5",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  zIndex: -1,
                }}
                className="fw-bold"
              >
                02
              </h1>
              <div style={{ paddingLeft: 67, paddingTop: 28 }}>
                <h6 className="text-primary text-uppercase mb-3 fw-bold">
                  Interior
                </h6>
                <h4
                  className={`${s.articleTitle} fw-bold mb-4`}
                  style={{ width: "80%" }}
                >
                  Primary Palette Can Allow You To Be Bold! Give Your Interior
                  Artistic Edge
                </h4>
                <p className={s.mutedText} style={{ width: "93%" }}>
                  Use this well-known tip for mixing two primary colors with a
                  trendy muted palette. Neutral spaces with wooden furniture can
                  be changed within a minutes using the right set of vibrant
                  colors. Such interior design helps you to stand out from
                  ordinary palettes.{" "}
                </p>
                <div className={`${s.borderLine}`} />
                <hr className={`${s.divider} mt-4`} />
              </div>
            </div>
            <div style={{ position: "relative" }} className="mb-5">
              <h1
                style={{
                  fontSize: 88,
                  color: "#f5f5f5",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  zIndex: -1,
                }}
                className="fw-bold"
              >
                03
              </h1>
              <div style={{ paddingLeft: 67, paddingTop: 28 }}>
                <h6 className="text-primary text-uppercase mb-3 fw-bold">
                  Design
                </h6>
                <h4
                  className={`${s.articleTitle} fw-bold mb-4`}
                  style={{ width: "80%" }}
                >
                  Check Out The Latest Design Trends! Minimalism, Stripes, and
                  Sculptural Furniture
                </h4>
                <p className={s.mutedText} style={{ width: "93%" }}>
                  Let&apos;s mix stripes and checks - everyone&apos;s favorite
                  patterns. New-season colors add the right balance to this
                  awesome mix. Even in bedroom decor you can use this fun new
                  trend along with classic cushions and delicate color scheme or
                  love colorful decoration.{" "}
                </p>
                <div className={`${s.borderLine}`} />
                <hr className={`${s.divider} mt-4`} />
              </div>
            </div>
          </Col>
          <Col lg={5} md={5} xs={12} className="d-flex flex-column">
            <img src={img1} alt="img1" className={`${s.aboutImg} mb-5`} />
            <img src={img2} alt="img2" className={s.aboutImg} />
          </Col>
        </Row>
      </Container>
    </>
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
