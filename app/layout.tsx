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
  title: {
    default: "Macwrite Beta - AI Writing App for Mac",
    template: "%s | Macwrite Beta"
  },
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: 'technology',
  classification: 'Productivity Software',
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.macwrite.ai",
    title: "Macwrite Beta - AI Writing App for Mac",
    description: "Join the beta! Save hours on written communication with Macwrite Beta, the ultimate AI writing assistant for Mac.",
    siteName: "Macwrite Beta",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Macwrite Beta - AI Writing App for Mac',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Macwrite Beta - AI Writing App for Mac",
    description: "Join the beta! Save hours on written communication with Macwrite Beta, the ultimate AI writing assistant for Mac.",
    creator: "@macwrite",
    images: ['/og-image.jpg'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Macwrite Beta',
  },
  other: {
    'theme-color': '#9333EA',
    'color-scheme': 'dark light',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
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
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#9333EA" />
        <meta name="color-scheme" content="dark light" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
          media="print" 
          onLoad="this.media='all'"
        />
        <noscript>
          <link 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
            rel="stylesheet" 
          />
        </noscript>
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
