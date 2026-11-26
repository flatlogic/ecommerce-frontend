import LegacyIcon from "components/compat/LegacyIcon";
import { Badge, Collapse } from "components/compat/bootstrap";
import Link from "components/compat/Link";
import classnames from "classnames";
import { useState, type ReactNode } from "react";

import s from "./LinksGroup.module.scss";

interface SidebarLink {
  header: string;
  link: string;
  index?: string;
  childrenLinks?: SidebarLink[];
}

interface LinksGroupProps extends SidebarLink {
  activeItem?: string | null;
  badge?: boolean;
  className?: string;
  deep?: number;
  exact?: boolean;
  iconName?: ReactNode;
  iconType?: "text" | "node";
  isHeader?: boolean;
  label?: string;
  labelColor?: string;
  onActiveSidebarItemChange: (link: string) => void;
  target?: string;
}

export default function LinksGroup({
  activeItem = "",
  badge = false,
  childrenLinks,
  className = "",
  deep = 0,
  header,
  iconName,
  iconType,
  index = "",
  isHeader = false,
  label = "",
  labelColor = "warning",
  link,
  onActiveSidebarItemChange,
}: LinksGroupProps) {
  const [headerLinkWasClicked, setHeaderLinkWasClicked] = useState(true);
  const isOpen = Boolean(activeItem?.includes(index) && headerLinkWasClicked);

  const togglePanelCollapse = () => {
    onActiveSidebarItemChange(link);
    setHeaderLinkWasClicked(
      (wasClicked) =>
        !wasClicked ||
        Boolean((activeItem || link) && !activeItem?.includes(index)),
    );
  };

  const icon =
    iconType === "text" ? (
      <span className={classnames("icon", s.icon)}>
        <LegacyIcon className={`la ${String(iconName ?? "")}`} />
      </span>
    ) : iconName ? (
      <span className={s.iconWrapper}>{iconName}</span>
    ) : null;

  if (!childrenLinks) {
    return (
      <li
        className={
          isHeader
            ? classnames("link-wrapper", s.headerLink, className)
            : undefined
        }
      >
        <Link
          href={link}
          onClick={(event) => {
            if (link.includes("menu")) event.preventDefault();
          }}
        >
          {isHeader && icon}
          {header}{" "}
          {label && (
            <sup
              className={`${s.headerLabel} ${isHeader ? s.headerUpdate : ""} text-${labelColor}`}
            >
              {label}
            </sup>
          )}
          {badge && (
            <Badge className={s.badge} pill>
              9
            </Badge>
          )}
        </Link>
      </li>
    );
  }

  return (
    <li
      className={classnames(
        "link-wrapper",
        { [s.headerLink ?? ""]: isHeader },
        className,
      )}
    >
      <a
        className={classnames(
          { [s.headerLinkActive ?? ""]: false },
          { [s.collapsed ?? ""]: isOpen },
          "d-flex",
        )}
        style={{ paddingLeft: `${deep === 0 ? 24 : 26 + 10 * (deep - 1)}px` }}
        onClick={togglePanelCollapse}
      >
        {icon}
        {header}{" "}
        {label && (
          <sup
            className={`${s.headerLabel} ${s.headerNode} ml-1 text-${labelColor}`}
          >
            {label}
          </sup>
        )}
        <LegacyIcon className={["la la-angle-left", s.caret].join(" ")} />
      </a>
      <Collapse className={s.panel} isOpen={isOpen}>
        <ul>
          {childrenLinks.map((child) => (
            <LinksGroup
              {...child}
              activeItem={activeItem}
              deep={deep + 1}
              key={`${child.link}-${child.header}`}
              onActiveSidebarItemChange={onActiveSidebarItemChange}
            />
          ))}
        </ul>
      </Collapse>
    </li>
  );
}
