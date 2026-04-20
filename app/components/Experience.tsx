import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";

const experiences = [
  {
    title: "Agentic AI Intern",
    company: "Wellness Innovations",
    type: "Remote",
    period: "May 2025 — June 2025",
    color: "from-violet-500/20 to-violet-500/5",
    borderColor: "border-violet-500/20",
    dotColor: "bg-violet-500",
    icon: "🤖",
    points: [
      {
        title: "Automated Database Agent",
        desc: "Developed a fully automated database agent powered by large language models (LLMs) for seamless data interaction.",
      },
      {
        title: "Reflection Agent with LangGraph",
        desc: "Implemented a reflection agent using LangGraph's agentic workflow to enhance adaptability and self-improvement in AI systems.",
      },
    ],
  },
  {
    title: "Teaching Assistant",
    company: "FAST NUCES",
    type: "Karachi, Pakistan",
    period: "Jan 2025 — Dec 2025",
    color: "from-cyan-500/20 to-cyan-500/5",
    borderColor: "border-cyan-500/20",
    dotColor: "bg-cyan-500",
    icon: "📚",
    points: [
      {
        title: "Courses",
        desc: "Programming Fundamentals, Computer Organization and Assembly Language, Artificial Intelligence.",
      },
      {
        title: "Student Assessments",
        desc: "Reviewed and graded student assessments, ensuring fairness and academic standards across courses.",
      },
      {
        title: "Project Evaluations",
        desc: "Evaluated programming, systems-level, and AI projects, providing constructive feedback to strengthen problem-solving and technical understanding.",
      },
    ],
  },
];

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
                  <div className="absolute -left-8 sm:-left-10 top-6 w-3 h-3 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 shadow-[0_0_12px_rgba(6,182,212,0.4)] z-10 ring-4 ring-[#050508]" />

                  <div className="gradient-border p-6 sm:p-8 card-hover card-shine">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${exp.color} border ${exp.borderColor} flex-shrink-0`}
                        >
                          <span className="text-xl">{exp.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-zinc-100">
                            {exp.title}
                          </h3>
                          <p className="text-sm text-zinc-400 mt-0.5">
                            {exp.company}{" "}
                            <span className="text-zinc-600">• {exp.type}</span>
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-zinc-500 flex-shrink-0 font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        {exp.period}
                      </span>
                    </div>

                    {/* Points */}
                    <div className="space-y-4 pl-2">
                      {exp.points.map((point, pIdx) => (
                        <div key={point.title} className="flex items-start gap-3 group">
                          <div
                            className={`w-2 h-2 rounded-full ${exp.dotColor} mt-2 flex-shrink-0 opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_8px] transition-all duration-300`}
                            style={{ animationDelay: `${pIdx * 0.1}s` }}
                          />
                          <div>
                            <span className="text-sm font-semibold text-zinc-200 text-highlight">
                              {point.title}:
                            </span>{" "}
                            <span className="text-sm text-zinc-400">
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
