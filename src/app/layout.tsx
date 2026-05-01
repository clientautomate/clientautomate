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
  title: "ClientAutomate — Reply to every Google review. Automatically.",
  description:
    "AI-powered Google review responses in British English. You approve, it sends. 14-day free trial, no credit card required.",
  metadataBase: new URL("https://clientautomate.co.uk"),
  openGraph: {
    title: "ClientAutomate — Reply to every Google review. Automatically.",
    description:
      "AI-powered Google review responses in British English. You approve, it sends. 14-day free trial, no credit card required.",
    url: "https://clientautomate.co.uk",
    siteName: "ClientAutomate",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClientAutomate — Reply to every Google review. Automatically.",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClientAutomate — Reply to every Google review. Automatically.",
    description:
      "AI-powered Google review responses in British English. 14-day free trial, no credit card required.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
