import type { Metadata } from "next";
import { Libre_Baskerville, Inter } from "next/font/google";
import "./globals.css";

const libre = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://homeangelsburlemarx.com.br"),
  title: "Home Angels Burle Marx | Cuidadores de Idosos",
  description:
    "Cuidador profissional dentro da sua casa, com supervisão técnica constante e atendimento sob medida para o seu caso. Atendimento em toda cidade de São Paulo.",
  openGraph: {
    title: "Home Angels Burle Marx | Cuidadores de Idosos",
    description:
      "Cuide de quem você ama, sem abrir mão da sua rotina. Atendimento em toda cidade de São Paulo.",
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${libre.variable} ${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
