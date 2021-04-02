import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import img from "public/images/e-commerce/404/404.png";
import s from "./Error.module.scss";

import InstagramWidget from 'components/e-commerce/Instagram';
import Head from "next/head";

const Index = () => {
  return (
    <>
      <Head>
        <title>404</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
                  <h3 className={"fw-bold text-primary mb-3"}>OOPS!</h3>
                  <h2 className={"fw-bold mb-4"}>Something’s Missing</h2>
                  <p style={{ width: 300 }} className={"mb-5"}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </p>
                  <Button outline color={"primary"} className={"fw-bold"}>
                    TAKE ME AWAY
                  </Button>
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

export async function getServerSideProps(context) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {  }, // will be passed to the page component as props
  };
}

export default Index;
