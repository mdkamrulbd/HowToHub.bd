import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HowToHub.bd - বাংলাদেশের স্মার্ট টিউটোরিয়াল প্ল্যাটফর্ম",
  description: "বাংলাদেশি শিক্ষার্থীদের জন্য আধুনিক টিউটোরিয়াল ব্লগ প্ল্যাটফর্ম।",
  icons: {
    icon: "/howtohub-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
