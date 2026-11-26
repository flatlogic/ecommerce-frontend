"use client";

import { useDrag } from "@use-gesture/react";
import type { ReactNode } from "react";

export default function Swipe({
  children,
  onSwipe,
}: {
  children: ReactNode;
  onSwipe?: (event: { direction: number }) => void;
}) {
  const bind = useDrag(
    ({ last, swipe: [x] }) => {
      if (last && x !== 0) onSwipe?.({ direction: x > 0 ? 4 : 2 });
    },
    { filterTaps: true },
  );
  return <div {...bind()}>{children}</div>;
}
