import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";

const contactItems = [
  {
    label: "Email",
    value: "muneeb.ur.rehm4n@gmail.com",
    href: "mailto:muneeb.ur.rehm4n@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    color: "hover:border-cyan-500/30 hover:bg-cyan-500/5",
    glowColor: "hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]",
  },
  {
    label: "Phone",
    value: "+92-318-2635995",
    href: "tel:+923182635995",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    color: "hover:border-emerald-500/30 hover:bg-emerald-500/5",
    glowColor: "hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]",
  },
  {
    label: "LinkedIn",
    value: "muneeb-ur-rehman-461843246",
    href: "https://linkedin.com/in/muneeb-ur-rehman-461843246",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "hover:border-blue-500/30 hover:bg-blue-500/5",
    glowColor: "hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]",
  },
  {
    label: "GitHub",
    value: "Muneeb1481",
    href: "https://github.com/Muneeb1481",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "hover:border-violet-500/30 hover:bg-violet-500/5",
    glowColor: "hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Floating particles */}
      <div className="particle-dot" style={{ top: "20%", right: "8%" }} />
      <div className="particle-dot" style={{ top: "70%", left: "5%" }} />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="Contact"
          title="Let's"
          highlight="Connect"
        />
        <AnimatedSection delay={50}>
          <p className="text-zinc-500 mb-12 max-w-xl -mt-8">
            I&apos;m always open to discussing new opportunities, collaborations,
            or just having a chat about AI and technology.
          </p>
        </AnimatedSection>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          {contactItems.map((item, idx) => (
            <AnimatedSection key={item.label} delay={idx * 100}>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`flex items-center gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] transition-all duration-300 group ${item.color} ${item.glowColor} hover:-translate-y-1`}
                id={`contact-${item.label.toLowerCase()}`}
              >
                <div className="p-3 rounded-lg bg-white/5 text-zinc-400 group-hover:text-zinc-200 transition-all duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-zinc-600 uppercase tracking-wider font-medium">
                    {item.label}
                  </div>
                  <div className="text-sm text-zinc-300 font-medium truncate mt-0.5">
                    {item.value}
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-zinc-700 ml-auto group-hover:text-zinc-400 transition-all duration-300 group-hover:translate-x-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={500}>
          <div className="mt-16 text-center">
            <div className="gradient-border inline-block p-8 sm:p-10 card-shine">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-zinc-100">
                Interested in working together?
              </h3>
              <p className="text-sm text-zinc-500 mb-6 max-w-md mx-auto">
                Whether it&apos;s a research collaboration, project idea, or job opportunity
                I&apos;d love to hear from you.
              </p>
              <a
                href="mailto:muneeb.ur.rehm4n@gmail.com"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 animate-gradient"
                id="contact-cta"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Send me an Email
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
