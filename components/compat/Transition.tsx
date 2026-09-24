"use client";

import type { ReactNode } from "react";

export function TransitionGroup({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}
export function CSSTransition({
  children,
}: {
  children?: ReactNode;
  classNames?: string;
  timeout?: number;
}) {
  return <div className="fade show">{children}</div>;
}
