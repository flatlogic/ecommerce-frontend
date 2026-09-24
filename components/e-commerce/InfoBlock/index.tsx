import React from "react";
import { Col, Container, Row } from "components/compat/bootstrap";

import moneyBack from "public/images/e-commerce/home/Sync.svg";
import car from "public/images/e-commerce/home/car.svg";
import call from "public/images/e-commerce/home/headphones.svg";
import s from "./InfoBlock.module.scss";

const benefits = [
  {
    description: "On all orders of $ 150",
    icon: car,
    title: "free shipping",
  },
  {
    description: "Get help when you need it",
    icon: call,
    title: "24/7 support",
  },
  {
    description: "30 day money back guarantee",
    icon: moneyBack,
    title: "100% money back",
  },
] as const;

const InfoBlock = () => (
  <>
    <hr />
    <div className={s.info}>
      <Container className={s.infoContainer}>
        <Row className={s.infoRow}>
          {benefits.map(({ description, icon, title }) => (
            <Col key={title} xs={12} md={4} className={s.infoItem}>
              <section className={s.infoContent}>
                <img
                  aria-hidden="true"
                  alt=""
                  src={icon}
                  className={s.infoIcon}
                />
                <div>
                  <h5 className="fw-bold text-uppercase">{title}</h5>
                  <p className={`mb-0 ${s.infoDescription}`}>{description}</p>
                </div>
              </section>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
    <hr />
  </>
);

export default InfoBlock;
