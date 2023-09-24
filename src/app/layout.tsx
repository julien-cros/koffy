import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
// import Providers from '@/components/Providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Coffee",
  description: "Created by julien Cros",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Providers> */}
        <NavBar />
        {children}
        {/* </Providers> */}
        {/* <Footer/> */}
      </body>
    </html>
  );
}
