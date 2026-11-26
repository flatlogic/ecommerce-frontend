import type { ButtonHTMLAttributes } from "react";

export default function ButtonLink({
  style,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      style={{
        background: "transparent",
        border: 0,
        cursor: "pointer",
        color: "var(--link-color)",
        display: "inline",
        margin: 0,
        padding: 0,
        ...style,
      }}
    />
  );
}
