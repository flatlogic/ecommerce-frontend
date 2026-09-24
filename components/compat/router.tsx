"use client";

import NextLink, { type LinkProps } from "next/link";
import {
  useParams,
  usePathname,
  useRouter as useNavigationRouter,
  useSearchParams,
} from "next/navigation";
import type { ComponentType, ReactNode } from "react";

type Destination = LinkProps["href"];

export interface CompatRouter {
  asPath: string;
  pathname: string;
  query: Record<string, string | string[] | undefined>;
  push: (destination: Destination) => void;
  replace: (destination: Destination) => void;
  back: () => void;
}

const destinationToString = (destination: Destination): string => {
  if (typeof destination === "string") return destination;
  const pathname = destination.pathname?.toString() ?? "";
  const query = new URLSearchParams();
  Object.entries(destination.query ?? {}).forEach(([key, value]) => {
    if (value !== undefined) query.set(key, String(value));
  });
  const suffix = query.toString();
  return suffix ? `${pathname}?${suffix}` : pathname;
};

export function useRouter(): CompatRouter {
  const navigation = useNavigationRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const query: Record<string, string | string[] | undefined> = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });
  Object.entries(params).forEach(([key, value]) => {
    query[key] = value;
  });

  return {
    asPath: `${pathname}${searchParams.size ? `?${searchParams.toString()}` : ""}`,
    pathname,
    query,
    push: (destination) => navigation.push(destinationToString(destination)),
    replace: (destination) =>
      navigation.replace(destinationToString(destination)),
    back: navigation.back,
  };
}

export function withRouter<Props extends object>(
  Component: ComponentType<Props & { router: CompatRouter }>,
): ComponentType<Props> {
  function WithRouter(props: Props) {
    return <Component {...props} router={useRouter()} />;
  }
  WithRouter.displayName = `withRouter(${Component.displayName ?? Component.name ?? "Component"})`;
  return WithRouter;
}

type CompatLinkProps = Omit<React.ComponentProps<typeof NextLink>, "href"> & {
  href?: Destination;
  to?: Destination;
  children?: ReactNode;
};

export function Link({ href, to, ...props }: CompatLinkProps) {
  return <NextLink href={href ?? to ?? "#"} {...props} />;
}

export const push = (destination: Destination) => () => {
  if (typeof window !== "undefined")
    window.location.assign(destinationToString(destination));
};

const Router = { push: (destination: Destination) => push(destination)() };
export default Router;
