"use client";

import { useRef, type ReactNode } from "react";

/**
 * Versão contida do conceito de tilt-parallax do padrão Prexter: profundidade
 * 3D sutil que reage ao mouse, sem o brilho lima "tech" nem o elemento de
 * marca em contra-parallax — aqui o brilho usa o verde institucional em baixa
 * opacidade, e a inclinação máxima é menor, para manter o tom acolhedor em
 * vez de "gadget". Só reage a ponteiro fino (mouse); em touch o card fica
 * estático, sem risco de tremor durante o scroll.
 */
const MAX_TILT_DEG = 5;

export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * MAX_TILT_DEG * 2;
    const rotateX = -(py - 0.5) * MAX_TILT_DEG * 2;

    el.style.transition = "transform 60ms linear";
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${
        px * 100
      }% ${py * 100}%, rgba(92,146,92,0.16), transparent 65%)`;
    }
  }

  function handlePointerLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 450ms cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    if (glowRef.current) {
      glowRef.current.style.background = "transparent";
    }
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative isolate will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-[background] duration-150"
      />
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
