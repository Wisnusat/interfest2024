import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

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
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B0CZTBLP08"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B0CZTBLP08');
          `}
        </Script>
        {children}
        <footer className="text-white py-6 md:py-8 px-4 md:px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center relative z-10">
            <div className="mb-4 sm:mb-0">
              {/* <WandIcon className="h-8 w-8 mb-2 text-[#FFD700]" /> */}
              <p className="text-sm">© 2024 Interfest. All rights reserved.</p>
            </div>
            {/* <nav>
            <ul className="flex space-x-4 md:space-x-6">
              <li><Link href="#" className="hover:text-[#FFD700] transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-[#FFD700] transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-[#FFD700] transition-colors">Contact</Link></li>
            </ul>
          </nav> */}
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
