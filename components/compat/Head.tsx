"use client";

import { Children, isValidElement, useEffect, type ReactNode } from "react";

export default function Head({ children }: { children?: ReactNode }) {
  useEffect(() => {
    Children.forEach(children, (child) => {
      if (
        isValidElement<{ children?: ReactNode }>(child) &&
        child.type === "title"
      ) {
        const title = Children.toArray(child.props.children).join("");
        if (title) document.title = title;
      }
    });
  }, [children]);
  return null;
}
