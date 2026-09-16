"use client";

import { motion, useReducedMotion } from "framer-motion";

// Confirmação visual do envio: o check "se desenha" (stroke animado) em vez
// de simplesmente aparecer, reforçando no momento de maior ansiedade do
// visitante (acabou de pedir ajuda para um familiar) que a ação foi
// concluída com sucesso.
export function SuccessCheck() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-secondary)]"
    >
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none">
        <motion.path
          d="M5 13l4 4L19 7"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={shouldReduceMotion ? undefined : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
}
