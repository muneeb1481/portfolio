import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { highlights } from "../data/profile";

const campusPhotos = [
  { src: "/photos/campus-1.jpeg", alt: "Muneeb Ur Rehman in a navy suit, side profile" },
  { src: "/photos/campus-2.jpeg", alt: "Muneeb Ur Rehman standing by a fountain" },
  { src: "/photos/campus-3.jpeg", alt: "Muneeb Ur Rehman leaning on a railing" },
  { src: "/photos/campus-4.jpeg", alt: "Muneeb Ur Rehman on the FAST NUCES campus" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Floating particles */}
      <div className="particle-dot" style={{ top: "15%", right: "10%" }} />
      <div className="particle-dot" style={{ top: "60%", right: "25%" }} />
      <div className="particle-dot" style={{ top: "40%", left: "5%" }} />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="About Me"
          title="Crafting Intelligence,"
          highlight="One Model at a Time"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-16 items-start">
          {/* Portrait */}
          <AnimatedSection direction="left">
            <div className="photo-frame rounded-3xl w-60 sm:w-72 mx-auto lg:mx-0">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold-400/25 bg-stone-900">
                <Image
                  src="/photos/about.jpeg"
                  alt="Muneeb Ur Rehman smiling, wearing glasses and a navy suit"
                  fill
                  sizes="(max-width: 640px) 240px, 288px"
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </AnimatedSection>

          <div>
            {/* Text Content */}
            <AnimatedSection delay={100}>
              <div className="space-y-5 text-stone-400 leading-relaxed text-base sm:text-lg">
                <p>
                  I&apos;m a passionate{" "}
                  <span className="text-stone-100 font-medium text-highlight">Artificial Intelligence</span> student at
                  FAST NUCES, Karachi. My journey in tech revolves around
                  building intelligent systems that bridge the gap between theoretical AI
                  and real-world applications.
                </p>
                <p>
                  From building{" "}
                  <span className="text-gold-300 font-medium text-highlight">voice AI agents</span>{" "}
                  that book appointments over the phone, to{" "}
                  <span className="text-gold-300 font-medium text-highlight">RAG systems</span>{" "}
                  and{" "}
                  <span className="text-gold-300 font-medium text-highlight">agentic AI workflows</span>{" "}
                  with LangGraph, I thrive on pushing the boundaries of what&apos;s possible
                  with machine learning and natural language processing.
                </p>
                <p>
                  As a Teaching Assistant, I&apos;ve had the privilege of mentoring students
                  across courses ranging from Programming Fundamentals to Artificial Intelligence,
                  deepening my own understanding while helping others grow.
                </p>
              </div>
            </AnimatedSection>

            {/* Highlight Cards */}
            <AnimatedSection delay={200}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
                {highlights.map((item) => (
                  <div key={item.label} className="gradient-border px-4 py-5 text-center card-hover card-shine">
                    <div className="text-xl font-bold gradient-text">{item.value}</div>
                    <div className="eyebrow text-[0.62rem] text-stone-500 mt-2">{item.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Photo strip */}
        <AnimatedSection delay={150}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
            {campusPhotos.map((photo) => (
              <div
                key={photo.src}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-gold-500/15 bg-stone-900"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 45vw, 260px"
                  className="object-cover grayscale-[55%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-40 pointer-events-none" />
              </div>
            ))}
          </div>
          <p className="eyebrow text-[0.62rem] text-stone-500 mt-4 text-center">
            On campus — FAST NUCES, Karachi
          </p>
        </AnimatedSection>
      </div>

      {/* Animated glowing separator */}
      <div className="glow-separator mt-24 mx-auto max-w-4xl" />
    </section>
  );
}
