import React, { type RefObject } from "react";
import { connect } from "react-redux";
import type { Dispatch, UnknownAction } from "redux";
import Link from "components/compat/Link";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup";
import {
  closeSidebar,
  changeActiveSidebarItem,
} from "@/redux/actions/navigation";
import type { RootState } from "@/redux/store";

interface SidebarProps {
  activeItem: string | null;
  dispatch: Dispatch<UnknownAction>;
  sidebarOpened: boolean;
  sidebarStatic: boolean;
}

class Sidebar extends React.Component<SidebarProps> {
  wrapperRef: RefObject<HTMLDivElement | null>;

  constructor(props: SidebarProps) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  handleClickOutside = (event: MouseEvent) => {
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target as Node) &&
      this.props.sidebarOpened
    ) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    }
  };

  override componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  override componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  override render() {
    return (
      <div
        ref={this.wrapperRef}
        className={`${
          !this.props.sidebarOpened && !this.props.sidebarStatic
            ? s.sidebarClose
            : ""
        } ${s.sidebarWrapper}`}
      >
        <nav className={s.root}>
          <header className={s.logo}>
            <span className={`${s.logoStyle} mx-1`}>
              Flatlogic<i>.</i>
            </span>
          </header>
          <ul className={s.nav}>
            <LinksGroup
              onActiveSidebarItemChange={(activeItem: string) =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Home"
              link="/"
              isHeader
            />
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Pages"
              link="/pages"
              index="pages"
              isHeader
              exact={false}
              childrenLinks={[
                {
                  header: "About Us",
                  link: "/about",
                },
                {
                  header: "About Team",
                  link: "/about-team",
                },
                {
                  header: "Contact Us",
                  link: "/contact",
                },
                {
                  header: "FAQ",
                  link: "/faq",
                },
                {
                  header: "404",
                  link: "/error",
                },
                {
                  header: "Wishlist",
                  link: "/wishlist",
                },
                {
                  header: "Login",
                  link: "/login",
                },
              ]}
            />
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Shop"
              link="/shop"
              index="shop"
              isHeader
              exact={false}
              childrenLinks={[
                {
                  header: "Shop",
                  link: "/shop",
                },
                {
                  header: "Categories",
                  link: "/categories",
                },
                {
                  header: "Account",
                  link: "/account",
                },
              ]}
            />
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Blog"
              link="/blog"
              index="blog"
              isHeader
              exact={false}
              childrenLinks={[
                {
                  header: "Blog",
                  link: "/blog",
                },
                {
                  header: "Article",
                  link: "/blog/article",
                },
              ]}
            />
          </ul>
          <div className={s.accountBtn}>
            <Link href={"/account  "}>My Account</Link>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(store: RootState) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    activeItem: store.navigation.activeItem,
  };
}

export default connect(mapStateToProps)(Sidebar);
