import type { ImgHTMLAttributes } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ImageMagnify from "components/compat/ImageMagnify";
import { ZoomableProductPhoto } from "components/e-commerce/ZoomableProductPhoto";
import { Modal } from "components/compat/bootstrap";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from "components/compat/PureCarousel";

const { innerZoomSpy, scrollNextSpy, scrollPrevSpy } = vi.hoisted(() => ({
  innerZoomSpy: vi.fn(),
  scrollNextSpy: vi.fn(),
  scrollPrevSpy: vi.fn(),
}));

vi.mock("react-inner-image-zoom", () => ({
  default: (props: {
    src: string;
    imgAttributes: ImgHTMLAttributes<HTMLImageElement>;
  }) => {
    innerZoomSpy(props);
    return (
      <div data-testid="image-zoom">
        <img {...props.imgAttributes} src={props.src} alt={props.imgAttributes.alt} />
      </div>
    );
  },
}));

vi.mock("embla-carousel-react", () => ({
  default: () => [
    vi.fn(),
    { scrollNext: scrollNextSpy, scrollPrev: scrollPrevSpy },
  ],
}));

describe("product compatibility components", () => {
  beforeEach(() => {
    innerZoomSpy.mockClear();
  });

  it("keeps the legacy hover-to-zoom image behaviour", () => {
    render(
      <ImageMagnify
        smallImage={{
          alt: "Product image",
          isFluidWidth: true,
          src: "/product.png",
        }}
        largeImage={{
          height: 1200,
          src: "/product-large.png",
          width: 1200,
        }}
      />,
    );

    expect(screen.getByTestId("image-zoom")).toBeInTheDocument();
    expect(innerZoomSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        hideHint: true,
        imgAttributes: expect.objectContaining({ alt: "Product image" }),
        src: "/product.png",
        zoomPreload: true,
        zoomSrc: "/product-large.png",
        zoomType: "hover",
      }),
    );
  });

  it("removes detail zoom when the product photo fails and restores it for a working photo", () => {
    const { container, rerender } = render(
      <ZoomableProductPhoto alt="Chair" src="/uploads/chair.jpg" />,
    );
    const detail = within(container);
    const original = detail.getByRole("img", { name: "Chair" });
    expect(detail.getByTestId("image-zoom")).toContainElement(original);
    fireEvent.error(original);

    expect(detail.queryByTestId("image-zoom")).not.toBeInTheDocument();
    expect(detail.getByRole("img", { name: "Image unavailable for Chair" })).toHaveAttribute(
      "src",
      "/images/e-commerce/product-image-unavailable.png",
    );

    rerender(<ZoomableProductPhoto alt="Lamp" src="/uploads/lamp.jpg" />);
    const working = detail.getByRole("img", { name: "Lamp" });
    expect(working).toHaveAttribute("src", "/uploads/lamp.jpg");
    expect(detail.getByTestId("image-zoom")).toContainElement(working);
  });

  it("preserves the legacy slide width and natural aspect ratio", () => {
    render(
      <CarouselProvider
        naturalSlideHeight={400}
        naturalSlideWidth={300}
        visibleSlides={4}
      >
        <ButtonBack />
        <Slider>
          <Slide>
            <div data-testid="slide-content" />
          </Slide>
        </Slider>
        <ButtonNext />
      </CarouselProvider>,
    );

    expect(screen.getByTestId("slide-content").parentElement).toHaveStyle({
      aspectRatio: "300 / 400",
      flex: "0 0 25%",
      minHeight: 0,
      minWidth: 0,
    });
    expect(screen.getByRole("button", { name: "previous" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "next" })).toBeEnabled();
  });

  it("renders feedback modals at the document root and locks page scrolling", () => {
    const { rerender } = render(
      <div className="row">
        <Modal isOpen>
          <div>Feedback form</div>
        </Modal>
      </div>,
    );

    expect(screen.getByRole("dialog").parentElement).toBe(document.body);
    expect(document.body).toHaveClass("modal-open");
    expect(document.body.querySelector(".modal-backdrop.show")).not.toBeNull();

    rerender(
      <div className="row">
        <Modal isOpen={false}>
          <div>Feedback form</div>
        </Modal>
      </div>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body).not.toHaveClass("modal-open");
  });
});
