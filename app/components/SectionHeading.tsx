"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  label: string;
  title: string;
  highlight: string;
}

export default function SectionHeading({ label, title, highlight }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const line = el.querySelector(".sh-line");
      const labelEl = el.querySelector(".sh-label");
      const titleEl = el.querySelector(".sh-title");
      const sep = el.querySelector(".sh-sep");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });

      tl.fromTo(line, { width: 0, opacity: 0 }, { width: 48, opacity: 1, duration: 0.6, ease: "power2.out" })
        .fromTo(labelEl, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .fromTo(titleEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
        .fromTo(sep, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.8, ease: "power2.out", transformOrigin: "left" }, "-=0.2");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mb-14">
      <div className="flex items-center gap-3 mb-4">
        <div className="sh-line h-px bg-gradient-to-r from-cyan-500 to-transparent" style={{ width: 0, opacity: 0 }} />
        <span className="sh-label text-sm font-medium text-cyan-400 tracking-widest uppercase" style={{ opacity: 0 }}>
          {label}
        </span>
      </div>

      <h2 className="sh-title text-3xl sm:text-4xl font-bold tracking-tight" style={{ opacity: 0 }}>
        {title}{" "}
        <span className="heading-line visible">
          <span className="gradient-text">{highlight}</span>
        </span>
      </h2>

      <div className="sh-sep mt-4 h-px max-w-xs" style={{ opacity: 0, transform: 'scaleX(0)' }}>
        <div className="glow-separator" />
      </div>
    </div>
  );
}
