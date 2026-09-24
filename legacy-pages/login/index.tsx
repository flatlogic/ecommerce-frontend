import React from "react";
import { useRouter, type CompatRouter } from "components/compat/router";
import Link from "components/compat/Link";
import {
  Container,
  Button,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Form,
} from "components/compat/bootstrap";
import Head from "components/compat/Head";
import { loginUser } from "@/redux/actions/auth";
import jwt from "components/compat/jwt";
import logo from "public/images/e-commerce/logo.svg";
import eye from "public/images/e-commerce/login/eye.png";
import eyeOff from "public/images/e-commerce/login/eye-off.png";

import s from "./Login.module.scss";
import { store } from "@/redux/store";

interface LoginProps {
  router: CompatRouter;
}
interface LoginState {
  email: string;
  password: string;
  viewPassword: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
  static isAuthenticated() {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);
    if (!data?.exp) return false;
    return date < data.exp;
  }

  constructor(props: LoginProps) {
    super(props);

    this.state = {
      email: "admin@flatlogic.com",
      password: "password",
      viewPassword: false,
    };

    this.doLogin = this.doLogin.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.microsoftLogin = this.microsoftLogin.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  changeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ email: event.target.value });
  }

  changePassword(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: event.target.value });
  }

  doLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    store.dispatch(
      loginUser({ email: this.state.email, password: this.state.password }),
    );
  }

  googleLogin() {
    store.dispatch(loginUser({ social: "google" }));
  }

  microsoftLogin() {
    store.dispatch(loginUser({ social: "microsoft" }));
  }

  signUp() {
    this.props.router.push("/register");
  }

  override render() {
    return (
      <>
        <Head>
          <title>Login | Ecommerce</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />

          <meta
            name="description"
            content={
              "Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development"
            }
          />
          <meta name="keywords" content={"flatlogic, react templates"} />
          <meta name="author" content={"Flatlogic LLC."} />
          <meta charSet="utf-8" />

          <meta
            property="og:title"
            content={
              "Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes"
            }
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={"https://flatlogic-ecommerce.herokuapp.com/"}
          />
          <meta
            property="og:image"
            content={
              "https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg"
            }
          />
          <meta
            property="og:description"
            content={
              "Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development"
            }
          />
          <meta name="twitter:card" content="summary_large_image" />

          <meta property="fb:app_id" content={"712557339116053"} />

          <meta property="og:site_name" content={"Flatlogic"} />
          <meta name="twitter:site" content={"@flatlogic"} />
        </Head>
        <Row noGutters style={{ height: "100vh" }}>
          <Col
            xs={12}
            md={6}
            className={
              "d-flex flex-column justify-content-center align-items-center h-100"
            }
          >
            <Container>
              <Row className={"d-flex justify-content-center"}>
                <Col lg={8} xs={"auto"}>
                  <Link href={"/"}>
                    <img
                      src={logo}
                      alt={"logo"}
                      style={{ marginBottom: 120 }}
                    />
                  </Link>
                  <h5 className={"fw-bold mb-5"}>Login</h5>
                  <Form className={"w-100"} onSubmit={this.doLogin}>
                    <FormGroup>
                      <Label
                        for="exampleEmail"
                        className={`fw-bold ${s.label}`}
                      >
                        Email
                      </Label>
                      <Input
                        type="email"
                        name="text"
                        id="exampleEmail"
                        className={`w-100 ${s.input}`}
                        placeholder={"Email"}
                        value={this.state.email}
                        onChange={this.changeEmail}
                        required
                      />
                    </FormGroup>
                    <FormGroup className={s.formGroup}>
                      <Label
                        for="examplePassword"
                        className={`fw-bold ${s.label}`}
                      >
                        Password
                      </Label>
                      <Input
                        type={this.state.viewPassword ? "text" : "password"}
                        name="text"
                        id="examplePassword"
                        className={`w-100 ${s.input}`}
                        placeholder={"Password"}
                        value={this.state.password}
                        onChange={this.changePassword}
                        required
                      />
                      <img
                        className={s.viewPassword}
                        src={this.state.viewPassword ? eye : eyeOff}
                        onClick={() =>
                          this.setState({
                            viewPassword: !this.state.viewPassword,
                          })
                        }
                        alt="Toggle password visibility"
                      />
                    </FormGroup>
                    <div
                      className={
                        "d-flex justify-content-between align-items-center mt-5"
                      }
                    >
                      <Link href={"/register"} className={s.link}>
                        Create an account
                      </Link>
                      <Button
                        type="submit"
                        color={"primary"}
                        className={`${s.button} fw-bold text-uppercase`}
                      >
                        Login
                      </Button>
                    </div>
                  </Form>
                  <footer
                    className={`d-flex justify-content-between ${s.footer}`}
                  >
                    <Link href={"#"} className={s.link}>
                      Terms & Conditions
                    </Link>
                    <Link href={"#"} className={s.link}>
                      Privacy Policy
                    </Link>
                    <Link href={"/forgot"} className={s.link}>
                      Forgot password
                    </Link>
                  </footer>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col
            sm={6}
            className={`d-none d-md-inline-block h-100 ${s.backgroundImage}`}
          />
        </Row>
      </>
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

export default function LoginWithRouter() {
  return <Login router={useRouter()} />;
}
