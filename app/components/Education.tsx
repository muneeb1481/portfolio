import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import StaggerContainer from "./StaggerContainer";
import Parallax from "./Parallax";
import { education, certifications, activities } from "../data/profile";

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
          <div className="gradient-border mb-8 card-hover card-shine grid grid-cols-1 md:grid-cols-[1fr_15rem]">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <p className="eyebrow mb-2">{education.period}</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-100">
                    {education.university}
                  </h3>
                  <p className="text-base text-gold-300 font-medium mt-1">
                    {education.degree}
                  </p>
                  <p className="text-sm text-stone-500 mt-1">{education.location}</p>
                </div>
                <span className="self-start flex-shrink-0 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-sm font-semibold text-gold-300 animate-pulse-glow">
                  GPA: {education.gpa}
                </span>
              </div>

              {/* Dean's List */}
              <div className="flex items-center gap-3 mb-6 px-4 py-2.5 rounded-lg bg-gold-500/[0.06] border border-gold-500/20">
                <span className="w-1.5 h-1.5 rotate-45 bg-gold-400 flex-shrink-0" />
                <span className="text-sm text-gold-200 font-medium">
                  {education.honor}
                </span>
              </div>

              {/* Courses with stagger animation */}
              <div>
                <h4 className="eyebrow text-stone-400 mb-3">Relevant Coursework</h4>
                <StaggerContainer className="flex flex-wrap gap-2">
                  {education.courses.map((course) => (
                    <span key={course} className="skill-badge text-xs">
                      {course}
                    </span>
                  ))}
                </StaggerContainer>
              </div>
            </div>

            {/* Campus photo */}
            <div className="relative hidden md:block min-h-[20rem] overflow-hidden rounded-r-2xl">
              <Parallax amount={20} className="absolute -inset-y-5 inset-x-0">
                <Image
                  src="/photos/fast-entrance.jpeg"
                  alt="Muneeb Ur Rehman at the FAST University Karachi campus entrance"
                  fill
                  sizes="240px"
                  className="object-cover object-[50%_60%]"
                />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b09] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </AnimatedSection>

        {/* Certifications */}
        <AnimatedSection delay={200}>
          <h3 className="text-xl font-bold mb-5 text-stone-200">
            Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, idx) => (
              <div
                key={cert.title}
                className="gradient-border p-5 card-hover card-shine flex items-start gap-4"
              >
                <span className="font-display italic text-2xl gradient-text flex-shrink-0 leading-none pt-0.5">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-stone-200">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1">{cert.provider}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Activities */}
        <AnimatedSection delay={300}>
          {activities.map((activity) => (
            <div key={activity.title} className="gradient-border p-5 mt-6 card-hover card-shine">
              <div className="flex items-center gap-4">
                <span className="w-2 h-2 rotate-45 bg-gold-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-200">
                    {activity.title}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1">{activity.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </AnimatedSection>
      </div>

      {/* Animated glowing separator */}
      <div className="glow-separator mt-24 mx-auto max-w-4xl" />
    </section>
  );
}
