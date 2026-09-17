import type { Metadata } from "next";
import { Fraunces, Public_Sans, Caveat } from "next/font/google";
import "./globals.css";

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  weight: "variable",
  display: "swap",
});

const bodyFont = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const scriptFont = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://homeangelsburlemarx.com.br"),
  title: "Home Angels Burle Marx | Cuidadores de Idosos com Avaliação Gratuita",
  description:
    "Cuidador ou enfermeiro profissional na casa de quem você ama, com supervisão técnica e plantões sob medida. Avaliação gratuita e sem compromisso.",
  openGraph: {
    title: "Home Angels Burle Marx | Cuidadores de Idosos",
    description:
      "Cuidador ou enfermeiro profissional em casa, com supervisão técnica e plantões sob medida. Avaliação gratuita.",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${displayFont.variable} ${bodyFont.variable} ${scriptFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <noscript>
          <style>{`.js-reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
