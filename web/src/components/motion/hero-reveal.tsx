"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Entrada escalonada ao carregar (não ao rolar) — o hero já nasce visível na
// dobra, então a animação roda uma vez no mount, dando o mesmo "peso de
// entrada" do padrão Prexter sem depender de scroll.
export function HeroReveal({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`js-reveal ${className ?? ""}`}
      initial="hidden"
      animate="visible"
      variants={shouldReduceMotion ? undefined : container}
    >
      {children}
    </motion.div>
  );
}

export function HeroRevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div className={`js-reveal ${className ?? ""}`} variants={shouldReduceMotion ? undefined : item}>
      {children}
    </motion.div>
  );
}
