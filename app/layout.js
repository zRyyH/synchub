import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { NotificationProvider } from "@/providers/NotificationProvider";
import { QueryProvider } from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rodrigo Abadi",
  description: "by zRyyH",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NotificationProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}