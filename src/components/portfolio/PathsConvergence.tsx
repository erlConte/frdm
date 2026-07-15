/** Ponte visivo continuo fra i due percorsi e la sezione progetti. */
export function PathsConvergence() {
  return (
    <div className="paths-convergence-bridge relative h-56 sm:h-64" aria-hidden="true">
      <svg
        viewBox="0 0 320 240"
        className="absolute inset-0 mx-auto h-full w-full max-w-2xl overflow-visible"
        fill="none"
      >
        <path
          className="convergence-path convergence-path-tech"
          d="M72 0 C 72 68, 118 72, 142 116 C 150 130, 157 138, 160 142"
          stroke="var(--track-tech)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="convergence-path convergence-path-hospitality"
          d="M248 0 C 248 52, 205 66, 180 108 C 171 124, 164 136, 160 142"
          stroke="var(--track-hosp)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="convergence-stem"
          d="M160 142 C 160 170, 160 198, 160 240"
          stroke="rgba(255,255,255,0.72)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle className="convergence-point" cx="160" cy="142" r="6" fill="white" />
      </svg>
    </div>
  );
}
