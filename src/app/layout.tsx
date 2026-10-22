import type { Metadata } from "next";
import { Playfair_Display, Marcellus, Inter } from "next/font/google";
import "./globals.css";
import { SITE, SITE_URL } from "@/lib/constants";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
});

const marcellus = Marcellus({
  subsets: ["latin"],
  variable: "--font-marcellus",
  display: "swap",
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — Realize seu sonho de tocar ou cantar`,
    template: `%s · ${SITE.shortName}`,
  },
  description: `A maior escola de música do ${SITE.region}. Aulas presenciais e online ao vivo de canto, violão, guitarra, teclado, contrabaixo e bateria em ${SITE.city}.`,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${marcellus.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-night text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
