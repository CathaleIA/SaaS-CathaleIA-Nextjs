// src/app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Open_Sans, Montserrat } from "next/font/google";

import "@/app/styles/globals.css";

import ClientNavBar from "@/components/navbar/ClientNavBar";

import { LanguageProvider } from "@/context/LanguageContext";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Copower Dashboard",
  description: "App web, managed your analisis data company",
  icons: {
    icon: "@/../favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">
      <body className={`${montserrat.variable} ${poppins.variable} ${openSans.variable} font-[--font-inter]`}>
        <LanguageProvider>
          <ClientNavBar/>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}