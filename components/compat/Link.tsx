"use client";

import NextLink from "next/link";
import {
  isValidElement,
  type AnchorHTMLAttributes,
  type ComponentProps,
  type ReactElement,
} from "react";

type Props = ComponentProps<typeof NextLink>;

/**
 * Keeps the original anchor-wrapped Link markup working while migrated screens
 * are moved to the React 19/Next.js Link API incrementally.
 */
export default function Link({ children, ...props }: Props) {
  const wrapsAnchor = isValidElement(children) && children.type === "a";

  if (wrapsAnchor) {
    const anchor = children as ReactElement<
      AnchorHTMLAttributes<HTMLAnchorElement>
    >;
    const { children: anchorChildren, ...anchorProps } = anchor.props;
    const mergedProps = { ...anchorProps, ...props } as Props;
    return <NextLink {...mergedProps}>{anchorChildren}</NextLink>;
  }

  return <NextLink {...props}>{children}</NextLink>;
}
