import "./globals.css";
import NavBar from "@/components/navBar";
import { getCurrentUser } from "@/lib/session";
import { PenkleAnalytics } from "@/components/penkleAnalytics";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "@/components/providers";
import SwitchDarkLightMode from "@/components/switchDarkLightMode";

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
		images:[{
			url:"https://koffy.app/images/card.png",
			alt:"Koffy",
		},],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();

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
        <Providers>
          <div className="tracking-tight">
            <div className="fixed inset-0 justify-center flex -z-20 items-center">
              <div className="big-shape w-96 h-96 rounded-full relative blur-[99px] opacity-90 bg-neutral-300 dark:bg-neutral-500"/>
								{/* <div className="w-56 h-56 md:hidden rounded-full absolute bottom-24 right-24 bg-neutral-300 dark:bg-neutral-500"></div>
							</div> */}
              <div className="medium-shape w-72 h-72 rounded-full relative bg-neutral-300 dark:bg-neutral-500 opacity-90 blur-[99px]" />
              <div className="little-shape w-52 h-52 rounded-full relative bg-neutral-300 dark:bg-neutral-500 opacity-90 blur-[99px]" />
            </div>
            <NavBar session={session} />
            {children}
          </div>
          <SwitchDarkLightMode />
        </Providers>
      </body>
    </html>
  );
}
