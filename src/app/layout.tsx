import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Arizona Real Estate License Courses | Fast, Easy, Guaranteed",
  description: "Get your Arizona Real Estate License quickly and easily with our comprehensive online courses. Money-back guarantee, expert instruction, and state-approved curriculum.",
  keywords: "Arizona real estate license, real estate courses, continuing education, Arizona Department of Real Estate, real estate training",
  authors: [{ name: "Arizona Real Estate Academy" }],
  openGraph: {
    title: "Arizona Real Estate License Courses | Fast, Easy, Guaranteed",
    description: "Get your Arizona Real Estate License quickly and easily with our comprehensive online courses.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arizona Real Estate License Courses",
    description: "Get your Arizona Real Estate License quickly and easily with our comprehensive online courses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-gray-50">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
