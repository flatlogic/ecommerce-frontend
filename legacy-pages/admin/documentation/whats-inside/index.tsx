import LegacyIcon from "components/compat/LegacyIcon";
import React from "react";
import { Row, Col } from "components/compat/bootstrap";
import Link from "components/compat/Link";
import { withRouter } from "components/compat/router";
import Head from "components/compat/Head";

import screenshot from "public/images/screenshot.png";
import blogScreenshot from "public/images/documentation/Screenshot_1.png";
import passwordScreenshot from "public/images/documentation/Screenshot_2.png";
import userScreenshot from "public/images/documentation/Screenshot_3.png";
import usersScreenshot from "public/images/documentation/Screenshot_4.png";
import Widget from "components/admin/Widget/Widget";

const Overview = () => (
  <Row>
    <Head>
      <title>Ecommerce What is inside</title>
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
      <Widget id="Overview">
        <h1>Overview</h1>
        <p className="lead">
          This large app consists of two parts. Front-end and back-end
          respectively.
          <br />
          Let&apos;s start with the UI part. We have carefully designed and
          coded pages.
          <br />
          With help of NextJS, we are now able to send server-side rendered code
          to the end-user and thus have <strong>SEO-friendly</strong> website.
          <br />
          There is an SEO module in this project, <strong>SEO</strong> content
          can be added and edited by the content manager.
          <br />
          A lot of stuff going on in the admin panel:
          <br />
          <br />
          1) Tables with real backend data, you can preview content without
          opening the view page. Also, you can filter by date.
          <br />
          2) View page where you can see all the fields with or without values
          for a certain entity e.g. product.
          <br />
          3) Edit page is mostly the same as View, but there you can save
          changes.
          <br />
          <br />
          <br />
          <h2>So let&apos;s go over the admin side</h2>
          Nice and clean Home page with charts, statistics, and tabs widget.
          <br />
          Orders tab is a list of orders that you can filter, view, and edit
          <br />
          Feedback is a great thing for online business and we added
          full-featured feedback to this project, you can view and moderate
          feedback, wow!
          <br />
          <br />
          The blog is a small <strong>ready-made CMS</strong>, you can create
          blog posts with a bunch of dynamic data and multiple images just give
          it a try!
          <br />
          <br />
          <img
            className="img-responsive w-100 border mt-4 mb-4"
            src={blogScreenshot}
            alt="screenshot"
          />
          <br />
          <strong>Products</strong> are heart of every e-commerce project you
          can set price, image, category for filtering, discount, and much more
          <br />
          <br />
          Users is a place where all you customers are at a glance.
          <br />
          <br />
          <img
            className="img-responsive w-100 border mt-4 mb-4"
            src={usersScreenshot}
            alt="screenshot"
          />
          <br />
          Categories are mostly used for filtering so-called helper for you
          business.
          <br />
          My profile serves admin and customer to view their data and change it
          if needed.
          <br />
          Change password speaks for itself.
          <br />
          <img
            className="img-responsive w-100 border mt-4 mb-4"
            src={passwordScreenshot}
            alt="screenshot"
          />
          Documentation is designed to help you learn all about this template.
          <br />
          Client-side is accessible for everyone and you can explore it just by
          clicking here and there, all the pages are mobile and{" "}
          <strong>SEO friendly</strong>
          <br />
          <br />
          Check out the billing page, it has stripe integration so you can test
          it out and also easily change stripe credentials so payment setup is
          going to be effortless.
          <br />
          <br />
          There is a wishlist where you can see desired products and purchase at
          some point in time. And much more, explore the template and make a
          purchase.
          <img
            className="img-responsive w-100 border mt-4 mb-4"
            src={userScreenshot}
            alt="screenshot"
          />
        </p>
        <p className="lead">
          <br />
          <h2>
            Let&apos;s talk about what&apos;s going on under the hood and I mean
            backend.
          </h2>
          <br />
          It&apos;s built with help of the express js framework. We use Postgres
          as a database and squelize serves as ORM. There were two reasons why
          we picked this stack. First of all, community, clear documentation,
          and a lot of open-source libraries. Second of all, we are experts with
          this technology.
          <br />
          <br />
          So what is inside?
          <br />
          <br />
          The first thing I want to mention is the passport.js library for
          authentication. Simple, unobtrusive authentication that became
          standard in the <strong>NodeJS</strong> world. For password encryption
          we used bcrypt. In db &gt; api folder we have all the necessary files
          with <strong>CRUD</strong> methods to interact with DB.
          <br />
          <br />
          Models are just data objects that clearly showcase what kind of data
          we can anticipate for each entity.
          <br />
          <br />
          Seeders are a heap of sample data that is added to the web app by
          default with help of yarn reset.
          <br />
          <br />
          In <code>db.config</code> you can configure your database credentials
          for development and production.
          <br />
          <br />
          Routes have files with all available routes and you can see that
          particular routes have passport middleware and some do not, this is a
          great feature if you need certain routes to be reachable by authorized
          users and unauthorized.
          <br />
          <br />
          Services are made following an abstraction pattern. Basically, service
          imports methods from the api and gives you a nice and clean way to
          harness <strong>CRUD</strong> functionality and have readable and
          clean code, enjoy!
          <br />
          <br />
          Config has all the configurations, just update the values and your
          config is ready, as simple as that.
          <br />
          <br />
          All magic happens at the Index file, this is where your node js app
          starts!
          <br />
          <br />
          I believe you will find a lot of new interesting code and development
          practices exploring source code. The file uploading module is really
          powerful and important for every app. After you got a gist of this
          code it will be extremely easy for you to add new routes and enhance
          functionality. The code is readable and even if you don&apos;t have a
          great experience with node and expressjs you will be able to make full
          use of it.
          <br />
          Good Luck!
        </p>
        <img
          className="img-responsive w-100 border"
          src={screenshot}
          alt="screenshot"
        />
        <Link href="/">Live demo</Link>
      </Widget>
      <Widget id="Features">
        <h3 className="">Features</h3>
        <ul className="mt">
          <li className="lead">
            <LegacyIcon className="la la-check" /> Products listing
          </li>
          <li className="lead">
            <LegacyIcon className="la la-check" /> Filter
          </li>
          <li className="lead">
            <LegacyIcon className="la la-check" /> SSR (SEO-friendly)
          </li>
          <li className="lead">
            <LegacyIcon className="la la-check" /> SEO module
          </li>
          <li className="lead">
            <LegacyIcon className="la la-check" /> 2 Dashboards (for admin and
            customer)
          </li>
          <li className="lead">
            <LegacyIcon className="la la-check" /> Blog
          </li>
          <li className="lead">
            <LegacyIcon className="la la-check" /> Content moderation
          </li>
          <li className="lead">
            <LegacyIcon className="la la-check" /> Stripe integration
          </li>
          <li className="lead">
            <LegacyIcon className="la la-check" /> Static & Hover Sidebar
          </li>
          <li className="lead">
            <LegacyIcon className="la la-check" /> PostgersSQL
          </li>
          <li className="lead">
            <LegacyIcon className="la la-check" /> And even more coming soon!
          </li>
        </ul>
      </Widget>
      <Widget id="Support">
        <h2>Support forum</h2>
        <p className="lead">
          For any additional information please go to our support forum and
          raise your questions or feedback provide there. We highly appreciate
          your participation!
        </p>
        <a
          href="https://flatlogic.com/forum"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-default text-gray fw-semi-bold"
        >
          Support forum
        </a>
      </Widget>
      <Row>
        <Col md={5}>
          <Widget title="Continue with">
            <Link href="/admin/documentation/licences">
              <h4 style={{ cursor: "pointer" }}>
                Licences <LegacyIcon className="la la-arrow-right" />
              </h4>
            </Link>
          </Widget>
        </Col>
        <Col md={5}>
          <Widget title="Or learn about">
            <Link href="/admin/documentation/quick-start">
              <h4 style={{ cursor: "pointer" }}>
                How to start project{" "}
                <LegacyIcon className="la la-arrow-right" />
              </h4>
            </Link>
          </Widget>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default withRouter(Overview);
