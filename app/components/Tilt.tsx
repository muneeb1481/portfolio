"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";

interface TiltProps {
  children: ReactNode;
  className?: string;
  // Maximum rotation in degrees.
  max?: number;
  // Corner radius of the glare, matching the card inside.
  radius?: string;
}

// Tilts its content in 3D toward the cursor and moves a soft gold glare with it.
export default function Tilt({ children, className = "", max = 7, radius }: TiltProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const rotateX = gsap.quickTo(inner, "rotationX", { duration: 0.5, ease: "power3.out" });
      const rotateY = gsap.quickTo(inner, "rotationY", { duration: 0.5, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const rect = outer.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        rotateY((px - 0.5) * 2 * max);
        rotateX((0.5 - py) * 2 * max);
        inner.style.setProperty("--glare-x", `${px * 100}%`);
        inner.style.setProperty("--glare-y", `${py * 100}%`);
      };
      const onLeave = () => {
        rotateX(0);
        rotateY(0);
      };

      outer.addEventListener("pointermove", onMove);
      outer.addEventListener("pointerleave", onLeave);
      return () => {
        outer.removeEventListener("pointermove", onMove);
        outer.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => mm.revert();
  }, [max]);

  return (
    <div
      ref={outerRef}
      className={`tilt ${className}`}
      style={radius ? ({ "--tilt-radius": radius } as CSSProperties) : undefined}
    >
      <div ref={innerRef} className="tilt-inner">
        {children}
        <div className="tilt-glare" aria-hidden="true" />
      </div>
    </div>
  );
}
