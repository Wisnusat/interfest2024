import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
const silverStone = localFont({
  src: "./fonts/silverStoneRegular.ttf",
  variable: "--font-silver-stone-regular",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Interfest 2024",
  description: "Embark on a magical journey of technology and innovation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${silverStone.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
