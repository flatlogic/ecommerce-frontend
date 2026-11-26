import React, { useState, type ReactNode } from "react";
import { Button } from "components/compat/bootstrap";
import Link from "components/compat/Link";

import s from "./HomePageWidget.module.scss";
import StoreImg from "public/images/e-commerce/admin/store_icon.png";
import MoreHorizontal from "public/images/e-commerce/admin/widgets/moreHorizontal";
import Brush from "public/images/e-commerce/admin/widgets/brush";
import Globe from "public/images/e-commerce/admin/widgets/globe";
import PriceTag from "public/images/e-commerce/admin/widgets/pricetag";
import AlertIcon from "public/images/e-commerce/admin/widgets/alert";

const tabItems = [
  {
    id: 1,
    tabTitle: "Add products",
    tabImage: StoreImg,
    icon: <PriceTag />,
    tabHeading: "Add your first products",
    tabTextContent:
      "Add physical items, digital downloads, services, or anything else you dream up.",
    tabButton: {
      color: "primary",
      className: ["fw-bold", "text-uppercase"],
      text: "Add products",
      link: "/admin/products",
    },
    tabFooter: {
      text: "Learn more about products",
      icon: <AlertIcon />,
    },
  },
  {
    id: 2,
    tabTitle: "Customize theme",
    tabHeading: "Customize theme",
    icon: <Brush />,
    content: "step 2 content",
  },
  {
    id: 3,
    tabTitle: "Add domain",
    tabHeading: "Add domain",
    icon: <Globe />,
    content: "step 3 content",
  },
];

const HomePageWidget = () => {
  const [active, setActive] = useState(1);

  return (
    <div className={s.root}>
      <div className={s.tabsWidgetTitle}>
        <h4>Get ready to sell online. Try these tips to get started.</h4>
        <MoreHorizontal />
      </div>
      <div className={s.widgetContent}>
        <div className={s.tabsSide}>
          {tabItems.map(({ id, icon, tabTitle }) => (
            <TabItemComponent
              key={tabTitle}
              icon={icon}
              tabTitle={tabTitle}
              onItemClicked={() => setActive(id)}
              isActive={active === id}
            />
          ))}
        </div>
        <div className={s.tabContent}>
          {tabItems.map(
            ({
              id,
              tabImage,
              tabHeading,
              tabTextContent,
              tabButton,
              tabFooter,
            }) => {
              return active === id ? (
                <div className={s.dynamicContentWrapper} key={id}>
                  <div className={s.widgetBasicContent}>
                    {tabHeading && (
                      <h3 className={s.tabHeading}>{tabHeading}</h3>
                    )}
                    {tabTextContent && (
                      <p className={s.tabParagraph}>{tabTextContent}</p>
                    )}
                    {tabButton && (
                      <Link href={tabButton.link}>
                        <Button
                          color={tabButton.color}
                          className={tabButton.className.join(" ")}
                        >
                          {tabButton.text}
                        </Button>
                      </Link>
                    )}
                    {tabFooter && (
                      <p className={s.tabFooter}>
                        {tabFooter.icon && tabFooter.icon} {tabFooter.text}
                      </p>
                    )}
                  </div>
                  {tabImage && (
                    <div className={s.tabImgWrapper}>
                      <img src={tabImage} alt={tabHeading} />
                    </div>
                  )}
                </div>
              ) : (
                ""
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};

interface TabItemProps {
  icon?: ReactNode;
  tabTitle?: string;
  onItemClicked?: () => void;
  isActive?: boolean;
}

const TabItemComponent = ({
  icon = null,
  tabTitle = "",
  onItemClicked = () => undefined,
  isActive = false,
}: TabItemProps) => {
  return (
    <div
      className={isActive ? s.tabItemActive : s.tabItem}
      onClick={onItemClicked}
    >
      {icon}
      <span>{tabTitle}</span>
    </div>
  );
};

export async function getServerSideProps(_context: unknown) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default HomePageWidget;
