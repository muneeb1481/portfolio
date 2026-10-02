"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { markLoaderDone } from "../lib/loader";
import { profile } from "../data/profile";

gsap.registerPlugin(ScrollTrigger);

// Full-screen intro that counts up, then lifts like a curtain to reveal the page.
export default function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const html = document.documentElement;
    html.style.overflow = "hidden";

    const finish = () => {
      html.style.overflow = "";
      ScrollTrigger.refresh();
      setDone(true);
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });

      if (reducedMotion) {
        tl.add(markLoaderDone, 0.2).to(root, { opacity: 0, duration: 0.3 });
        return;
      }

      const countEl = root.querySelector(".loader-count");
      const progress = { value: 0 };

      tl.fromTo(
        ".loader-mark",
        { opacity: 0, scale: 0.8, rotationY: -90, transformPerspective: 600 },
        { opacity: 1, scale: 1, rotationY: 0, duration: 0.8 }
      )
        .fromTo(".loader-name", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
        .fromTo(".loader-bar", { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, 0.2)
        .to(
          progress,
          {
            value: 100,
            duration: 1.3,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countEl) countEl.textContent = `${Math.round(progress.value)}%`;
            },
          },
          0.2
        )
        .to(".loader-content", { opacity: 0, y: -24, duration: 0.4, ease: "power2.in" })
        .add(markLoaderDone)
        .to(root, { yPercent: -100, duration: 0.9, ease: "power4.inOut" });
    }, root);

    return () => {
      ctx.revert();
      html.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading portfolio"
      className="loader fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div className="loader-content flex flex-col items-center">
        <div className="loader-mark relative flex items-center justify-center w-20 h-20" style={{ opacity: 0 }}>
          <span className="absolute inset-0 rounded-full border border-gold-500/20 border-t-gold-400 animate-spin" />
          <span className="font-display italic text-4xl gradient-text pr-1">M</span>
        </div>
        <p className="loader-name eyebrow mt-6" style={{ opacity: 0 }}>
          {profile.name}
        </p>
        <div className="mt-5 h-px w-44 bg-white/10 overflow-hidden">
          <div
            className="loader-bar h-full origin-left bg-gradient-to-r from-gold-700 via-gold-400 to-gold-200"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <p className="loader-count mt-3 font-mono text-xs text-stone-500">0%</p>
      </div>
    </div>
  );
}
