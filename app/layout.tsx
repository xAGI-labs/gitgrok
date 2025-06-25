import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitGrok - Transform Git repositories into AI-friendly text",
  description:
    "Convert any Git repository into prompt-friendly text digests for LLMs. Zero friction, beautiful interface, powerful analysis.",
  keywords: [
    "git",
    "repository",
    "AI",
    "LLM",
    "code analysis",
    "prompt",
    "digest",
  ],
  authors: [{ name: "GitGrok Team" }],
  openGraph: {
    title: "GitGrok - Transform Git repositories into AI-friendly text",
    description:
      "Convert any Git repository into prompt-friendly text digests for LLMs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
