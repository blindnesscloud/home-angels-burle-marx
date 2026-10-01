/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { buildWhatsappLink, siteConfig } from "@/lib/site-config";

const WA_MESSAGE =
  "Olá! Vim pela página da Home Angels Burle Marx e quero saber mais sobre cuidadores de idosos.";

function Social() {
  return (
    <div className="flex w-77 items-start">
      <a
        href={siteConfig.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="flex h-37 flex-1 items-center p-10"
      >
        <img src="/figma/instagram-icon.svg" alt="" className="size-17" />
      </a>
      <a
        href={buildWhatsappLink(WA_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex h-37 flex-1 items-center p-10"
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

const SMALL = "font-inter text-12 leading-17 tracking-[-0.0192em] text-black/80";

export function MobileFooter() {
  return (
      <div className="flex flex-col items-center pt-24 lg:hidden">
        <div className="flex w-full flex-col items-center justify-start gap-9">
          <div className="flex h-73 w-full justify-center">
            <Logo />
          </div>
          <p className="h-20 w-194 font-inter text-12 leading-20 tracking-[0.25em] whitespace-nowrap text-black/50 uppercase">
            Unidade Burle Marx
          </p>
          <p className="h-20 w-203 text-center font-inter text-15 leading-20 font-bold tracking-[-0.0153em] text-ink-2">
            Todo Cuidado é Nosso
          </p>
          <Link href="/privacidade" className="w-159 text-center font-helvetica text-12 leading-[1.15] text-black/59">
            Política de Privacidade
          </Link>
          <Link href="/termos" className="w-159 text-center font-helvetica text-12 leading-[1.15] text-black/61">
            Termos e Condições
          </Link>
          <div className="flex h-83 w-120 flex-col items-start gap-12">
            <Social />
            <div className="flex flex-col items-start">
              <div className="flex justify-center pr-10"><p className={`${SMALL} w-118 text-center whitespace-nowrap`}>{siteConfig.cnpj}</p></div>
              <p className={`${SMALL} w-120 text-center whitespace-nowrap`}>Home Angels ⓒ 2026</p>
            </div>
          </div>
          <div className="flex h-96 w-full items-center justify-center bg-ink">
            <p className="w-169 font-helvetica text-15 leading-[1.15] text-white">
              Desenvolvido por Prextel
            </p>
          </div>
        </div>
      </div>
  );
}

function DesktopFooter() {
  return (
      <div className="hidden flex-col items-center lg:flex">
        <div className="mx-auto flex h-329 w-full max-w-1440 flex-col items-start justify-start px-251">
          <div className="flex w-full flex-col items-start gap-9">
            <div className="h-73 w-full">
              <div className="w-199">
                <Logo />
              </div>
            </div>
            <div className="h-20 w-194">
              <p className="w-184 font-inter text-12 leading-20 tracking-[0.25em] whitespace-nowrap text-black/50 uppercase">
                Unidade Burle Marx
              </p>
            </div>
            <p className="h-20 w-203 font-inter text-15 leading-20 font-bold tracking-[-0.0153em] text-ink-2">
              Todo Cuidado é Nosso
            </p>
            <Link href="/privacidade" className="w-159 font-helvetica text-12 leading-[1.15] text-black/59">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="w-159 font-helvetica text-12 leading-[1.15] text-black/61">
              Termos e Condições
            </Link>
            <div className="flex h-83 w-120 flex-col items-start gap-12">
              <Social />
              <div className="flex flex-col items-start">
                <div className="flex justify-center pr-10"><p className={`${SMALL} w-109 whitespace-nowrap`}>{siteConfig.cnpj}</p></div>
                <p className={`${SMALL} w-120 whitespace-nowrap`}>Home Angels ⓒ 2026</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-71 w-full items-center justify-center bg-ink pt-25 pb-33">
          <p className="w-169 font-helvetica text-15 leading-[1.15] text-white">
            Desenvolvido por Prextel
          </p>
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
