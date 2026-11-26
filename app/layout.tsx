import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "./providers";
import "styles/theme.scss";
import "react-inner-image-zoom/lib/styles.min.css";

export const metadata: Metadata = {
  title: { default: "Ecommerce", template: "%s | Ecommerce" },
  description: "Modern ecommerce storefront and administration template",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <style>
          {
            '@import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,600,700,800");'
          }
        </style>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
