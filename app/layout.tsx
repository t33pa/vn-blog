"use client";

import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: "Teepa's VN Blog",
  description: "主に美少女ゲームの備忘録など",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();
  return (
    <html lang="ja">
      <body className="bg-gray-100 dark:bg-gray-900 text-neutral-800 dark:text-slate-100">
        <Navbar path={currentPath} />
        <div className="text-center text-slate-500 mt-2 mb-2">
          しがない美少女ゲーマーの備忘録
        </div>
        <div className="mx-auto sm:max-w-2xl px-6">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
