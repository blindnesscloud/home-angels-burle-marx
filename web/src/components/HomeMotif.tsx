export function HomeMotif({ className = "" }: { className?: string }) {
  // Desenho de linha original (nao e foto de banco de imagens): uma casa
  // simples com um coracao na porta -- cuidado que entra pela porta de casa,
  // a ideia central do servico. Traco unico, geometria simples, coerente
  // com a paleta institucional em vez de decoracao generica.
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M40 168 L160 64 L280 168"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64 148 V264 H256 V148"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M136 264 V196 H184 V264"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M160 222c-10-11-27-9-27 5 0 12 15 20 27 30 12-10 27-18 27-30 0-14-17-16-27-5Z"
        fill="currentColor"
      />
    </svg>
  );
}
