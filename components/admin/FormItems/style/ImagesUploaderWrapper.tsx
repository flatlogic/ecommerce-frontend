import type { HTMLAttributes } from "react";
import styles from "./ImagesUploaderWrapper.module.scss";

export default function ImagesUploaderWrapper({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
    />
  );
}
