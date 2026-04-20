import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";

const highlights = [
  { label: "GPA", value: "3.26/4.0", icon: "🎓" },
  { label: "Focus", value: "AI & ML", icon: "🤖" },
  { label: "Year", value: "Senior", icon: "📅" },
  { label: "Location", value: "Karachi", icon: "📍" },
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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
          {/* Text Content */}
          <AnimatedSection delay={100}>
            <div className="space-y-5 text-zinc-400 leading-relaxed text-base sm:text-lg">
              <p>
                I&apos;m a passionate {" "}
                <span className="text-zinc-200 font-medium text-highlight">Artificial Intelligence</span> student at
                FAST NUCES, Karachi. My journey in tech revolves around
                building intelligent systems that bridge the gap between theoretical AI
                and real-world applications.
              </p>
              <p>
                From developing{" "}
                <span className="text-cyan-400 font-medium text-highlight">hybrid resume-job matching systems</span>{" "}
                using LLMs to creating{" "}
                <span className="text-violet-400 font-medium text-highlight">agentic AI workflows</span>{" "}
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
          <AnimatedSection delay={200} direction="right">
            <div className="grid grid-cols-2 gap-3 min-w-[240px]">
              {highlights.map((item, idx) => (
                <div
                  key={item.label}
                  className="gradient-border p-4 text-center card-hover card-shine"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <div className="text-lg font-bold text-zinc-100">
                    {item.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Animated glowing separator */}
      <div className="glow-separator mt-24 mx-auto max-w-4xl" />
    </section>
  );
}
