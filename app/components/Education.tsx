import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import StaggerContainer from "./StaggerContainer";

const courses = [
  "Operating Systems",
  "Data Structures",
  "Analysis of Algorithms",
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Recommendation Systems",
  "Networking",
  "Databases",
  "Natural Language Processing",
  "Computer Vision",
];

const certifications = [
  {
    title: "Cloud Computing Fundamentals",
    provider: "IBM",
    icon: "☁️",
  },
  {
    title: "Master in Data Science, Data Analytics & Data Analysis",
    provider: "Udemy",
    icon: "📊",
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Floating particles */}
      <div className="particle-dot" style={{ top: "10%", right: "15%" }} />
      <div className="particle-dot" style={{ top: "50%", left: "3%" }} />
      <div className="particle-dot" style={{ top: "80%", right: "8%" }} />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="Education"
          title="Academic"
          highlight="Background"
        />

        {/* University Card */}
        <AnimatedSection delay={100}>
          <div className="gradient-border p-6 sm:p-8 mb-8 card-hover card-shine">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/20 flex-shrink-0 animate-float">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-100">
                    FAST National University (NUCES)
                  </h3>
                  <p className="text-base text-cyan-400 font-medium mt-1">
                    Bachelor of Science — Artificial Intelligence
                  </p>
                  <p className="text-sm text-zinc-500 mt-1">
                    📍 Karachi, Pakistan
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm font-semibold text-cyan-400 animate-pulse-glow">
                  GPA: 3.26/4.0
                </span>
                <span className="text-sm text-zinc-500">
                  Aug 2022 — Aug 2026
                </span>
              </div>
            </div>

            {/* Dean's List */}
            <div className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-lg bg-amber-500/5 border border-amber-500/15">
              <span className="text-lg">🏆</span>
              <span className="text-sm text-amber-400 font-medium">
                Dean&apos;s List — 3.51 SGPA (2nd Semester)
              </span>
            </div>

            {/* Courses with stagger animation */}
            <div>
              <h4 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">
                Relevant Coursework
              </h4>
              <StaggerContainer className="flex flex-wrap gap-2">
                {courses.map((course) => (
                  <span key={course} className="skill-badge skill-badge-glow text-xs">
                    {course}
                  </span>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </AnimatedSection>

        {/* Certifications */}
        <AnimatedSection delay={200}>
          <h3 className="text-xl font-bold mb-5 text-zinc-200">
            Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, idx) => (
              <div
                key={cert.title}
                className="gradient-border p-5 card-hover card-shine flex items-start gap-4"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <span className="text-2xl flex-shrink-0 animate-float" style={{ animationDelay: `${idx * 0.5}s` }}>
                  {cert.icon}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1">{cert.provider}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* MLSA */}
        <AnimatedSection delay={300}>
          <div className="gradient-border p-5 mt-6 card-hover card-shine">
            <div className="flex items-center gap-4">
              <span className="text-2xl flex-shrink-0 animate-float" style={{ animationDelay: "1s" }}>🌐</span>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">
                  Microsoft Learn Student Ambassadors (MLSA)
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  FAST Karachi Chapter — Event management and community involvement
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Animated glowing separator */}
      <div className="glow-separator mt-24 mx-auto max-w-4xl" />
    </section>
  );
}
