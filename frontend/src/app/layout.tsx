import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexaCare.ai | Predict. Prevent. Personalize.",
  description: "AI-powered predictive healthcare analytics platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@800,700,600,500,400&display=swap" rel="stylesheet" />
      </head>
      <body className={`${dmSans.variable} antialiased selection:bg-[#C8A96E] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
