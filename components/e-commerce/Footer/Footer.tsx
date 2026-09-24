import React from "react";
import s from "./Footer.module.scss";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
} from "components/compat/bootstrap";
import Link from "components/compat/Link";

import logo from "public/images/e-commerce/logo-white.svg";
import Google from "public/images/e-commerce/Google";
import Twitter from "public/images/e-commerce/Twitter";
import Linkedin from "public/images/e-commerce/Linkedin";
import Facebook from "public/images/e-commerce/Facebook";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <Container className={s.footerContainer}>
        <Row className={"justify-content-between"}>
          <Col xl={5} md={5}>
            <h5 className={"text-white fw-bold"}>Many desktop publishing</h5>
            <p className={`${s.mutedText} mt-3`}>
              Do you want to receive exclusive email offers? Subscribe to our
              newsletter! You will receive a unique promo code which gives you a
              20% discount on all our products in 10 minutes.
            </p>
          </Col>
          <Col xl={5} md={7} className={"d-flex align-items-center"}>
            <Input
              type={"email"}
              placeholder={"Enter your email"}
              className={`${s.newsletterInput} border-0`}
              style={{ height: 51 }}
            />
            <Button color={"primary"} className={"fw-bold"}>
              Subscribe
            </Button>
          </Col>
        </Row>
        <>
          <hr className={s.footer__hr} />
          <Row className={"my-5 justify-content-between"}>
            <Col
              xl={5}
              md={3}
              className={"d-flex flex-column justify-content-between"}
            >
              <div>
                <img alt="img" src={logo} className={"mb-4"} />
                <p className={"text-white fw-thin mb-0"}>
                  Lorem Ipsum has been the industry&apos;s standard dummy text
                  ever since the 1500s,
                </p>
              </div>
              <div className={s.socialLinks}>
                <Link href="https://flatlogic.com/">
                  <a
                    className={s.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Google />
                  </a>
                </Link>
                <Link href="https://twitter.com/flatlogic">
                  <a
                    className={s.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter />
                  </a>
                </Link>
                <Link href="https://www.linkedin.com/company/flatlogic/">
                  <a
                    className={s.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin />
                  </a>
                </Link>
                <Link href="https://www.facebook.com/flatlogic/">
                  <a
                    className={s.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook />
                  </a>
                </Link>
              </div>
            </Col>
            <Col md={9} xl={7} sm={12}>
              <Row className={s.linksRow}>
                <Col md={4} sm={6} xs={12}>
                  <h5 className={"text-white fw-bold text-uppercase mb-4"}>
                    company
                  </h5>
                  <Link href="/about">
                    <h6 className={`mb-3 ${s.navigationLink}`}>What We Do</h6>
                  </Link>
                  <Link href="/shop">
                    <h6 className={`mb-3 ${s.navigationLink}`}>
                      Available Services
                    </h6>
                  </Link>
                  <Link href="/blog">
                    <h6 className={`mb-3 ${s.navigationLink}`}>Latest Posts</h6>
                  </Link>
                  <Link href="/faq">
                    <h6 className={`mb-3 ${s.navigationLink}`}>FAQs</h6>
                  </Link>
                </Col>
                <Col md={4} sm={6} xs={12}>
                  <h5 className={"text-white fw-bold text-uppercase mb-4"}>
                    my account
                  </h5>
                  <Link href="/login">
                    <h6 className={`mb-3 ${s.navigationLink}`}>Sign In</h6>
                  </Link>
                  <Link href="/cart">
                    <h6 className={`mb-3 ${s.navigationLink}`}>View Cart</h6>
                  </Link>
                  <Link href="account/">
                    <h6 className={`mb-3 ${s.navigationLink}`}>
                      Order Tracking
                    </h6>
                  </Link>
                  <Link href="/faq">
                    <h6 className={`mb-3 ${s.navigationLink}`}>
                      Help & Support
                    </h6>
                  </Link>
                </Col>
                <Col md={4} sm={6} xs={12}>
                  <h5
                    className={
                      "text-white fw-bold text-uppercase text-nowrap mb-4"
                    }
                  >
                    customer service
                  </h5>
                  <Link href="/contact">
                    <h6 className={`mb-3 ${s.navigationLink}`}>
                      Help & Contact Us
                    </h6>
                  </Link>
                  <Link href="/account">
                    <h6 className={`mb-3 ${s.navigationLink}`}>
                      Returns & Refunds
                    </h6>
                  </Link>
                  <Link href="/shop">
                    <h6 className={`mb-3 ${s.navigationLink}`}>
                      Online Stores
                    </h6>
                  </Link>
                  <Link href="/about-team">
                    <h6 className={`mb-3 ${s.navigationLink}`}>
                      Terms & Conditions
                    </h6>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
        <hr className={`${s.footer__hr} mb-0`} />
        <Row style={{ padding: "30px 0" }}>
          <Col sm={12}>
            <p className={`${s.mutedText} mb-0`}>
              © 2020-{new Date().getFullYear()} powered by{" "}
              <Link href="https://flatlogic.com">
                <span className={s.navigationLink}>Flatlogic</span>
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
