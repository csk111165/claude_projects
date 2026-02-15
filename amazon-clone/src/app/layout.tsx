import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import CartDrawer from "@/components/cart/CartDrawer";
import BottomNav from "@/components/layout/BottomNav";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ScrollProgress />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 pb-14 md:pb-0">{children}</main>
          <Footer />
        </div>
        <CartDrawer />
        <BackToTop />
        <MobileNav />
        <BottomNav />
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
