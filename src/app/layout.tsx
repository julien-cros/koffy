import "./globals.css";
import { PenkleAnalytics } from "@/components/penkleAnalytics";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "@/components/providers";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import QueryProviders from "@/components/tanstackProvider";
import React from "react";

const EBGaramond = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Koffy",
  description: "A coffee list app",
  keywords: "coffee, list, app, koffy, coffee beans",
  metadataBase: new URL("https://koffy.app/"),
  openGraph: {
    title: "Koffy",
    description: "A coffee list app",
    type: "website",
    url: "https://koffy.app",
    locale: "en_US",
    images: [
      {
        url: "https://koffy.app/images/card.png",
        alt: "Koffy",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    title: "Koffy",
    description: "A coffee listing app to keep a record of your coffee.",
    site: "@koffyapp",
    card: "summary_large_image",
    images: [
      {
        url: "https://koffy.app/images/card.png",
        alt: "Koffy",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <PenkleAnalytics domain="koffy.app" />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="32x32"
          href="/images/favicon.ico"
        />
        <script
          src="https://code.jquery.com/jquery-3.5.0.min.js"
          async
        ></script>
      </head>
      <body className={EBGaramond.className}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <QueryProviders>
          <Providers>
            <div className="min-h-screen dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col hiddeScrollBar">
              <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
                <div className="fixed inset-0 justify-center flex -z-20 items-center">
                  <div className="big-shape w-96 h-96 rounded-full relative blur-[99px] opacity-90 bg-neutral-300 dark:bg-neutral-500" />
                  <div className="medium-shape w-72 h-72 rounded-full relative bg-neutral-300 dark:bg-neutral-500 opacity-90 blur-[99px]" />
                  <div className="little-shape w-52 h-52 rounded-full relative bg-neutral-300 dark:bg-neutral-500 opacity-90 blur-[99px]" />
                </div>
              </div>
              <div className="z-10 childScrollBar">{children}</div>
            </div>
          </Providers>
        </QueryProviders>
      </body>
    </html>
  );
}
