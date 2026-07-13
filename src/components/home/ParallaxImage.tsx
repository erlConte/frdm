"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Foto profilo con leggero parallax allo scroll. Implementazione minimale:
 * un listener passivo + requestAnimationFrame, niente librerie. Disattivato
 * se l'utente preferisce ridurre il movimento.
 */
export function ParallaxImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      // Sposta la foto a ~15% della velocità di scroll, entro ±24px.
      const offset = Math.max(-24, Math.min(24, window.scrollY * -0.15));
      node.style.transform = `translateY(${offset}px)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 128px, 176px"
        className="object-cover"
        priority
      />
    </div>
  );
}
