import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { CookieBanner } from "../components/CookieBanner";

const prompt = Prompt({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ["thai", "latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "คำนวณ.com | The Ultimate Calculator Hub",
  description: "ศูนย์รวมเครื่องมือคำนวณออนไลน์ที่ใช้งานง่ายที่สุด",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${prompt.className} antialiased transition-colors duration-300`}>
        <ThemeProvider>
          {children}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
