import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { FaultyTerminal } from "@/components/FaultyTerminal";

const GA_MEASUREMENT_ID = "G-VCQFSDNWJN";

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
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {/* Background layer - fixed, behind all content */}
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <FaultyTerminal
            tint="#FFFAEE"
            brightness={0.08}
            curvature={0.4}
            mouseReact={true}
            mouseStrength={1.5}
            scale={1.2}
            scanlineIntensity={0.5}
            noiseAmp={1}
            pageLoadAnimation={true}
          />
        </div>
        {/* Scroll mask - hides content in the gap above sticky nav */}
        <div
          className="fixed top-0 left-0 right-0 z-30 pointer-events-none"
          aria-hidden="true"
          style={{
            height: '56px',
            background:
              'linear-gradient(to bottom, rgba(25,25,25,1) 0%, rgba(25,25,25,1) 60%, rgba(25,25,25,0) 100%)',
          }}
        />
        {/* Content layer - above background */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
