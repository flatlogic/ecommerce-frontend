"use client";

import InnerImageZoom from "react-inner-image-zoom";

interface LegacyImageProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt?: string;
}
interface ImageMagnifyProps {
  smallImage: LegacyImageProps & { isFluidWidth?: boolean };
  largeImage: LegacyImageProps & { width?: number; height?: number };
  enlargedImageContainerDimensions?: { width?: string; height?: string };
  className?: string | undefined;
  enlargedImagePosition?: string;
}

export default function ImageMagnify({
  smallImage,
  largeImage,
  className,
}: ImageMagnifyProps) {
  return (
    <InnerImageZoom
      className={className}
      src={smallImage.src}
      zoomSrc={largeImage.src}
      imgAttributes={{
        alt: smallImage.alt ?? "",
        sizes: smallImage.sizes,
        srcSet: smallImage.srcSet,
      }}
      hideHint
      zoomPreload
      zoomType="hover"
    />
  );
}
