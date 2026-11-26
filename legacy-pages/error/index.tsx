import React from "react";
import { Container, Row, Col, Button } from "components/compat/bootstrap";
import Link from "components/compat/Link";
import s from "./Error.module.scss";

import InstagramWidget from "components/e-commerce/Instagram";
import Head from "components/compat/Head";

const Index = () => {
  return (
    <>
      <Head>
        <title>404</title>
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
      <Container>
        <Row className={"mb-5"} style={{ marginTop: 32 }}>
          <section className={s.error}>
            <Container className={"h-100"}>
              <Row className={"h-100"}>
                <Col sm={6}></Col>
                <Col
                  sm={6}
                  className={
                    "d-flex flex-column justify-content-center align-items-start"
                  }
                >
                  <h3 className={`${s.eyebrow} fw-bold text-primary mb-3`}>
                    OOPS!
                  </h3>
                  <h2 className={`${s.title} fw-bold mb-4`}>
                    Something’s Missing
                  </h2>
                  <p style={{ width: 300 }} className={"mb-5"}>
                    Unfortunately, we cannot find the page you are looking for.
                    Thought, we tried...
                  </p>
                  <Link href="/">
                    <Button outline color={"primary"} className={"fw-bold"}>
                      TAKE ME AWAY
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </section>
        </Row>
      </Container>
      <InstagramWidget />
    </>
  );
};

export async function getServerSideProps(_context: unknown) {
  return {
    props: {},
  };
}

export default Index;
