"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import Tilt from "./Tilt";
import { ArrowUpRightIcon, GitHubIcon } from "./Icons";
import { profile, projects } from "../data/profile";

gsap.registerPlugin(ScrollTrigger);

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current.querySelectorAll(".featured-card"),
          { opacity: 0, y: 70 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: featuredRef.current, start: "top 85%", once: true },
          }
        );
      }

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.querySelectorAll(".project-card"),
          { opacity: 0, y: 60, scale: 0.94 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
          }
        );
      }

      // Floating particles
      gsap.to(".proj-particle", {
        y: -20, x: 10, duration: 6, repeat: -1, yoyo: true,
        ease: "sine.inOut", stagger: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="proj-particle particle-dot" style={{ top: "12%", left: "6%" }} />
      <div className="proj-particle particle-dot" style={{ top: "55%", right: "4%" }} />
      <div className="proj-particle particle-dot" style={{ top: "85%", left: "15%" }} />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label="Projects" title="Featured" highlight="Projects" />

        {/* Featured projects */}
        <div ref={featuredRef} className="space-y-6 mb-16">
          {featured.map((project, idx) => (
            <Tilt key={project.name} max={2.5}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="featured-card project-card block gradient-border card-shine group p-6 sm:p-9 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(0,0,0,0.5),0_0_34px_rgba(212,175,55,0.12)]"
                style={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[auto_1.25fr_1fr] gap-6 lg:gap-10 items-start">
                  <span className="font-display italic text-5xl sm:text-6xl gradient-text leading-none opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-100 group-hover:text-gold-200 transition-colors duration-300">
                        {project.name}
                      </h3>
                      <ArrowUpRightIcon className="w-5 h-5 mt-1 text-stone-600 group-hover:text-gold-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 lg:hidden" />
                    </div>
                    <p className="text-sm sm:text-base text-stone-400 leading-relaxed mt-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {project.topics.map((topic) => (
                        <span key={topic} className="px-2.5 py-1 rounded-full border border-gold-500/25 bg-gold-500/[0.07] text-[11px] font-medium text-gold-200">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:border-l lg:border-gold-500/15 lg:pl-8">
                    <div className="flex items-center justify-between mb-4">
                      <p className="eyebrow text-stone-500">Highlights</p>
                      <ArrowUpRightIcon className="w-5 h-5 text-stone-600 group-hover:text-gold-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 hidden lg:block" />
                    </div>
                    <ul className="space-y-3">
                      {project.highlights?.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-stone-300">
                          <span className="w-1.5 h-1.5 rotate-45 bg-gold-400 mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </a>
            </Tilt>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-lg font-semibold text-stone-200 whitespace-nowrap">More projects</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-gold-500/30 to-transparent" />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map((project) => {
            const cardClass =
              "project-card flex flex-col gradient-border p-6 h-full card-shine group transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_0_34px_rgba(212,175,55,0.12)]";
            const body = (
              <>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-semibold text-stone-200 group-hover:text-gold-200 transition-colors duration-300">
                    {project.name}
                  </h3>
                  {project.url && (
                    <ArrowUpRightIcon className="w-4 h-4 mt-1 text-stone-600 group-hover:text-gold-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" />
                  )}
                </div>

                <p className="text-[13px] text-stone-400 leading-relaxed mb-5 line-clamp-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-gold-500/10">
                  {project.topics.map((topic) => (
                    <span key={topic} className="px-2 py-0.5 rounded-full border border-gold-500/20 bg-gold-500/[0.05] text-[10px] text-gold-200/90">
                      {topic}
                    </span>
                  ))}
                </div>
              </>
            );

            // Projects without a public repository render as a plain card.
            return (
              <Tilt key={project.name} className="h-full">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                    style={{ opacity: 0 }}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={cardClass} style={{ opacity: 0 }}>
                    {body}
                  </div>
                )}
              </Tilt>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href={`${profile.github}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-6 py-3 text-sm"
          >
            <GitHubIcon className="w-5 h-5" />
            View All Repositories
          </a>
        </div>
      </div>

      <div className="glow-separator mt-24 mx-auto max-w-4xl" />
    </section>
  );
}
