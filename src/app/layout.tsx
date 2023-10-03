import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import { getCurrentUser } from "@/lib/session";
import { Metadata } from "next";


const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "Koffy",
  description: "A coffee list app",
  openGraph: {
	title: "Koffy",
	description: "A coffee list app",
	type: "website",
	url: "https://koffy.juliencros.com",
	images: [
	  {
		url: "https://koffy.juliencros.com/coffee.png",
		width: 800,
		height: 600,
		alt: "Koffy logo",
	  },
	],		
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar session={session} />
        {children}
      </body>
    </html>
  );
}
