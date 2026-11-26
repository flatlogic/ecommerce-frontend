"use client";

import { useState, type ImgHTMLAttributes } from "react";

const unavailablePhoto = "/images/e-commerce/product-image-unavailable.png";

export function useProductPhoto(src: string | undefined, alt: string) {
  const [failedSource, setFailedSource] = useState<string>();
  const unavailable = !src || src === failedSource;

  return {
    unavailable,
    imageProps: {
      src: unavailable ? unavailablePhoto : src,
      alt: unavailable ? `Image unavailable for ${alt}` : alt,
      onError: unavailable ? undefined : () => setFailedSource(src),
    },
  };
}

type ProductPhotoProps = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  "width" | "height" | "className"
> & {
  src?: string | undefined;
  alt: string;
};

export function ProductPhoto({ src, alt, ...props }: ProductPhotoProps) {
  const { imageProps } = useProductPhoto(src, alt);
  return <img {...props} {...imageProps} />;
}
