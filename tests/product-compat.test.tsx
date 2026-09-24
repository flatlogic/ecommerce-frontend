import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ImageMagnify from "components/compat/ImageMagnify";
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
  default: (props: Record<string, unknown>) => {
    innerZoomSpy(props);
    return <div data-testid="image-zoom" />;
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
