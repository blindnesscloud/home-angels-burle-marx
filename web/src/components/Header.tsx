/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export function Header() {
  return (
    <header className="flex justify-center pt-[calc(30.5*var(--spacing))] lg:pt-27 lg:pb-17">
      <Link href="/" aria-label="Home Angels, voltar para a página inicial" className="flex">
        <img
          src="/figma/header-logo-mobile.svg"
          alt=""
          className="h-33 w-[calc(193.123*var(--spacing))] lg:hidden"
        />
        <img
          src="/figma/header-logo-desktop.svg"
          alt=""
          className="hidden h-[calc(76.6*var(--spacing))] w-[calc(448.28*var(--spacing))] lg:block"
        />
      </Link>
    </header>
  );
}
