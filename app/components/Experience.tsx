import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { experiences } from "../data/profile";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Floating particles */}
      <div className="particle-dot" style={{ top: "25%", right: "5%" }} />
      <div className="particle-dot" style={{ top: "65%", left: "10%" }} />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="Experience"
          title="Professional"
          highlight="Journey"
        />

        {/* Timeline with animated vertical line */}
        <div className="relative pl-8 sm:pl-10">
          {/* Animated timeline line */}
          <div className="absolute left-[14px] sm:left-[18px] top-0 bottom-0 w-0.5 bg-white/5">
            <div className="timeline-animated visible" />
          </div>

          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <AnimatedSection key={exp.title + exp.company} delay={idx * 200} direction="left">
                <div className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[23px] sm:-left-[27px] top-7 w-3 h-3 rounded-full bg-gradient-to-br from-gold-200 to-gold-600 shadow-[0_0_14px_rgba(212,175,55,0.55)] z-10 ring-4 ring-[#0c0b09]" />

                  <div className="gradient-border p-6 sm:p-8 card-hover card-shine">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                      <div className="flex items-start gap-4">
                        <span className="font-display italic text-3xl gradient-text leading-none pt-1 flex-shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="text-xl font-bold text-stone-100">
                            {exp.title}
                          </h3>
                          <p className="text-sm text-gold-300 mt-0.5">
                            {exp.company}{" "}
                            <span className="text-stone-500">• {exp.type}</span>
                          </p>
                        </div>
                      </div>
                      <span className="self-start font-mono text-xs text-stone-400 flex-shrink-0 px-3 py-1.5 rounded-full bg-white/[0.03] border border-gold-500/15">
                        {exp.period}
                      </span>
                    </div>

                    {/* Points */}
                    <div className="space-y-4 pl-2">
                      {exp.points.map((point) => (
                        <div key={point.title} className="flex items-start gap-3 group">
                          <div className="w-1.5 h-1.5 rotate-45 bg-gold-500 mt-2 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                          <div>
                            <span className="text-sm font-semibold text-stone-200 text-highlight">
                              {point.title}:
                            </span>{" "}
                            <span className="text-sm text-stone-400">
                              {point.desc}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Animated glowing separator */}
      <div className="glow-separator mt-24 mx-auto max-w-4xl" />
    </section>
  );
}
