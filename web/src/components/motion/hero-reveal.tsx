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

// Variantes "no-op" para prefers-reduced-motion: propositalmente NÃO usamos
// `undefined` aqui. O motion.div filho (HeroRevealItem) resolve o rótulo de
// variante ("hidden"/"visible") que o pai (HeroReveal) propaga via contexto
// contra o PRÓPRIO objeto `variants` do filho — se esse objeto for
// `undefined`, o filho fica com o valor de "initial" implícito e nunca sai
// dele, porque não há como reavaliar um rótulo de variante sem um objeto de
// variantes para resolvê-lo. Usar um objeto estático (hidden === visible)
// garante que a propagação sempre resolva para um estado visível.
const staticContainer: Variants = { hidden: {}, visible: {} };
const staticItem: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
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
      variants={shouldReduceMotion ? staticContainer : container}
    >
      {children}
    </motion.div>
  );
}

export function HeroRevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`js-reveal ${className ?? ""}`}
      variants={shouldReduceMotion ? staticItem : item}
    >
      {children}
    </motion.div>
  );
}
