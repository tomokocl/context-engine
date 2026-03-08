import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Context Engine",
  description: "自分のコンテキストを整理してAIに渡す",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
