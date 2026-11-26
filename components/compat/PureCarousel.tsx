"use client";

import useEmblaCarousel from "embla-carousel-react";
import {
  createContext,
  useContext,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";

interface CarouselContextValue {
  viewport: ReturnType<typeof useEmblaCarousel>[0];
  scrollNext: () => void;
  scrollPrev: () => void;
  visibleSlides: number;
  slideAspectRatio: string | undefined;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

interface CarouselProviderProps {
  children?: ReactNode;
  className?: string | undefined;
  visibleSlides?: number;
  infinite?: boolean;
  dragEnabled?: boolean;
  style?: CSSProperties;
  totalSlides?: number;
  naturalSlideHeight?: number;
  naturalSlideWidth?: number;
}

export function CarouselProvider({
  children,
  className,
  visibleSlides = 1,
  infinite = false,
  dragEnabled = true,
  naturalSlideHeight,
  naturalSlideWidth,
  style,
}: CarouselProviderProps) {
  const [emblaRef, api] = useEmblaCarousel({
    align: "start",
    loop: infinite,
    watchDrag: dragEnabled,
  });
  const slideAspectRatio =
    naturalSlideHeight && naturalSlideWidth
      ? `${naturalSlideWidth} / ${naturalSlideHeight}`
      : undefined;

  return (
    <CarouselContext.Provider
      value={{
        viewport: emblaRef,
        scrollNext: () => api?.scrollNext(),
        scrollPrev: () => api?.scrollPrev(),
        visibleSlides,
        slideAspectRatio,
      }}
    >
      <div className={className} style={style}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function Slider({ children }: { children?: ReactNode }) {
  const context = useContext(CarouselContext);
  if (!context) return null;
  // Embla exposes a callback ref, not a mutable ref read during render.
  return (
    // eslint-disable-next-line react-hooks/refs
    <div ref={context.viewport} style={{ overflow: "hidden" }}>
      <div style={{ display: "flex" }}>{children}</div>
    </div>
  );
}

export function Slide({ children }: { children?: ReactNode; index?: number }) {
  const context = useContext(CarouselContext);
  return (
    <div
      style={{
        aspectRatio: context?.slideAspectRatio,
        flex: `0 0 ${100 / (context?.visibleSlides ?? 1)}%`,
        minHeight: 0,
        minWidth: 0,
      }}
    >
      {children}
    </div>
  );
}

export function ButtonBack(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useContext(CarouselContext);
  return (
    <button
      type="button"
      aria-label="previous"
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        context?.scrollPrev();
      }}
    />
  );
}

export function ButtonNext(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useContext(CarouselContext);
  return (
    <button
      type="button"
      aria-label="next"
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        context?.scrollNext();
      }}
    />
  );
}
