"use client";

import { useEffect, useRef } from "react";

export function LiquidHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let frame = 0;

    const updatePointer = (event: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = node.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        node.style.setProperty("--pointer-x", `${Math.max(12, Math.min(88, x))}%`);
        node.style.setProperty("--pointer-y", `${Math.max(14, Math.min(82, y))}%`);
        node.style.setProperty("--aura-rotate", `${(x - 50) * 0.12}deg`);
      });
    };

    const resetPointer = () => {
      node.style.setProperty("--pointer-x", "58%");
      node.style.setProperty("--pointer-y", "45%");
      node.style.setProperty("--aura-rotate", "0deg");
    };

    node.addEventListener("pointermove", updatePointer);
    node.addEventListener("pointerleave", resetPointer);

    return () => {
      node.removeEventListener("pointermove", updatePointer);
      node.removeEventListener("pointerleave", resetPointer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} className="liquid-hero relative min-h-[calc(100svh-5rem)] overflow-hidden">
      {children}
    </section>
  );
}
