import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ParticleBackground from "./components/ParticleBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muneeb Ur Rehman — AI & Machine Learning Engineer",
  description:
    "Portfolio of Muneeb Ur Rehman — CS-AI undergraduate at FAST NUCES specializing in Machine Learning, NLP, and Agentic AI. Building intelligent systems that solve real-world problems.",
  keywords: [
    "Muneeb Ur Rehman",
    "AI Engineer",
    "Machine Learning",
    "Portfolio",
    "FAST NUCES",
    "Python",
    "Deep Learning",
    "NLP",
  ],
  authors: [{ name: "Muneeb Ur Rehman" }],
  openGraph: {
    title: "Muneeb Ur Rehman — AI & Machine Learning Engineer",
    description:
      "CS-AI undergraduate building intelligent systems with cutting-edge AI technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col noise-overlay">
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}
