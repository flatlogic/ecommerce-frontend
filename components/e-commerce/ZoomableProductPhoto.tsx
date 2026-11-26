"use client";

import ImageMagnify from "components/compat/ImageMagnify";
import { useProductPhoto } from "./ProductPhoto";

interface Props {
  src?: string | undefined;
  alt: string;
  className?: string | undefined;
}

export function ZoomableProductPhoto({ src, alt, className }: Props) {
  const { unavailable, imageProps } = useProductPhoto(src, alt);

  if (unavailable) {
    return <img className={className} {...imageProps} />;
  }
  return (
    <ImageMagnify
      className={className}
      smallImage={{ ...imageProps, isFluidWidth: true }}
      largeImage={{ src: imageProps.src, width: 1200, height: 1200 }}
      enlargedImagePosition="over"
    />
  );
}
