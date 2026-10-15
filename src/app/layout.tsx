import type { Metadata } from "next";
import { allFontVariableClasses } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Menú Digital",
  description: "Menús digitales para restaurantes latinos en USA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${allFontVariableClasses} font-sans bg-[#FFFDF7] text-stone-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
