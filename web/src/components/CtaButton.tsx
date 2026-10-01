import type { ReactNode } from "react";

// Componente "Botão CTA" / "Group 512" do Figma: estados Default (#5C925C),
// Hover (#97B197) e Click (#2E492E).
const base =
  "flex h-47 items-center justify-center rounded-12 bg-green px-18 py-14 font-helvetica text-18 leading-[1.15] whitespace-nowrap text-white transition-colors hover:bg-green-hover active:bg-green-active";

type CtaLinkProps = { href: string; children: ReactNode; className?: string };

export function CtaLink({ href, children, className = "" }: CtaLinkProps) {
  return (
    <a href={href} className={`${base} w-269 ${className}`}>
      {children}
    </a>
  );
}

type CtaSubmitProps = { children: ReactNode; disabled?: boolean };

export function CtaSubmit({ children, disabled }: CtaSubmitProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${base} w-full cursor-pointer disabled:cursor-default disabled:bg-green-active`}
    >
      {children}
    </button>
  );
}
