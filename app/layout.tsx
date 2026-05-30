import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
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
  title: {
    default: "Triad Labs — Learning Management System",
    template: "%s | Triad Labs",
  },
  description: "Learn trading, finance, AI & tech with expert-led courses. Master advanced strategies, build algorithmic trading systems, and earn certificates.",
  keywords: ["LMS", "trading courses", "finance", "AI", "algorithmic trading", "learning platform"],
  authors: [{ name: "Triad Academy" }],
  openGraph: {
    title: "Triad Labs — Learning Management System",
    description: "Learn trading, finance, AI & tech with expert-led courses.",
    siteName: "Triad Labs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
