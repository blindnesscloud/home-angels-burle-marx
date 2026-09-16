"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Mesmo conceito de easing/entrada do padrão Prexter (spring suave, sem
// bounce), mas sem blur no reveal: para público 45+ lendo texto de decisão,
// nitidez imediata do texto importa mais que o efeito.
const EASE = [0.16, 1, 0.3, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function SectionReveal({
  children,
  className,
  delay = 0,
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`js-reveal ${className ?? ""}`}
      suppressHydrationWarning
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
      variants={shouldReduceMotion ? staticVariants : variants}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: EASE,
        delay: shouldReduceMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
