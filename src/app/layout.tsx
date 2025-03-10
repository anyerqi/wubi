import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "五笔编码查询系统 - 86版/98版/新世纪五笔在线查询",
  description: "免费在线查询汉字的86版、98版和新世纪版五笔编码，提供五笔字根图，帮助五笔输入法学习和使用",
  keywords: "五笔查询,五笔编码,五笔86版,五笔98版,新世纪五笔,五笔字根,五笔输入法,汉字编码,五笔在线查询",
  authors: [{ name: "五笔编码查询系统" }],
  creator: "五笔编码查询系统",
  publisher: "五笔编码查询系统",
  robots: "index, follow",
  alternates: {
    canonical: "https://wubi.superyi.top",
  },
  openGraph: {
    title: "五笔编码查询系统 - 86版/98版/新世纪五笔在线查询",
    description: "免费在线查询汉字的86版、98版和新世纪版五笔编码，提供五笔字根图，帮助五笔输入法学习和使用",
    url: "https://wubi.superyi.top",
    siteName: "五笔编码查询系统",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
