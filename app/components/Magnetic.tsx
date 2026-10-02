"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  // How far the content follows the cursor, as a fraction of the distance.
  strength?: number;
}

// Pulls a button slightly toward the cursor and springs it back on leave.
export default function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        // Measure from the resting position, not the already-shifted one.
        const centerX = rect.left + rect.width / 2 - Number(gsap.getProperty(el, "x"));
        const centerY = rect.top + rect.height / 2 - Number(gsap.getProperty(el, "y"));
        gsap.to(el, {
          x: (event.clientX - centerX) * strength,
          y: (event.clientY - centerY) * strength,
          duration: 0.4,
          ease: "power3.out",
          overwrite: true,
        });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)", overwrite: true });
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => mm.revert();
  }, [strength]);

  return (
    <span ref={ref} className={`inline-flex ${className}`}>
      {children}
    </span>
  );
}
