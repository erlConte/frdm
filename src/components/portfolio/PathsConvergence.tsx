/** Ponte visivo continuo fra i due percorsi e la sezione progetti. */
export function PathsConvergence() {
  return (
    <div className="paths-convergence-bridge relative h-56 sm:h-64" aria-hidden="true">
      <svg
        viewBox="0 0 1000 260"
        className="absolute inset-0 mx-auto h-full w-full max-w-7xl overflow-visible"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          className="convergence-path convergence-path-tech"
          d="M250 0 C 250 82, 375 76, 455 132 C 478 148, 492 154, 500 158"
          stroke="var(--track-tech)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="convergence-path convergence-path-hospitality"
          d="M750 0 C 750 76, 638 82, 548 132 C 522 146, 508 154, 500 158"
          stroke="var(--track-hosp)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="convergence-stem"
          d="M500 158 C 500 190, 500 222, 500 260"
          stroke="rgba(255,255,255,0.72)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle className="convergence-point" cx="500" cy="158" r="7" fill="white" />
      </svg>
    </div>
  );
}
