"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { openChat } from "../lib/chatEvents";
import { SparkIcon } from "./Icons";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP entrance
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
      if (linksRef.current) {
        gsap.fromTo(linksRef.current.children,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out", delay: 0.5 }
        );
      }
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      let current = "";
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          current = sections[i];
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      style={{ opacity: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(7,7,6,0.82)] backdrop-blur-xl py-3 border-b border-gold-500/10 shadow-lg shadow-black/40"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2.5 group">
          <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-gold-500/40 bg-gold-500/5 font-display italic text-lg gradient-text transition-colors duration-300 group-hover:border-gold-400">
            M
          </span>
          <span className="text-sm font-semibold tracking-[0.25em] text-stone-200 group-hover:text-gold-200 transition-colors duration-300">
            MUNEEB
          </span>
        </a>

        <div ref={linksRef} className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 animated-underline ${
                activeSection === link.href.replace("#", "")
                  ? "text-gold-300 bg-gold-400/10"
                  : "text-stone-400 hover:text-stone-100"
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => openChat()}
            className="btn-gold ml-3 px-4 py-2 text-sm"
          >
            <SparkIcon className="w-4 h-4" />
            Ask AI
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={`block w-6 h-0.5 bg-gold-200 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gold-200 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gold-200 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <div className={`md:hidden mt-2 mx-4 rounded-xl overflow-hidden transition-all duration-300 bg-[rgba(7,7,6,0.96)] backdrop-blur-xl border border-gold-500/10 ${mobileOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0 border-transparent"}`}>
        <div className="py-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-all duration-300 ${
                activeSection === link.href.replace("#", "")
                  ? "text-gold-300 bg-gold-400/5"
                  : "text-stone-400 hover:text-stone-100 hover:bg-white/5"
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="px-6 pt-3 pb-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openChat();
              }}
              className="btn-gold w-full px-4 py-2.5 text-sm"
            >
              <SparkIcon className="w-4 h-4" />
              Ask my AI
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
