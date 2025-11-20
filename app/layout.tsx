import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WalletProvider } from "@/contexts/WalletContext";

export const metadata: Metadata = {
  title: "WinScan",
  description: "Multi-chain blockchain explorer powered by WinScan",
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          <WalletProvider>
            {children}
          </WalletProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
