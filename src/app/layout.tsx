import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Cart from "@/components/Cart";
import CartContext from "@/context/CartContext";
import Footer from "@/components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BraWear",
  description: "Best Products for The Best Clients",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartContext>
          <Navbar />
          <Cart />
          <div className="flex flex-col justify-between min-h-[60vh]">
            {children}
          </div>
          <Footer />
        </CartContext>
      </body>
    </html>
  );
}
