import "./globals.css";
import NavBar from "@/components/NavBar";
import { getCurrentUser } from "@/lib/session";
import { PenkleAnalytics } from "@/components/PenkleAnalytics";
import { Metadata } from "next";
import { Poppins } from "next/font/google";

const EBGaramond = Poppins({
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Koffy",
  description: "A coffee list app",
  keywords: "coffee, list, app, koffy, coffee beans",
  metadataBase: new URL('https://koffy.app/'),
  openGraph: {
    title: "Koffy",
    description: "A coffee list app",
    type: "website",
    url: "https://koffy.app",
    locale: "en_US",
    images: [
      {
        url: "https://koffy.app/coffee.png",
        width: 980,
        height: 980,
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
		description: "A coffee listing app",
		site: "@koffyapp",
		card: "summary_large_image",

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
        <div className="tracking-tight">
          <NavBar session={session} />
          {children}
        </div>
      </body>
    </html>
  );
}
