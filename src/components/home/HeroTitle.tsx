/**
 * Spezza il titolo in parole e le fa entrare in scena una alla volta
 * (animazione CSS `hero-word`, con delay crescente via custom property).
 * Nessuna libreria: solo keyframes definiti in globals.css.
 */
export function HeroTitle({
  text,
  className,
  baseDelay = 0,
  step = 0.12,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  step?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true">
          <span
            className="hero-word"
            style={{ "--word-delay": `${baseDelay + index * step}s` } as React.CSSProperties}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
