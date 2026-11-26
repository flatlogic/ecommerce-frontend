import LegacyIcon from "components/compat/LegacyIcon";
import React from "react";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Button,
} from "components/compat/bootstrap";
import { Link } from "components/compat/router";

import s from "./ErrorPage.module.scss";

class ErrorPage extends React.Component {
  override render() {
    return (
      <div className={s.errorPage}>
        <Container>
          <div className={`${s.errorContainer} mx-auto`}>
            <h1 className={s.errorCode}>404</h1>
            <p className={s.errorInfo}>
              Opps, it seems that this page does not exist.
            </p>
            <p className={[s.errorHelp, "mb-3"].join(" ")}>
              If you are sure it should, search for it.
            </p>
            <Form method="get">
              <FormGroup>
                <Input
                  className="input-no-border"
                  type="text"
                  placeholder="Index Pages"
                />
              </FormGroup>
              <Link to="app/extra/search">
                <Button className={s.errorBtn} type="submit" color="success">
                  Index <LegacyIcon className="la la-search text-white ml-xs" />
                </Button>
              </Link>
            </Form>
          </div>
          <footer className={s.pageFooter}>
            {new Date().getFullYear()} &copy; React Ecommerce.
          </footer>
        </Container>
      </div>
    );
  }
}

export async function getServerSideProps(_context: unknown) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default ErrorPage;
