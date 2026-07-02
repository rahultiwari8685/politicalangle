import React from "react";
import "@/public/assets/css/vendors/bootstrap-grid.min.css";

import "@/public/assets/css/vendors/swiper-bundle.min.css";
import "@/public/assets/css/vendors/carouselTicker.css";
import "@/public/assets/css/main.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import "remixicon/fonts/remixicon.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";

const geist = Geist({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "Top Headlines News",
//   description: "Top Headlines News",
// };

export const metadata: Metadata = {
  title: "Political Angle",
  description: "Political Angle",

  openGraph: {
    title: "Political Angle",
    description: "Political Angle",
    url: "https://politicalangle.in",
    siteName: "Political Angle",
    images: [
      {
        url: "https://politicalangle.in/assets/imgs/template/logo/Political_Logo.png",
        width: 1200,
        height: 630,
        alt: "Political Angle",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Political Angle",
    description: "Political Angle",
    images: [
      "https://politicalangle.in/assets/imgs/template/logo/Political_Logo.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className}`}>
        {children}

        <GoogleAnalytics gaId="G-KFDT2ZZ2L1" />
      </body>
    </html>
  );
}
