import React from "react";
import { Container, Row, Col } from "reactstrap";
import img1 from "public/images/e-commerce/about/img1.png";
import img2 from "public/images/e-commerce/about/img2.png";
import s from "./About.module.scss";
import Head from "next/head";

const Index = () => {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta name="description" content="Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development" />
        <meta name="keywords" content="flatlogic, react templates" />
        <meta name="author" content="Flatlogic LLC." />
        <meta charSet="utf-8" />


        <meta property="og:title" content="Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://flatlogic-ecommerce.herokuapp.com/"/>
        <meta property="og:image" content="https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg"/>
        <meta property="og:description" content="Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development"/>
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="fb:app_id" content="712557339116053" />

        <meta property="og:site_name" content="Flatlogic"/>
        <meta name="twitter:site" content="@flatlogic" />
      </Head>
      <Container className={"mb-5"} style={{ marginTop: 32 }}>
        <Row>
          <Col lg={7} md={7} xs={12}>
            <h3 className="fw-bold mb-5">About Us</h3>
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
                <h4 className="fw-bold mb-4" style={{ width: "80%" }}>
                  Differentiate Yourself And Attract More Attention, Sales, And
                  Profits
                </h4>
                <p className={`${s.text}`}>
                  There is no denying that the success of an advertisement lies
                  mostly in the headline. The headline should catch the reader’s
                  attention and make him read the rest of the advertisement. the
                  reader’s attention and make him read the rest of the
                  advertisement.{" "}
                </p>
                <div className={`${s.borderLine}`} />
                <hr className="mt-4" />
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
                  Technology
                </h6>
                <h4 className="fw-bold mb-4" style={{ width: "80%" }}>
                  Differentiate Yourself And Attract More Attention, Sales, And
                  Profits
                </h4>
                <p className="text-muted" style={{ width: "93%" }}>
                  There is no denying that the success of an advertisement lies
                  mostly in the headline. The headline should catch the reader’s
                  attention and make him read the rest of the advertisement. the
                  reader’s attention and make him read the rest of the
                  advertisement.{" "}
                </p>
                <div className={`${s.borderLine}`} />
                <hr className="mt-4" />
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
                  Technology
                </h6>
                <h4 className="fw-bold mb-4" style={{ width: "80%" }}>
                  Differentiate Yourself And Attract More Attention, Sales, And
                  Profits
                </h4>
                <p className="text-muted" style={{ width: "93%" }}>
                  There is no denying that the success of an advertisement lies
                  mostly in the headline. The headline should catch the reader’s
                  attention and make him read the rest of the advertisement. the
                  reader’s attention and make him read the rest of the
                  advertisement.{" "}
                </p>
                <div className={`${s.borderLine}`} />
                <hr className="mt-4" />
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

export async function getServerSideProps(context) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {  }, // will be passed to the page component as props
  };
}

export default Index;
