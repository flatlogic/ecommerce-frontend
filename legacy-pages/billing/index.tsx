import React, { useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  FormGroup,
  Label,
  Input,
  Form,
} from "components/compat/bootstrap";
import Link from "components/compat/Link";
import s from "./Billing.module.scss";
import heartIcon from "public/images/e-commerce/heart.svg";
import axios from "axios";
import { toast } from "react-toastify";
import countryList from "react-select-country-list";
import MaskInput from "components/compat/MaskInput";
import { z } from "zod";
import Head from "components/compat/Head";
import Checkbox from "components/compat/Checkbox";

const checkoutSessionSchema = z.object({ url: z.string().url() });

const Index = () => {
  const options = useMemo(() => countryList().getData(), []);
  const [mask, setMask] = React.useState("0000-0000-0000-0000");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value.indexOf("34") === 0 ||
      e.target.value.indexOf("37") === 0
    ) {
      setMask("0000-000000-00000");
      return;
    }

    setMask("0000-0000-0000-0000");
  };
  const [selected, setSelected] = React.useState(1);
  const processPayment = async () => {
    try {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin;
      const session = await axios.post("/payment/session-initiate", {
        customerEmail: "example@gmail.com",
        clientReferenceId: "12",
        lineItem: {
          name: "My Name",
          description: "My Description",
          images: [
            "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/1.png",
          ],
          amount: 100,
          currency: "eur",
          quantity: 1,
        },
        successUrl: `${appUrl}/`,
        cancelUrl: `${appUrl}/error`,
      });
      const { url } = checkoutSessionSchema.parse(session.data);
      window.location.assign(url);
    } catch {
      toast.error("Unable to start checkout. Please try again.");
    }
  };

  return (
    <Container className={"mb-5"} style={{ marginTop: 32 }}>
      <Head>
        <title>Billing</title>
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
      <Row>
        <Col sm={12}>
          <section className={`${s.loginSection} py-4`}>
            <p className={"mb-0 mr-2"}>Returning customer?</p>
            <Link href={"/login"} className={"text-primary fw-bold"}>
              Click here to Login
            </Link>
          </section>
        </Col>
      </Row>
      <Row className={"my-5"}>
        <Col sm={12}>
          <h3 className={"fw-bold"}>Billing Info</h3>
          <p>
            Choose a payment option below and fill out the aproriate infomation
          </p>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <ButtonGroup className={`${s.btnGroup}`}>
            <Button
              outline
              color={"primary"}
              active={selected === 1}
              onClick={() => setSelected(1)}
              className={`mr-4 fw-bold ${s.btn}`}
            >
              <img src={heartIcon} alt="" />
              Credit Card
            </Button>
            <Button
              outline
              color={"primary"}
              active={selected === 2}
              onClick={() => setSelected(2)}
              className={"mr-4 fw-bold"}
            >
              <img src={heartIcon} alt="" />
              PayPal
            </Button>
            <Button
              outline
              color={"primary"}
              active={selected === 3}
              onClick={() => setSelected(3)}
              className={"mr-4 fw-bold"}
            >
              <img src={heartIcon} alt="" />
              Cash
            </Button>
            <Button
              outline
              color={"primary"}
              active={selected === 4}
              onClick={() => setSelected(4)}
              className={"fw-bold"}
            >
              <img src={heartIcon} alt="" />
              Other
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className={"mt-5"}>
        <Col lg={8} xs={12}>
          <h3 className={"fw-bold mb-5"}>Billing Address</h3>
          <Form className={s.form}>
            <FormGroup>
              <Label for="exampleEmail" className="fw-bold">
                First Name*
              </Label>
              <Input
                type="text"
                name="text"
                id="exampleEmail"
                className="w-100"
              />
            </FormGroup>
            <FormGroup className="d-flex">
              <div className="flex-fill mr-5">
                <Label for="exampleEmail" className="fw-bold">
                  Country*
                </Label>
                <Input
                  type="select"
                  name="text"
                  id="exampleEmail"
                  style={{ paddingTop: 0, paddingBottom: 0 }}
                >
                  {options.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Input>
              </div>
              <div className="flex-fill">
                <Label for="exampleEmail" className="fw-bold">
                  City*
                </Label>
                <Input type="text" name="text" id="exampleEmail" />
              </div>
            </FormGroup>
            <FormGroup className="d-flex">
              <div className="flex-fill mr-5">
                <Label for="exampleEmail" className="fw-bold">
                  Street
                </Label>
                <Input type="text" name="text" id="exampleEmail" />
              </div>
              <div className="flex-fill">
                <Label for="exampleEmail" className="fw-bold">
                  Apt / Suite / Other
                </Label>
                <Input type="text" name="text" id="exampleEmail" />
              </div>
            </FormGroup>
            <FormGroup className={`d-flex`}>
              <div className="flex-fill mr-5">
                <Label for="exampleEmail" className="fw-bold">
                  Postcode
                </Label>
                <Input type="text" name="text" id="exampleEmail" />
              </div>
              <div className="flex-fill mr-5">
                <Label for="exampleEmail" className="fw-bold">
                  Phone
                </Label>
                <Input
                  type="text"
                  name="text"
                  id="exampleEmail"
                  placeholder={"+ 375 (29) "}
                />
              </div>
              <div className="flex-fill">
                <Label for="exampleEmail" className="fw-bold">
                  ZIP Code
                </Label>
                <Input type="text" name="text" id="exampleEmail" />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail" className="fw-bold">
                Email*
              </Label>
              <Input type="email" name="text" id="exampleEmail" />
            </FormGroup>
          </Form>
        </Col>
        <Col lg={4} xs={12}>
          <section className={s.paymentInfo}>
            <h3 className={"fw-bold mb-0"}>Credit Card Info</h3>
            <Form className={`${s.form} mt-4`}>
              <FormGroup>
                <Label for="exampleEmail" className="fw-bold">
                  Name On Card
                </Label>
                <Input
                  type="text"
                  name="text"
                  id="exampleEmail"
                  className="w-100"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail" className="fw-bold">
                  Card Number
                </Label>
                <MaskInput
                  onChange={onChange}
                  maskChar="_"
                  mask={mask}
                  alwaysShowMask
                  size={20}
                  className="card w-100 form-control"
                />
              </FormGroup>
              <FormGroup className={`d-flex`}>
                <div className="flex-fill mr-2">
                  <Label for="exampleEmail" className="fw-bold">
                    Exp.Month
                  </Label>
                  <Input
                    type="select"
                    name="text"
                    id="exampleEmail"
                    style={{ padding: "10px 24px" }}
                  >
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </Input>
                </div>
                <div className="flex-fill">
                  <Label for="exampleEmail" className="fw-bold">
                    Exp. Year
                  </Label>
                  <Input
                    type="select"
                    name="text"
                    id="exampleEmail"
                    style={{ padding: "10px 24px" }}
                  >
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                  </Input>
                </div>
              </FormGroup>
              <FormGroup className={"d-flex"}>
                <div className="mr-4">
                  <Label for="exampleEmail" className="fw-bold">
                    CVV
                  </Label>
                  <Input
                    title="Do not show this to anybody"
                    maxLength={3}
                    type="text"
                    name="text"
                    id="exampleEmail"
                    placeholder={"123"}
                    className={"info"}
                    style={{ maxWidth: "110px", minWidth: "110px" }}
                  />
                </div>
                <Label check className={"d-flex align-items-center"}>
                  <Checkbox
                    borderColor={"#232323"}
                    borderWidth={1}
                    borderRadius={2}
                    icon={
                      <div
                        style={{
                          backgroundColor: "#bd744c",
                          borderRadius: 2,
                          padding: 4,
                        }}
                      />
                    }
                    size={16}
                    label={
                      <p
                        className={"mb-0 align-self-end mr-3"}
                        style={{ marginTop: 17 }}
                      >
                        Set as default payment method
                      </p>
                    }
                    style={{ marginTop: 17 }}
                  />
                </Label>
              </FormGroup>
              <Button
                color={"primary"}
                className={`${s.checkOutBtn} text-uppercase mt-auto fw-bold`}
                onClick={processPayment}
              >
                PLACE ORDER
              </Button>
            </Form>
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
