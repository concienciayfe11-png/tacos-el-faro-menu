import { Playfair_Display, Merriweather, Lora, Oswald, Inter, Roboto, Open_Sans, Nunito_Sans } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["400", "600", "700"],
});
const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["400", "700"],
});
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto", weight: ["400", "500", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });
const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito-sans" });

export const headingFonts = [
  { label: "Playfair Display", value: "Playfair Display", cssVar: "var(--font-playfair-display)", className: playfairDisplay.variable },
  { label: "Merriweather", value: "Merriweather", cssVar: "var(--font-merriweather)", className: merriweather.variable },
  { label: "Lora", value: "Lora", cssVar: "var(--font-lora)", className: lora.variable },
  { label: "Oswald", value: "Oswald", cssVar: "var(--font-oswald)", className: oswald.variable },
] as const;

export const bodyFonts = [
  { label: "Inter", value: "Inter", cssVar: "var(--font-inter)", className: inter.variable },
  { label: "Roboto", value: "Roboto", cssVar: "var(--font-roboto)", className: roboto.variable },
  { label: "Open Sans", value: "Open Sans", cssVar: "var(--font-open-sans)", className: openSans.variable },
  { label: "Nunito Sans", value: "Nunito Sans", cssVar: "var(--font-nunito-sans)", className: nunitoSans.variable },
] as const;

export const allFontVariableClasses = [...headingFonts, ...bodyFonts].map((f) => f.className).join(" ");

export function headingFontVar(name: string | null | undefined) {
  return headingFonts.find((f) => f.value === name)?.cssVar ?? headingFonts[0].cssVar;
}

export function bodyFontVar(name: string | null | undefined) {
  return bodyFonts.find((f) => f.value === name)?.cssVar ?? bodyFonts[0].cssVar;
}
