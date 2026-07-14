/**
 * Elemento grafico di raccordo: le due linee dei percorsi (tech e
 * hospitality) convergono in un punto unico — i progetti. SVG inline,
 * nessuna dipendenza.
 */
export function PathsConvergence() {
  return (
    <svg
      viewBox="0 0 320 96"
      className="paths-convergence mx-auto h-16 w-full max-w-xs sm:h-24"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M40 0 C 40 48, 160 40, 160 88"
        className="convergence-path convergence-path-tech"
        stroke="var(--cyan)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M280 0 C 280 48, 160 40, 160 88"
        className="convergence-path convergence-path-hospitality"
        stroke="#e598ad"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle className="convergence-point" cx="160" cy="88" r="6" fill="white" />
    </svg>
  );
}
