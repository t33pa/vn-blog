import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/app/components/base/Navbar";
import FooterMenu from "@/app/components/base/FooterMenu";
import Footer from "@/app/components/base/Footer";

export const metadata: Metadata = {
  title: "Teepa's VN Blog",
  description: "主に美少女ゲームの備忘録など",
  openGraph: {
    title: "Teepa's VN Blog",
    description: "主に美少女ゲームの備忘録など",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="">
      <body className="bg-gray-100 dark:bg-gray-900 text-neutral-800 dark:text-slate-100">
        <Navbar />
        <div className="text-center text-slate-500 mt-2 mb-2">
          しがない美少女ゲーマーの備忘録
        </div>
        <div className="mx-auto sm:max-w-2xl px-6">{children}</div>
        <FooterMenu />
        <Footer />
      </body>
    </html>
  );
}
