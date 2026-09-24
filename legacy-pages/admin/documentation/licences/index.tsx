import React from "react";
import { Row, Col, Table } from "components/compat/bootstrap";
import Head from "components/compat/Head";

import Widget from "components/admin/Widget/Widget";

const Licences = () => (
  <Row>
    <Head>
      <title>Ecommerce Licences</title>
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
    <Col lg={10}>
      <Widget id="Licences">
        <h2>Licences</h2>
        <p className="lead">
          A license grants you a non-exclusive and non-transferable right to use
          and incorporate the item in your personal or commercial projects. If
          your end product including an item is going to be free to the end user
          then a Single License is what you need. An Extended License is
          required if the end user must pay to use the end product.
        </p>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Single</th>
              <th>Extended</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hundreds unique components</td>
              <td className="text-success fw-bold">+</td>
              <td className="text-success fw-bold">+</td>
            </tr>
            <tr>
              <td>All pages</td>
              <td className="text-success fw-bold">+</td>
              <td className="text-success fw-bold">+</td>
            </tr>
            <tr>
              <td>Free Updates</td>
              <td>3 months</td>
              <td>6 months</td>
            </tr>
            <tr>
              <td>Paying users allowed</td>
              <td className="text-danger fw-bold">-</td>
              <td className="text-success fw-bold">+</td>
            </tr>
          </tbody>
        </Table>
      </Widget>
      <Widget id="Single">
        <h3>Single Application License</h3>
        <p className="lead">
          Your use of the item is restricted to a single application. You may
          use the item in work which you are creating for your own purposes or
          for your client. You must not incorporate the item in a work which is
          created for redistribution or resale by you or your client. The item
          may not be redistributed or resold. You may not charge users for using
          your application.
        </p>
      </Widget>
      <Widget id="Extended">
        <h3>Extended Application License</h3>
        <p className="lead">
          Your use of the item is restricted to a single application. You may
          use the item in work which you are creating for your own purposes or
          for your clients. You are licensed to use the Item to create one
          single End Product for yourself or for one client (a “single
          application”), and the End Product may be Sold and users may be
          charged for using it (e.g. you are building SAAS application).
        </p>
      </Widget>
      <p className="mt">
        In case if you need any clarifications considering licenses feel free to
        contact us via email:{" "}
        <a className="text-warning" href="mailto:support@flatlogic.com">
          support@flatlogic.com
        </a>
        .
      </p>
    </Col>
  </Row>
);

export default Licences;
