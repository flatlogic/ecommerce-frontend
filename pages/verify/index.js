import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { verifyEmail } from "redux/actions/auth";
import { connect } from "react-redux";

class Index extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // const params = new URLSearchParams(this.props.location.search);
    // const token = params.get("token");
    // if (token) {
    //   this.props.dispatch(verifyEmail(token));
    // }
  }

  render() {
    return <></>;
  }
}

export async function getServerSideProps(context) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {  }, // will be passed to the page component as props
  };
}

export default withRouter(connect()(Index));
