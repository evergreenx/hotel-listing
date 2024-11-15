import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/ui/sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hotel Ranking",
  description: "Hotel app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {" "}
          <div className="h-screen flex bg-gray-100">
           

            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8">
              <div className="max-w-11xl mx-auto  sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
          <Toaster />
        </body>
      </StoreProvider>
    </html>
  );
}
