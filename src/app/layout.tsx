import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

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
      <body className="antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
