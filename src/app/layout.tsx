import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Our Links - Open Session",
  description: "Link sharing for Open Session",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
