import { withRouter, type CompatRouter } from "components/compat/router";
import Link from "components/compat/Link";
import React, { Children, type ComponentProps, type ReactElement } from "react";

interface ActiveLinkProps extends Omit<
  ComponentProps<typeof Link>,
  "children"
> {
  activeClassName?: string;
  children: ReactElement<{ className?: string }>;
}

const ActiveLink = ({
  router,
  children,
  activeClassName,
  ...props
}: ActiveLinkProps & { router: CompatRouter }) => {
  const child = Children.only(children) as ReactElement<{ className?: string }>;

  let className = child.props.className || "";
  if (router.pathname === props.href && activeClassName) {
    className = `${className} ${activeClassName}`.trim();
  }

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter<ActiveLinkProps>(ActiveLink);
