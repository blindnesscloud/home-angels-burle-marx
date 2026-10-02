/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { buildWhatsappLink, siteConfig } from "@/lib/site-config";

const WA_MESSAGE =
  "Olá! Vim pela página da Home Angels Burle Marx e quero saber mais sobre cuidadores de idosos.";

function Social() {
  return (
    <div className="flex items-center justify-center">
      <a
        href={siteConfig.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="flex h-37 items-center p-10"
      >
        <img src="/figma/instagram-icon.svg" alt="" className="size-17" />
      </a>
      <a
        href={buildWhatsappLink(WA_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex h-37 items-center p-10"
      >
        <img src="/figma/whatsapp-icon.svg" alt="" className="size-17" />
      </a>
    </div>
  );
}

function Logo() {
  return (
    <div className="relative h-53 w-204 overflow-hidden">
      <img
        src="/figma/footer-logo.png"
        alt="Home Angels Cuidadores de Idosos"
        className="absolute top-0 left-[3.18%] h-full w-[93.65%] max-w-none"
      />
    </div>
  );
}

const SMALL = "font-inter text-12 leading-17 tracking-[-0.0192em] whitespace-nowrap text-black/80";

// Bloco do rodapé centralizado na página (desktop e mobile).
function FooterContent() {
  return (
    <div className="flex w-full flex-col items-center gap-9 text-center">
      <div className="flex h-73 w-full justify-center">
        <Logo />
      </div>
      {/* margem negativa compensa o espaçamento após a última letra e mantém o texto no centro */}
      <p className="-mr-[0.25em] font-inter text-12 leading-20 tracking-[0.25em] whitespace-nowrap text-black/50 uppercase">
        Unidade Burle Marx
      </p>
      <p className="font-inter text-15 leading-20 font-bold tracking-[-0.0153em] whitespace-nowrap text-ink-2">
        Todo Cuidado é Nosso
      </p>
      <Link href="/privacidade" className="font-helvetica text-12 leading-[1.15] text-black/59">
        Política de Privacidade
      </Link>
      <Link href="/termos" className="font-helvetica text-12 leading-[1.15] text-black/61">
        Termos e Condições
      </Link>
      <div className="flex flex-col items-center gap-12">
        <Social />
        <div className="flex flex-col items-center">
          <p className={SMALL}>{siteConfig.cnpj}</p>
          <p className={SMALL}>Home Angels ⓒ 2026</p>
        </div>
      </div>
    </div>
  );
}

export function MobileFooter() {
  return (
    <div className="flex flex-col items-center gap-9 pt-24 lg:hidden">
      <FooterContent />
      <div className="flex h-96 w-full items-center justify-center bg-ink">
        <p className="font-helvetica text-15 leading-[1.15] text-white">Desenvolvido por Prextel</p>
      </div>
    </div>
  );
}

function DesktopFooter() {
  return (
    <div className="hidden flex-col items-center lg:flex">
      <div className="mx-auto flex h-329 w-full max-w-1440 flex-col items-center justify-start">
        <FooterContent />
      </div>
      <div className="flex h-71 w-full items-center justify-center bg-ink pt-25 pb-33">
        <p className="font-helvetica text-15 leading-[1.15] text-white">Desenvolvido por Prextel</p>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full">
      <MobileFooter />
      <DesktopFooter />
    </footer>
  );
}
