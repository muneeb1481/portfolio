"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, projects } from "../data/profile";
import { openChat } from "../lib/chatEvents";
import { onLoaderDone } from "../lib/loader";
import Magnetic from "./Magnetic";
import { ArrowRightIcon, GitHubIcon, LinkedInIcon, MailIcon, SparkIcon } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

const quickQuestions = [
  "What do you specialize in?",
  "Tell me about your voice AI agents",
  "Are you open to work?",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = containerRef.current;
    let offLoader = () => {};

    const ctx = gsap.context(() => {
      // Orb floating animations
      gsap.to(".hero-orb-1", {
        x: 40, y: -30, scale: 1.15,
        duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(".hero-orb-2", {
        x: -50, y: 40, scale: 0.9,
        duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2,
      });

      // Entrance timeline, held until the intro loader lifts.
      // The floating badges sit in front of the photo (z) so they separate when it tilts.
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-reveal", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.11 })
        .fromTo(".hero-image", { opacity: 0, scale: 0.9, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power4.out" }, 0.25)
        .fromTo(".hero-float", { opacity: 0, y: 14, z: 60 }, { opacity: 1, y: 0, z: 60, duration: 0.6, stagger: 0.15 }, "-=0.4")
        .fromTo(".hero-scroll", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");

      // Count the project number up as its badge appears
      const countEl = section?.querySelector(".hero-count");
      const count = { value: 0 };
      tl.to(count, {
        value: projects.length,
        duration: 1.1,
        ease: "power2.out",
        onUpdate: () => {
          if (countEl) countEl.textContent = String(Math.round(count.value));
        },
      }, "-=0.9");

      offLoader = onLoaderDone(() => tl.play());

      // Scroll dot bounce
      gsap.to(".scroll-dot", {
        y: 8, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      // Cinematic parallax as the hero scrolls away
      gsap.to(".hero-copy", {
        y: -60, opacity: 0.25, ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-photo", {
        yPercent: 8, scale: 1.06, ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, containerRef);

    // 3D motion: the photo leans toward the cursor anywhere over the hero
    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const tilt = section?.querySelector(".hero-tilt");
      if (!section || !tilt) return;

      const rotateX = gsap.quickTo(tilt, "rotationX", { duration: 0.9, ease: "power3.out" });
      const rotateY = gsap.quickTo(tilt, "rotationY", { duration: 0.9, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        rotateY(((event.clientX - rect.left) / rect.width - 0.5) * 16);
        rotateX((0.5 - (event.clientY - rect.top) / rect.height) * 12);
      };
      const onLeave = () => {
        rotateX(0);
        rotateY(0);
      };

      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);
      return () => {
        section.removeEventListener("pointermove", onMove);
        section.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => {
      offLoader();
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="hero-orb-1 absolute top-1/4 -left-32 w-96 h-96 bg-gold-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="hero-orb-2 absolute bottom-1/4 -right-32 w-96 h-96 bg-gold-700/15 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-28 w-full">
        <div className="hero-grid grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-14 lg:gap-16 items-center">
          <div className="hero-copy space-y-6">
            <div className="hero-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/5 border border-gold-500/20 text-sm text-stone-300" style={{ opacity: 0 }}>
              <span className="status-dot" />
              {profile.availability}
            </div>

            <h1 className="hero-reveal text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]" style={{ opacity: 0 }}>
              <span className="block text-stone-100">Muneeb</span>
              <span className="block font-display italic font-medium gradient-text gradient-text-animated pb-2">
                Ur Rehman
              </span>
            </h1>

            <p className="hero-reveal eyebrow text-[0.8rem]" style={{ opacity: 0 }}>
              {profile.role}
            </p>

            <p className="hero-reveal text-base sm:text-lg text-stone-400 max-w-xl leading-relaxed mx-auto lg:mx-0" style={{ opacity: 0 }}>
              {profile.tagline}
            </p>

            {/* Ask-AI bar */}
            <div className="hero-reveal max-w-xl mx-auto lg:mx-0" style={{ opacity: 0 }}>
              <button
                type="button"
                onClick={() => openChat()}
                className="group w-full flex items-center gap-3 pl-5 pr-2 py-2 rounded-2xl bg-white/[0.03] border border-gold-500/25 text-left transition-all duration-300 hover:border-gold-400/60 hover:bg-gold-500/[0.06] hover:shadow-[0_0_30px_rgba(212,175,55,0.12)]"
              >
                <SparkIcon className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="flex-1 text-sm sm:text-base text-stone-400 group-hover:text-stone-200 transition-colors duration-300">
                  Ask my AI anything about me…
                </span>
                <span className="btn-gold w-10 h-10 rounded-xl flex-shrink-0">
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </button>
              <div className="hero-chips flex flex-wrap gap-2 mt-3">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => openChat(q)}
                    className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs text-stone-400 transition-all duration-300 hover:border-gold-500/40 hover:text-gold-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="hero-reveal hero-links flex flex-wrap items-center gap-3 pt-2" style={{ opacity: 0 }}>
              <Magnetic>
                <a href="#projects" className="btn-outline px-5 py-3 text-sm">
                  View projects
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="btn-outline w-11 h-11">
                  <LinkedInIcon className="w-[18px] h-[18px]" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                  className="btn-outline w-11 h-11">
                  <GitHubIcon className="w-[18px] h-[18px]" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={`mailto:${profile.email}`} aria-label="Email"
                  className="btn-outline w-11 h-11">
                  <MailIcon className="w-[18px] h-[18px]" />
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="hero-image relative" style={{ opacity: 0, perspective: "1100px" }}>
            <div className="hero-tilt relative w-64 sm:w-72 lg:w-[22rem] mx-auto" style={{ transformStyle: "preserve-3d" }}>
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold-400/20 via-transparent to-gold-700/20 blur-3xl" />
              <div className="photo-frame rounded-[2rem]">
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-gold-400/30 bg-stone-900">
                  <Image
                    src="/photos/hero.jpeg"
                    alt="Portrait of Muneeb Ur Rehman"
                    fill
                    preload
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 352px"
                    className="hero-photo object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-left">
                    <p className="eyebrow">{profile.location}</p>
                    <p className="mt-1 text-sm text-stone-200">BS Artificial Intelligence · FAST NUCES</p>
                  </div>
                </div>
              </div>

              <div className="hero-float hidden sm:flex absolute -left-10 top-10 items-center gap-2 px-3.5 py-2 rounded-xl bg-[rgba(12,11,9,0.9)] border border-gold-500/25 backdrop-blur-md shadow-xl shadow-black/50" style={{ opacity: 0 }}>
                <SparkIcon className="w-4 h-4 text-gold-400" />
                <span className="text-xs font-medium text-stone-200">Voice AI · RAG · Agents</span>
              </div>
              <div className="hero-float hidden sm:block absolute -right-8 bottom-24 px-3.5 py-2 rounded-xl bg-[rgba(12,11,9,0.9)] border border-gold-500/25 backdrop-blur-md shadow-xl shadow-black/50 text-left" style={{ opacity: 0 }}>
                <p className="hero-count text-lg font-bold gradient-text leading-none">{projects.length}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-stone-400">Projects built</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
          <span className="text-xs text-stone-600 tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-gold-500/30 flex justify-center pt-1.5">
            <div className="scroll-dot w-1 h-2 rounded-full bg-gold-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
