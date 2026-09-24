import React from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  DropdownItem,
  Container,
  Button,
  UncontrolledDropdown,
} from "components/compat/bootstrap";
import AnimateHeight from "react-animate-height";
import ActiveLink from "components/admin/ActiveLink/ActiveLink";
import Link from "components/compat/Link";
import s from "./Header.module.scss";
import menuImg from "public/images/e-commerce/header/menu.svg";
import { useRouter, type CompatRouter } from "components/compat/router";
import { connect } from "react-redux";
import {
  changeActiveSidebarItem,
  closeSidebar,
  openSidebar,
} from "@/redux/actions/navigation";
import axios from "axios";
import type { RootState } from "@/redux/store";
import type { User } from "types/domain";
import type { Dispatch, UnknownAction } from "redux";

interface HeaderProps {
  currentUser: User | null;
  dispatch: Dispatch<UnknownAction>;
  router: CompatRouter;
  sidebarOpened: boolean;
}

interface HeaderState {
  count: number;
  heightOne: number | "auto";
  heightTwo: number | "auto";
  heightThree: number | "auto";
  heightFour: number | "auto";
  innerWidth: number;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.switchSidebar = this.switchSidebar.bind(this);

    this.state = {
      heightOne: 0,
      heightTwo: 0,
      heightThree: 0,
      heightFour: 0,
      // Keep the server and the first client render identical; sync after mount.
      innerWidth: 1024,
      count: 0,
    };
  }

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

  override componentDidMount() {
    this.setState({ innerWidth: window.innerWidth });
    window.addEventListener("resize", this.handleResize);
    if (this.props.currentUser) {
      axios
        .get(`/orders?user=${this.props.currentUser.id}&status=in+cart`)
        .then((res) => {
          this.setState({
            count: res.data.count,
          });
        })
        .catch(() => undefined);
      return;
    } else if (localStorage.getItem("products") && !this.props.currentUser) {
      this.setState({
        count: JSON.parse(localStorage.getItem("products") ?? "[]").length,
      });
    }
  }

  override componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => this.setState({ innerWidth: window.innerWidth });

  toggleHeightOne = () => {
    this.setState({
      heightOne: "auto",
      heightTwo: 0,
      heightThree: 0,
      heightFour: 0,
    });
  };

  toggleHeightTwo = () => {
    this.setState({
      heightOne: 0,
      heightTwo: "auto",
      heightThree: 0,
      heightFour: 0,
    });
  };

  toggleHeightThree = () => {
    this.setState({
      heightOne: 0,
      heightTwo: 0,
      heightThree: "auto",
      heightFour: 0,
    });
  };

  toggleHeightFour = () => {
    this.setState({
      heightOne: 0,
      heightTwo: 0,
      heightThree: 0,
      heightFour: "auto",
    });
  };

  override render() {
    const { heightTwo, heightThree, heightFour } = this.state;
    return (
      <Navbar className={s.header}>
        <Container>
          {this.state.innerWidth <= 768 && (
            <Button
              className={"bg-transparent border-0 p-0"}
              onClick={() => this.switchSidebar()}
            >
              <img src={menuImg} alt={"menu"} />
            </Button>
          )}

          <NavbarBrand>
            <Link href={"/"}>
              <span className={s.logoStyle}>Flatlogic</span>
            </Link>
          </NavbarBrand>

          {this.state.innerWidth >= 768 && (
            <nav className={s.nav}>
              <ul className={s.nav__menu}>
                <li className={s.nav__menuItem} style={{ width: 90 }}>
                  <ActiveLink
                    className={s.navLink}
                    onMouseOver={this.toggleHeightOne}
                    href={"/"}
                  >
                    <span className={s.dropdownItem}>Home</span>
                  </ActiveLink>
                </li>
                <li className={s.nav__menuItem}>
                  <span
                    className={s.dropdownItem}
                    onMouseOver={this.toggleHeightTwo}
                  >
                    Pages <div className={s.dropdownItemImg} />
                  </span>
                  <AnimateHeight
                    duration={500}
                    className={`${s.nav__submenu}`}
                    height={heightTwo}
                  >
                    <UncontrolledDropdown>
                      <DropdownItem className={s.dropdownMenuItem}>
                        <ActiveLink href={"/about"}>
                          <a>About Us</a>
                        </ActiveLink>
                      </DropdownItem>
                      <DropdownItem className={s.dropdownMenuItem}>
                        <ActiveLink href={"/about-team"}>
                          <a>About Team</a>
                        </ActiveLink>
                      </DropdownItem>
                      <DropdownItem className={s.dropdownMenuItem}>
                        <ActiveLink href={"/contact"}>
                          <a>Contact Us</a>
                        </ActiveLink>
                      </DropdownItem>
                      <DropdownItem className={s.dropdownMenuItem}>
                        <ActiveLink href={"/faq"}>
                          <a>FAQ</a>
                        </ActiveLink>
                      </DropdownItem>
                      <DropdownItem className={s.dropdownMenuItem}>
                        <ActiveLink href={"/error"}>
                          <a>404</a>
                        </ActiveLink>
                      </DropdownItem>
                      <DropdownItem className={s.dropdownMenuItem}>
                        <ActiveLink href={"/wishlist"}>
                          <a>Wishlist</a>
                        </ActiveLink>
                      </DropdownItem>
                      <DropdownItem className={s.dropdownMenuItem}>
                        <ActiveLink href={"/login"}>
                          <a>Login</a>
                        </ActiveLink>
                      </DropdownItem>
                    </UncontrolledDropdown>
                  </AnimateHeight>
                </li>
                <li className={s.nav__menuItem}>
                  <span
                    className={s.dropdownItem}
                    onMouseOver={this.toggleHeightThree}
                  >
                    Shop <div className={s.dropdownItemImg} />
                  </span>
                  <AnimateHeight
                    duration={500}
                    className={`${s.nav__submenu}`}
                    height={heightThree}
                  >
                    <UncontrolledDropdown>
                      <DropdownItem className={s.dropdownMenuItem}>
                        <ActiveLink href={"/shop"}>
                          <a>Shop</a>
                        </ActiveLink>
                      </DropdownItem>
                      <DropdownItem className={s.dropdownMenuItem}>
                        <ActiveLink href={"/categories"}>
                          <a>Categories</a>
                        </ActiveLink>
                      </DropdownItem>
                      <DropdownItem className={s.dropdownMenuItem}>
                        <ActiveLink href={"/account"}>
                          <a>Account</a>
                        </ActiveLink>
                      </DropdownItem>
                    </UncontrolledDropdown>
                  </AnimateHeight>
                </li>
                <li className={s.nav__menuItem}>
                  <span
                    className={s.dropdownItem}
                    onMouseOver={this.toggleHeightFour}
                  >
                    Blog <div className={s.dropdownItemImg} />
                  </span>
                  <AnimateHeight
                    duration={500}
                    className={`${s.nav__submenu}`}
                    height={heightFour}
                  >
                    <UncontrolledDropdown>
                      <DropdownItem className={s.dropdownMenuItem}>
                        <ActiveLink href={"/blog"}>
                          <a>Blog</a>
                        </ActiveLink>
                      </DropdownItem>
                      <DropdownItem className={s.dropdownMenuItem}>
                        <ActiveLink href={"/blog/article"}>
                          <a>Blog Article</a>
                        </ActiveLink>
                      </DropdownItem>
                    </UncontrolledDropdown>
                  </AnimateHeight>
                </li>
              </ul>
            </nav>
          )}

          <Nav>
            <NavItem className={"d-flex align-items-center"}>
              {this.state.innerWidth >= 768 && (
                <>
                  <Link href={"/search"}>
                    <a>
                      <Button className={`bg-transparent border-0 p-3`}>
                        {this.props.router.pathname.includes("search") ? (
                          <div className={s.headerSearchIconActive} />
                        ) : (
                          <div className={s.headerSearchIcon} />
                        )}
                      </Button>
                    </a>
                  </Link>
                  <Link href={"/login"}>
                    <a>
                      <Button className={`bg-transparent border-0 p-3`}>
                        {this.props.router.pathname.includes("account") ? (
                          <div className={s.headerLoginIconActive} />
                        ) : (
                          <div className={s.headerLoginIcon} />
                        )}
                      </Button>
                    </a>
                  </Link>
                </>
              )}
              <Link href={"/cart"}>
                <a>
                  {this.state.count ? (
                    <p
                      style={{ fontSize: 9, marginTop: 10, marginLeft: 30 }}
                      className={`mb-0 text-dark fw-bold`}
                    >
                      {this.state.count}
                    </p>
                  ) : null}
                  <Button
                    className={`${s.headerSvgIcon} bg-transparent border-0 p-3`}
                    style={{ marginTop: this.state.count ? -22 : 0 }}
                  >
                    {this.props.router.pathname.includes("cart") ? (
                      <div className={s.headerCartIconActive} />
                    ) : (
                      <div className={s.headerCartIcon} />
                    )}
                  </Button>
                </a>
              </Link>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

function mapStateToProps(store: RootState) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    currentUser: store.auth.currentUser,
  };
}

const ConnectedHeader = connect(mapStateToProps)(Header);

export default function HeaderWithRouter() {
  return <ConnectedHeader router={useRouter()} />;
}
