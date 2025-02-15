import React, { Component } from "react";
import ProductsForm from "./ProductsForm";
import actions from "redux/actions/products/productsFormActions";
import { connect } from "react-redux";
import {withRouter} from "next/router";
import Head from 'next/head';

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
        <Head>
          <title>Create new product</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          <meta name="description" content="Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development" />
          <meta name="keywords" content="flatlogic, react templates" />
          <meta name="author" content="Flatlogic LLC." />
          <meta charSet="utf-8" />


          <meta property="og:title" content="Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes"/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://flatlogic-ecommerce.herokuapp.com/"/>
          <meta property="og:image" content="https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg"/>
          <meta property="og:description" content="Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development"/>
          <meta name="twitter:card" content="summary_large_image" />

          <meta property="fb:app_id" content="712557339116053" />

          <meta property="og:site_name" content="Flatlogic"/>
          <meta name="twitter:site" content="@flatlogic" />
        </Head>
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

export default withRouter(connect(mapStateToProps)(Index));
