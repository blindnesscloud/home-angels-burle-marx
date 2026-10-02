import type { Metadata } from "next";
import { Libre_Baskerville, Inter } from "next/font/google";
import Script from "next/script";
import { GOOGLE_ADS_ID, GTM_ID, META_PIXEL_ID } from "@/lib/tracking";
import { CONSENT_KEY } from "@/lib/consent";
import { CookieBanner } from "@/components/CookieBanner";
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
      <head>
        {/* Consent Mode v2: tudo negado até o visitante aceitar no banner de cookies */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var c = null; try { c = localStorage.getItem('${CONSENT_KEY}'); } catch (e) {}
var s = c === 'granted' ? 'granted' : 'denied';
gtag('consent', 'default', { ad_storage: s, ad_user_data: s, ad_personalization: s, analytics_storage: s, wait_for_update: 500 });`}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>

        {/* Google tag (gtag.js) — Google Ads */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
var hc = null; try { hc = localStorage.getItem('${CONSENT_KEY}'); } catch (e) {}
fbq('consent', hc === 'granted' ? 'grant' : 'revoke');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Meta Pixel (noscript) */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
