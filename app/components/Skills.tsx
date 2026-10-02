import Image from "next/image";
import type { ReactNode } from "react";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import StaggerContainer from "./StaggerContainer";
import { SparkIcon } from "./Icons";
import { skillCategories, type Skill } from "../data/profile";

const categoryIcons: Record<string, ReactNode> = {
  "AI & LLM": <SparkIcon className="w-5 h-5" />,
  Languages: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  Frameworks: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25L12 17.25 2.25 12l4.179-2.25m11.142 0l4.179 2.25L12 22.5l-9.75-5.25 4.179-2.25" />
    </svg>
  ),
  Tools: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.66 5.66a2.12 2.12 0 01-3-3l5.66-5.66m3-3l5.66-5.66a2.12 2.12 0 013 3l-5.66 5.66m-3 3l-3-3" />
    </svg>
  ),
  Platforms: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008V18m-3 0h.008v.008h-.008V18m-3 0h.008v.008h-.008V18m-3 0h.008v.008h-.008V18m-3 0h.008v.008h-.008V18" />
    </svg>
  ),
  "Soft Skills": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
};

function TechTile({ skill }: { skill: Skill }) {
  return (
    <div className="tech-tile" title={skill.name}>
      <div className="tech-tile-icon">
        {skill.logo ? (
          <Image
            src={`/logos/${skill.logo}.svg`}
            alt=""
            width={28}
            height={28}
            unoptimized
            className="w-7 h-7 object-contain"
          />
        ) : (
          <span className="font-mono text-[0.62rem] font-semibold tracking-wider text-gold-300">
            {skill.abbr}
          </span>
        )}
      </div>
      <span className="tech-tile-label">{skill.name}</span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Floating particles */}
      <div className="particle-dot" style={{ top: "20%", left: "8%" }} />
      <div className="particle-dot" style={{ top: "70%", right: "12%" }} />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="Skills"
          title="Technologies I"
          highlight="Work With"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {skillCategories.map((category, idx) => (
            <AnimatedSection key={category.title} delay={idx * 100} direction="scale" className="h-full">
              <div className="gradient-border p-6 h-full card-hover card-shine">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-gradient-to-br from-gold-500/20 to-gold-500/5 border border-gold-500/25 text-gold-300">
                    {categoryIcons[category.title]}
                  </div>
                  <h3 className="text-lg font-semibold text-stone-100">
                    {category.title}
                  </h3>
                  <span className="ml-auto font-mono text-xs text-stone-600">
                    {String(category.skills.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Skills with stagger */}
                {category.display === "logos" ? (
                  <StaggerContainer className="flex flex-wrap gap-x-2.5 gap-y-4">
                    {category.skills.map((skill) => (
                      <TechTile key={skill.name} skill={skill} />
                    ))}
                  </StaggerContainer>
                ) : (
                  <StaggerContainer className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill.name} className="skill-badge">
                        {skill.name}
                      </span>
                    ))}
                  </StaggerContainer>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Animated glowing separator */}
      <div className="glow-separator mt-24 mx-auto max-w-4xl" />
    </section>
  );
}
