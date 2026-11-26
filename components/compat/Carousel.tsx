"use client";

import {
  Children,
  useEffect,
  isValidElement,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./Carousel.module.scss";

interface CarouselProps {
  children?: ReactNode;
  interval?: number;
  prevLabel?: string;
  nextLabel?: string;
}

interface ItemProps {
  children?: ReactNode;
  interval?: number;
}

function CarouselItem({ children }: ItemProps) {
  return <>{children}</>;
}

function CarouselRoot({
  children,
  interval = 5000,
  prevLabel = "Previous",
  nextLabel = "Next",
}: CarouselProps) {
  const slides = useMemo(() => Children.toArray(children), [children]);
  const [selected, setSelected] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentSlide = slides[selected];
  const currentInterval = isValidElement<ItemProps>(currentSlide)
    ? (currentSlide.props.interval ?? interval)
    : interval;

  useEffect(() => {
    if (slides.length < 2 || isPaused) return;

    const timer = window.setTimeout(() => {
      setSelected((index) => (index + 1) % slides.length);
    }, currentInterval);

    return () => window.clearTimeout(timer);
  }, [currentInterval, isPaused, selected, slides.length]);

  if (slides.length === 0) return null;

  const selectSlide = (index: number) => setSelected(index);

  return (
    <div
      className="carousel slide position-relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`carousel-indicators ${styles.indicators}`}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target=""
            className={index === selected ? "active" : undefined}
            aria-label={`Slide ${index + 1}`}
            aria-current={index === selected ? "true" : undefined}
            onClick={() => selectSlide(index)}
          />
        ))}
      </div>

      <div className={`carousel-inner ${styles.viewport}`} aria-live="polite">
        <div
          className={styles.track}
          style={{ transform: `translateX(-${selected * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={styles.slide}
              aria-hidden={index !== selected}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            className="carousel-control-prev"
            aria-label={prevLabel}
            onClick={() =>
              selectSlide((selected - 1 + slides.length) % slides.length)
            }
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="carousel-control-next"
            aria-label={nextLabel}
            onClick={() => selectSlide((selected + 1) % slides.length)}
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}

const Carousel = Object.assign(CarouselRoot, { Item: CarouselItem });
export default Carousel;

export interface LegacyCarouselProviderProps {
  children?: ReactNode;
  visibleSlides?: number;
  style?: CSSProperties;
}
