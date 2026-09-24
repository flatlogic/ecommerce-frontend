import React, { type ReactNode } from "react";
import { connect } from "react-redux";
import { useRouter, type CompatRouter } from "components/compat/router";
import type { Dispatch, UnknownAction } from "redux";
import Loader from "components/admin/Loader";
import { TransitionGroup, CSSTransition } from "components/compat/Transition";
import Hammer from "components/compat/Swipe";
import Header from "../Header";
import ErrorPage from "legacy-pages/404";
import HeaderComp from "components/e-commerce/Header";
import FooterComp from "components/e-commerce/Footer";
import Sidebar from "../Sidebar";
import {
  openSidebar,
  closeSidebar,
  toggleSidebar,
} from "@/redux/actions/navigation";
import s from "./Layout.module.scss";
import BreadcrumbHistory from "../BreadcrumbHistory";

import { SidebarTypes } from "@/redux/reducers/layout";
import type { RootState } from "@/redux/store";
import type { User } from "types/domain";

interface LayoutProps {
  children?: ReactNode;
  currentUser: User | null;
  dashboardTheme: string;
  dispatch: Dispatch<UnknownAction>;
  loadingInit: boolean;
  router: CompatRouter;
  sidebarOpened: boolean;
  sidebarStatic: boolean;
  sidebarType: string;
}

class Layout extends React.Component<LayoutProps> {
  override componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  override componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    if (window.innerWidth <= 768 && this.props.sidebarStatic) {
      this.props.dispatch(toggleSidebar(false));
    }
  };

  handleSwipe = (e: { direction: number }) => {
    if ("ontouchstart" in window) {
      if (e.direction === 4) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }
    }
  };

  override render() {
    if (
      !this.props.currentUser &&
      !this.props.router.pathname.includes("documentation")
    ) {
      if (this.props.loadingInit) return <Loader />;
      return (
        <>
          <HeaderComp />
          <ErrorPage />
          <FooterComp />
        </>
      );
    }

    return (
      <div
        className={[
          s.root,
          this.props.sidebarStatic ? `${s.sidebarStatic}` : "",
          !this.props.sidebarOpened ? s.sidebarClose : "",
          "sing-dashboard",
          `dashboard-${
            this.props.sidebarType === SidebarTypes.TRANSPARENT
              ? "light"
              : this.props.dashboardTheme
          }`,
        ].join(" ")}
      >
        <Sidebar />
        <div className={s.wrap}>
          <Header />
          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <BreadcrumbHistory url={this.props.router.pathname} />
              <TransitionGroup>
                <CSSTransition classNames="fade" timeout={200}>
                  {this.props.children}
                </CSSTransition>
              </TransitionGroup>
              <footer className={s.contentFooter}>
                Flatlogic Ecommerce - Made by{" "}
                <a
                  href="https://flatlogic.com"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  Flatlogic
                </a>
              </footer>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store: RootState) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    dashboardTheme: store.layout.dashboardTheme,
    sidebarType: store.layout.sidebarType,
    currentUser: store.auth.currentUser,
    loadingInit: store.auth.loadingInit,
  };
}

const ConnectedLayout = connect(mapStateToProps)(Layout);

export default function LayoutWithRouter({
  children,
}: {
  children?: ReactNode;
}) {
  return <ConnectedLayout router={useRouter()}>{children}</ConnectedLayout>;
}
