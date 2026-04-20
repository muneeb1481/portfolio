"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "Resume–Job Matching AI",
    description:
      "Full-stack Flask app that uses LLMs to semantically match resumes to job descriptions. Produces a detailed compatibility report with skill gap analysis, match score, and structured JSON output. Deployed on Vercel.",
    language: "Python",
    topics: ["LLM", "Flask", "NLP"],
    url: "https://github.com/Muneeb1481/Resume-Job-Matching-AI-Powered-LLMs--master",
    color: "cyan",
  },
  {
    name: "Chat with Your Document",
    description:
      "Fully local RAG chatbot powered by LLaMA 2 + LangChain. Upload any PDF and have a natural language conversation with it — no API keys, no cloud. Uses FAISS vector store and HuggingFace embeddings for semantic retrieval.",
    language: "Python",
    topics: ["RAG", "LLaMA 2", "LangChain"],
    url: "https://github.com/Muneeb1481/Chat-with-your-document-LLAMA2-LangChain-master",
    color: "violet",
  },
  {
    name: "DevOps Monitoring Dashboard",
    description:
      "Production-grade observability stack with Flask, Prometheus, Grafana, and Pushgateway. Collects 30+ real-time metrics every 5 seconds across 4 professional dashboards covering CI/CD, app health, and system performance.",
    language: "Python",
    topics: ["DevOps", "Prometheus", "Grafana"],
    url: "https://github.com/Muneeb1481/devops-dashboard-main",
    color: "blue",
  },
  {
    name: "APR Dataset Builder",
    description:
      "Automated pipeline that mines GitHub repositories to build structured datasets of buggy/fixed Python code pairs for training Automated Program Repair models. Resumable, incremental, and RepairLLaMA-compatible.",
    language: "Python",
    topics: ["GitHub API", "Data Pipeline", "APR"],
    url: "https://github.com/Muneeb1481/APR-DATASET-Creation",
    color: "emerald",
  },
  {
    name: "Hybrid Movie Recommender",
    description:
      "Streamlit app combining user-based collaborative filtering (Pearson correlation) and content-based filtering (genre cosine similarity). Fetches live movie posters via OMDB API. Deployed on Streamlit Community Cloud.",
    language: "Python",
    topics: ["Recommender System", "Streamlit", "ML"],
    url: "https://github.com/Muneeb1481/Hybrid-Movie-Recommender-System-main",
    color: "amber",
  },
  {
    name: "Django E-commerce Platform",
    description:
      "Full-stack laptop marketplace built with Django featuring AI-powered product recommendations, smart search, cart management, order tracking, and a complete admin panel for inventory control.",
    language: "Python",
    topics: ["Django", "E-commerce", "AI"],
    url: "https://github.com/Muneeb1481/Django--Laptop-Selling-Ecommerce-Platform---AI-Integrate--master",
    color: "cyan",
  },
  {
    name: "HEC Transcript Generator",
    description:
      "Streamlit app that validates student transcripts against HEC Pakistan CS degree requirements. Auto-categorizes courses, calculates CGPA, checks 7 credit categories, and generates a downloadable PDF transcript.",
    language: "Python",
    topics: ["Streamlit", "PDF", "Education"],
    url: "https://github.com/Muneeb1481/HEC-Degree-Requirements-and-Transcript-Generator",
    color: "violet",
  },
  {
    name: "IR Boolean Search Engine",
    description:
      "Streamlit IR system implementing Boolean Retrieval and Proximity Search from scratch over a research abstract corpus. Supports AND/OR/NOT operators, Porter stemming, and pre-built inverted + positional indexes.",
    language: "Python",
    topics: ["IR", "Boolean Model", "NLP"],
    url: "https://github.com/Muneeb1481/IRBooleanModel",
    color: "blue",
  },
  {
    name: "VSM Search Engine",
    description:
      "Vector Space Model IR system with TF-IDF weighting and cosine similarity for ranked document retrieval. Built from scratch over research abstracts with a pre-built NumPy matrix index and Streamlit UI.",
    language: "Python",
    topics: ["TF-IDF", "Cosine Similarity", "IR"],
    url: "https://github.com/Muneeb1481/VSM",
    color: "emerald",
  },
  {
    name: "Video Game Recommender",
    description:
      "Content-based filtering system for video games using genre overlap, developer matching, and TF-IDF text similarity on game summaries. Features tiered scoring, fuzzy title search, and Precision@K evaluation.",
    language: "Python",
    topics: ["Content-Based", "TF-IDF", "Recommender"],
    url: "https://github.com/Muneeb1481/Video-Game-Content-Based-RS-main",
    color: "amber",
  },
];

const colorMap: Record<string, { badge: string; glow: string; dot: string }> = {
  cyan:    { badge: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",    glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]",    dot: "bg-cyan-400" },
  violet:  { badge: "bg-violet-500/10 border-violet-500/20 text-violet-400", glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]", dot: "bg-violet-400" },
  blue:    { badge: "bg-blue-500/10 border-blue-500/20 text-blue-400",    glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]",    dot: "bg-blue-400" },
  emerald: { badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400", glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]", dot: "bg-emerald-400" },
  amber:   { badge: "bg-amber-500/10 border-amber-500/20 text-amber-400", glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]",   dot: "bg-amber-400" },
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll(".project-card");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

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

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => {
            const c = colorMap[project.color];
            return (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-card block gradient-border p-6 h-full card-shine group transition-all duration-400 hover:-translate-y-2 ${c.glow}`}
                style={{ opacity: 0 }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <svg className={`w-4 h-4 flex-shrink-0 transition-colors duration-300 text-zinc-500 group-hover:${c.dot.replace("bg-", "text-")}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    <h3 className="text-sm font-semibold text-zinc-200 truncate group-hover:text-zinc-100 transition-colors duration-300">
                      {project.name}
                    </h3>
                  </div>
                  <svg className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed mb-4 line-clamp-4 min-h-[4rem]">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.topics.map((topic) => (
                    <span key={topic} className={`px-2 py-0.5 rounded-full border text-[10px] ${c.badge}`}>
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 mt-auto pt-3 border-t border-white/5">
                  <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
                  <span className="text-[11px] text-zinc-500">{project.language}</span>
                </div>
              </a>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/Muneeb1481?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View All Repositories
          </a>
        </div>
      </div>

      <div className="glow-separator mt-24 mx-auto max-w-4xl" />
    </section>
  );
}
