import React from "react";
import PropTypes from "prop-types";
import {withRouter} from 'next/router'
import Link from 'next/link'
import { connect } from "react-redux";
import { Alert, Button, Container } from "reactstrap";
import Widget from "components/admin/Widget";
import { sendPasswordResetEmail } from "redux/actions/auth";

class Index extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
    };

    this.changeEmail = this.changeEmail.bind(this);
    this.doSendResetEmail = this.doSendResetEmail.bind(this);
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  doSendResetEmail(e) {
    e.preventDefault();
    this.props.dispatch(sendPasswordResetEmail(this.state.email));
  }

  render() {
    return (
      <div className="auth-page">
        <Container>
          <h5 className="auth-logo">
            <i className="la la-circle text-gray" />
            React UM
            <i className="la la-circle text-warning" />
          </h5>
          <Widget
            className="widget-auth mx-auto"
            title={<h3 className="mt-0">Forgot password?</h3>}
          >
            <p className="widget-auth-info">Please fill your email below</p>
            <form className="mt" onSubmit={this.doSendResetEmail}>
              {this.props.errorMessage && (
                <Alert className="alert-sm" color="danger">
                  {this.props.errorMessage}
                </Alert>
              )}
              <div className="form-group">
                <input
                  className="form-control no-border"
                  value={this.state.email}
                  onChange={this.changeEmail}
                  type="email"
                  required
                  name="email"
                  placeholder="Email"
                />
              </div>
              <Button
                type="submit"
                color="inverse"
                className="auth-btn mb-3"
                size="sm"
              >
                {this.props.isFetching ? "Loading..." : "Send"}
              </Button>
            </form>
            <p className="widget-auth-info">Need to Login?</p>
            <Link className="d-block text-center" href="/login">
              Enter the account
            </Link>
          </Widget>
        </Container>
        <footer className="auth-footer">
          {new Date().getFullYear()} &copy; React User Management.
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    errorMessage: state.auth.errorMessage,
  };
}

export async function getServerSideProps(context) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {  }, // will be passed to the page component as props
  };
}

export default withRouter(connect(mapStateToProps)(Index));
