import React, { Component } from "react";
import ProductsForm from "./ProductForm";
import { push } from "connected-react-router";
import actions from "redux/actions/products/productsFormActions";
import { connect } from "react-redux";
import {withRouter} from "next/router";

class Index extends Component {
  state = {
    dispatched: false,
  };

  componentDidMount() {
    const { dispatch, router } = this.props;
    if (this.isEditing()) {
      dispatch(actions.doFind(router.query.id));
    } else {
      if (this.isProfile()) {
        const currentUser = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("user"));
        const currentUserId = currentUser.user.id;
        dispatch(actions.doFind(currentUserId));
      } else {
        dispatch(actions.doNew());
      }
    }
    this.setState({ dispatched: true });
  }

  doSubmit = (id, data) => {
    const { dispatch } = this.props;
    if (this.isEditing() || this.isProfile()) {
      dispatch(actions.doUpdate(id, data, this.isProfile()));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  isEditing = () => {
    const { router } = this.props;
    return !!router.query.id;
  };

  isProfile = () => {
    const { router } = this.props;
    return router.pathname === "/app/profile";
  };

  render() {
    return (
      <React.Fragment>
        {this.state.dispatched && (
          <ProductsForm
            saveLoading={this.props.saveLoading}
            findLoading={this.props.findLoading}
            currentUser={this.props.currentUser}
            record={
              this.isEditing() || this.isProfile() ? this.props.record : {}
            }
            isEditing={this.isEditing()}
            isProfile={this.isProfile()}
            onSubmit={this.doSubmit}
            onCancel={() => this.props.router.push("/admin/products")}
          />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(store) {
  return {
    findLoading: store.products.form.findLoading,
    saveLoading: store.products.form.saveLoading,
    record: store.products.form.record,
    currentUser: store.auth.currentUser,
  };
}

export async function getServerSideProps(context) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {  }, // will be passed to the page component as props
  };
}

export default connect(mapStateToProps)(withRouter(Index));
