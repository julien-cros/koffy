import "./globals.css";
// import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import { getCurrentUser } from "@/lib/actions";

import { Metadata } from "next";
import { Lexend } from "next/font/google";


const EBGaramond = Lexend({ subsets: ["latin"]  });



export const metadata: Metadata = {
	metadataBase: new URL('https://koffy.app/'),
  openGraph: {
	title: "Koffy",
	description: "A coffee list app",
	type: "website",
	url: "https://koffy.app/",
	locale: "en_US",
	images: [
	  {
		url: "https://koffy.app/coffee.png",
		width: 800,
		height: 600,
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
  const session = await getCurrentUser();

  return (
    <html lang="en">
		<head>
			<link rel="icon" type="image/x-icon" sizes="32x32" href="/images/favicon.ico"/>
			<script src="https://code.jquery.com/jquery-3.5.0.min.js" async></script>
		</head>
      <body className={EBGaramond.className}>
        <NavBar session={session} />
        {children}
      </body>
    </html>
  );
}
