"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Orb floating animations
      gsap.to(orb1Ref.current, {
        x: 40, y: -30, scale: 1.15,
        duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(orb2Ref.current, {
        x: -50, y: 40, scale: 0.9,
        duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2,
      });
      gsap.to(orb3Ref.current, {
        x: 30, y: 20, scale: 1.2,
        duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 4,
      });

      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(nameRef.current, { opacity: 0, y: 40, skewX: -3 }, { opacity: 1, y: 0, skewX: 0, duration: 0.9 }, "-=0.3")
        .fromTo(titleRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7 }, "-=0.4")
        .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
        .fromTo(linksRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
        .fromTo(imageRef.current, { opacity: 0, scale: 0.85, rotation: -5 }, { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "back.out(1.4)" }, "-=0.8")
        .fromTo(scrollRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");

      // Scroll dot bounce
      gsap.to(".scroll-dot", {
        y: 8, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div ref={orb1Ref} className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div ref={orb2Ref} className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div ref={orb3Ref} className="absolute top-3/4 left-1/3 w-64 h-64 bg-blue-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-32">
        <div className="hero-grid grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-400" style={{ opacity: 0 }}>
              <span className="status-dot" />
              Open to opportunities
            </div>

            <h1 ref={nameRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight" style={{ opacity: 0 }}>
              Hi, I&apos;m{" "}
              <span className="gradient-text">Muneeb Ur Rehman</span>
            </h1>

            <p ref={titleRef} className="text-xl sm:text-2xl text-zinc-400 font-medium" style={{ opacity: 0 }}>
              AI &amp; Machine Learning Engineer
            </p>

            <p ref={descRef} className="text-base sm:text-lg text-zinc-500 max-w-xl leading-relaxed" style={{ opacity: 0 }}>
              BSAI undergraduate at FAST NUCES specializing in Machine Learning,
              NLP, and Agentic AI. Building intelligent systems that solve
              real-world problems with cutting-edge AI technologies.
            </p>

            <div ref={linksRef} className="hero-links flex items-center gap-4 pt-2" style={{ opacity: 0 }}>
              <a href="https://linkedin.com/in/muneeb-ur-rehman-461843246" target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 hover:-translate-y-0.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a href="https://github.com/Muneeb1481" target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-violet-500/10 hover:border-violet-500/30 hover:text-violet-400 hover:-translate-y-0.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a href="mailto:muneeb.ur.rehm4n@gmail.com"
                className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400 hover:-translate-y-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Email
              </a>
            </div>
          </div>

          <div ref={imageRef} className="hero-image relative" style={{ opacity: 0 }}>
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 blur-2xl animate-pulse-glow" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500 animate-spin-slow opacity-30" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 bg-zinc-900">
                <Image src="/profile.jpeg" alt="Muneeb Ur Rehman" fill className="object-cover" priority sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px" unoptimized />
              </div>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
          <span className="text-xs text-zinc-600 tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-zinc-700 flex justify-center pt-1.5">
            <div className="scroll-dot w-1 h-2 rounded-full bg-cyan-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
