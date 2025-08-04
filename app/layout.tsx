import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Macwrite Beta - AI Writing App for Mac",
  description: "Join the beta! Save hours on written communication with Macwrite Beta, the ultimate AI writing assistant for Mac. Write faster emails, Slack replies, Jira tickets, proofread and more.",
  keywords: ["ai writing", "mac os app", "productivity", "writing assistant", "ai writing", "email assistant", "macwrite", "beta", "early access"],
  authors: [{ name: "macwrite Team" }],
  creator: "Macwrite",
  publisher: "Macwrite",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.macwrite.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.macwrite.ai",
    title: "Macwrite Beta - AI Writing App for Mac",
    description: "Join the beta! Save hours on written communication with Macwrite Beta, the ultimate AI writing assistant for Mac.",
    siteName: "Macwrite Beta",
  },
  twitter: {
    card: "summary_large_image",
    title: "Macwrite Beta - AI Writing App for Mac",
    description: "Join the beta! Save hours on written communication with Macwrite Beta, the ultimate AI writing assistant for Mac.",
    creator: "@macwrite",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ThemeProvider attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
