import LegacyIcon from "components/compat/LegacyIcon";
import React, { useState, type FormEvent } from "react";
import Link from "components/compat/Link";
import { Alert, Button, Container } from "components/compat/bootstrap";
import Widget from "components/admin/Widget";
import Head from "components/compat/Head";
import { sendPasswordResetEmail } from "@/redux/actions/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import s from "./Forgot.module.scss";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const { errorMessage, isFetching } = useAppSelector((state) => state.auth);

  function doSendResetEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(sendPasswordResetEmail(email));
  }

  return (
    <>
      <Head>
        <title>Forgot password | Ecommerce</title>
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
      <div className="auth-page">
        <Container>
          <h5 className="auth-logo">
            <LegacyIcon className={`${s.logoIcon} la la-circle text-gray`} />
            Flatlogic Ecommerce
            <LegacyIcon className={`${s.logoIcon} la la-circle text-warning`} />
          </h5>
          <Widget
            className="widget-auth mx-auto text-center"
            title={<h3 className={`${s.title} mt-0`}>Forgot password?</h3>}
          >
            <p className="widget-auth-info">Please fill your email below</p>
            <form className="mt" onSubmit={doSendResetEmail}>
              {errorMessage && (
                <Alert className="alert-sm" color="danger">
                  {errorMessage}
                </Alert>
              )}
              <div className={`${s.formGroup} form-group`}>
                <input
                  className={`${s.input} form-control no-border`}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  required
                  name="email"
                  placeholder="Email"
                />
              </div>
              <Button
                type="submit"
                color="primary"
                className={`${s.submitButton} auth-btn mb-3`}
                size="sm"
              >
                {isFetching ? "Loading..." : "Send"}
              </Button>
            </form>
            <p className="widget-auth-info mt-5">Need to Login?</p>
            <Link className={s.accountLink} href="/login">
              Enter the account
            </Link>
          </Widget>
        </Container>
        <footer className="auth-footer">
          {new Date().getFullYear()} &copy; React Ecommerce.
        </footer>
      </div>
    </>
  );
}

export async function getServerSideProps(_context: unknown) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default ForgotPassword;
