"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";

/**
 * Versão contida do MagneticButton do padrão Prexter: o botão "puxa" na
 * direção do cursor e ganha um brilho radial sutil no hover. Reduzido em
 * intensidade (metade do deslocamento, glow mais discreto) porque aqui o
 * botão carrega a conversão inteira da campanha — precisa parecer convidativo
 * e "vivo", nunca brincalhão ou impreciso para quem vai clicar. Em touch
 * (a maioria do tráfego de Ads) o efeito simplesmente não dispara, o botão
 * se comporta como um link normal.
 */
const SPRING_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

type MagneticCtaProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function MagneticCta({ href, children, className = "" }: MagneticCtaProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    el.style.transitionDuration = "80ms";
    el.style.transitionTimingFunction = "linear";
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;

    const glow = glowRef.current;
    if (glow) {
      const px = ((event.clientX - rect.left) / rect.width) * 100;
      const py = ((event.clientY - rect.top) / rect.height) * 100;
      glow.style.setProperty("--gx", `${px}%`);
      glow.style.setProperty("--gy", `${py}%`);
      glow.style.opacity = "1";
    }
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (el) {
      el.style.transitionDuration = "500ms";
      el.style.transitionTimingFunction = SPRING_EASE;
      el.style.transform = "translate(0, 0)";
    }
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transitionDuration: "500ms", transitionTimingFunction: SPRING_EASE }}
      className={`group/magnetic relative isolate inline-flex items-center justify-center overflow-hidden rounded-lg will-change-transform ${className}`}
    >
      <span
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 ease-out"
        style={
          {
            "--gx": "50%",
            "--gy": "50%",
            background:
              "radial-gradient(120px circle at var(--gx) var(--gy), rgba(255,255,255,0.25), transparent 70%)",
          } as React.CSSProperties
        }
      />
      <span className="relative flex items-center gap-0 transition-[gap] duration-300 ease-out group-hover/magnetic:gap-2">
        {children}
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="h-4 w-0 shrink-0 -translate-x-1 scale-75 opacity-0 transition-[width,transform,opacity] duration-300 ease-out group-hover/magnetic:w-4 group-hover/magnetic:translate-x-0 group-hover/magnetic:scale-100 group-hover/magnetic:opacity-100"
          fill="none"
        >
          <path
            d="M2 8h11.5M9 3.5 13.5 8 9 12.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
