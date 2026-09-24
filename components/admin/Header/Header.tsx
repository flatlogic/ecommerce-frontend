import LegacyIcon from "components/compat/LegacyIcon";
import React from "react";
import { connect } from "react-redux";
import { useRouter, type CompatRouter } from "components/compat/router";
import type { Dispatch, UnknownAction } from "redux";
import { NavbarTypes } from "../../../redux/reducers/layout";
import {
  Navbar,
  Nav,
  Dropdown,
  NavItem,
  NavLink,
  NavbarText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
  InputGroupAddon,
  InputGroup,
  Input,
  Form,
  FormGroup,
} from "components/compat/bootstrap";
import chroma from "chroma-js";
import cx from "classnames";
import { logoutUser } from "@/redux/actions/auth";
import {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  changeActiveSidebarItem,
} from "@/redux/actions/navigation";

import s from "./Header.module.scss";
import { store, type RootState } from "@/redux/store";
import type { User } from "types/domain";

interface HeaderProps {
  currentUser: User | null;
  dispatch: Dispatch<UnknownAction>;
  navbarColor: string;
  navbarType: string;
  openUsersList?: boolean;
  router: CompatRouter;
  sidebarOpened: boolean;
  sidebarStatic: boolean;
}

interface HeaderState {
  focus: boolean;
  hideMessage: boolean;
  menuOpen: boolean;
  run: boolean;
  showNewMessage: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.switchSidebar = this.switchSidebar.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.doLogout = this.doLogout.bind(this);

    this.state = {
      menuOpen: false,
      focus: false,
      showNewMessage: false,
      hideMessage: true,
      run: true,
    };
  }

  toggleFocus = () => {
    this.setState({ focus: !this.state.focus });
  };

  doLogout() {
    store.dispatch(logoutUser());
    this.props.router.push("/login");
  }

  // collapse/uncolappse
  switchSidebar() {
    if (this.props.sidebarOpened) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      const paths = this.props.router.pathname.split("/");
      paths.pop();
      this.props.dispatch(openSidebar());
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }

  // static/non-static
  toggleSidebar() {
    this.props.dispatch(toggleSidebar(!this.props.sidebarStatic));
    if (this.props.sidebarStatic) {
      if (typeof window !== "undefined") {
        localStorage.setItem("staticSidebar", "false");
      }
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      if (typeof window !== "undefined") {
        localStorage.setItem("staticSidebar", "true");
      }
      const paths = this.props.router.pathname.split("/");
      paths.pop();
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  }
  override render() {
    const { focus } = this.state;
    const { navbarType, navbarColor, openUsersList } = this.props;

    const user = this.props.currentUser;
    const avatar = user?.avatar.at(0)?.publicUrl;
    const firstUserLetter =
      user && (user.firstName || user.email).charAt(0).toUpperCase();

    return (
      <Navbar
        className={`${s.root} d-print-none ${
          navbarType === NavbarTypes.FLOATING ? s.navbarFloatingType : ""
        }`}
        style={{
          backgroundColor: navbarColor,
          zIndex: !openUsersList ? 100 : 0,
        }}
      >
        <Nav>
          <NavItem>
            <NavLink
              className="d-md-down-none ml-5"
              id="toggleSidebar"
              onClick={this.toggleSidebar}
            >
              <LegacyIcon
                className={`la la-bars ${
                  chroma(navbarColor).luminance() < 0.4 ? "text-white" : ""
                }`}
              />
            </NavLink>
            <UncontrolledTooltip placement="bottom" target="toggleSidebar">
              Turn on/off
              <br />
              sidebar
              <br />
              collapsing
            </UncontrolledTooltip>
            <NavLink className="fs-lg d-lg-none" onClick={this.switchSidebar}>
              <span className={`rounded rounded-lg d-md-none d-sm-down-block`}>
                <LegacyIcon
                  className="la la-bars"
                  style={{
                    fontSize: 30,
                    color:
                      navbarColor === "#ffffff"
                        ? "#ffffff"
                        : chroma(navbarColor).luminance() < 0.4
                          ? "#ffffff"
                          : "",
                  }}
                />
              </span>
              <LegacyIcon
                className={`la la-bars ml-3 d-sm-down-none ${
                  chroma(navbarColor).luminance() < 0.4 ? "text-white" : ""
                }`}
              />
            </NavLink>
          </NavItem>
        </Nav>

        <Form className={`d-sm-down-none ml-5 ${s.headerSearchInput}`} inline>
          <FormGroup>
            <InputGroup
              onFocus={this.toggleFocus}
              onBlur={this.toggleFocus}
              className={cx("input-group-no-border", { focus: !!focus })}
            >
              <InputGroupAddon addonType="prepend">
                <LegacyIcon className="la la-search" />
              </InputGroupAddon>
              <Input
                id="search-input"
                placeholder="Search input"
                className={cx({ focus: !!focus })}
              />
            </InputGroup>
          </FormGroup>
        </Form>

        <NavLink
          className={`${s.navbarBrand} d-md-none ${
            chroma(navbarColor).luminance() < 0.4 ? "text-white" : ""
          }`}
        >
          <LegacyIcon className="la la-circle text-primary mr-n-sm" />
          <LegacyIcon className="la la-circle text-danger" />
          &nbsp; Flatlogic &nbsp;
          <LegacyIcon className="la la-circle text-danger mr-n-sm" />
          <LegacyIcon className="la la-circle text-primary" />
        </NavLink>

        <Nav className="ml-auto">
          <NavbarText>
            <span
              className={`${s.avatar} rounded-circle thumb-sm float-left mr-2`}
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt="..."
                  title={user && (user.firstName || user.email)}
                />
              ) : (
                <span title={user ? user.firstName || user.email : undefined}>
                  {firstUserLetter}
                </span>
              )}
            </span>
            <span
              className={`d-sm-down-none ${
                chroma(navbarColor).luminance() < 0.4 ? "text-white" : ""
              }`}
            >
              {user && (user.firstName || user.email)}
            </span>
          </NavbarText>
          <Dropdown
            nav
            isOpen={this.state.menuOpen}
            toggle={this.toggleMenu}
            className="tutorial-dropdown pr-4"
          >
            <DropdownToggle nav>
              <LegacyIcon
                className={`la la-cog ${
                  chroma(navbarColor).luminance() < 0.4 ? "text-white" : ""
                }`}
              />
            </DropdownToggle>
            <DropdownMenu right className={`super-colors`}>
              <DropdownItem href="/#/app/profile">
                <LegacyIcon className="la la-user" /> My Account
              </DropdownItem>
              <DropdownItem onClick={this.doLogout}>
                <LegacyIcon className="la la-sign-out" /> Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(store: RootState) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    currentUser: store.auth.currentUser,
    navbarType: store.layout.navbarType,
    navbarColor: store.layout.navbarColor,
  };
}

const ConnectedHeader = connect(mapStateToProps)(Header);

export default function HeaderWithRouter() {
  return <ConnectedHeader router={useRouter()} />;
}
