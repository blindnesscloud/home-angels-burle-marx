"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Transição suave entre rotas (/ -> /obrigado), mesmo conceito de
// page-transition do padrão Prexter: fade + leve subida, para que a chegada
// em /obrigado pareça uma confirmação natural em vez de um reload abrupto.
export default function Template({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-full flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
