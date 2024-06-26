import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/context/GlobalProvider";
import Sidebar from "@/components/sidebar/Sidebar";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediaSharing",
  description: "MediaSharing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader
          color="#496ceb"
          height={3}
          initialPosition={0.08}
          easing="ease"
        />
        <Providers>
          <Sidebar />
          <section className="pl-56 max-md:pl-0 ">{children}</section>
        </Providers>
      </body>
    </html>
  );
}
