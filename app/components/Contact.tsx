import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import AskAIButton from "./AskAIButton";
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "./Icons";
import { profile } from "../data/profile";

const contactItems = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: <MailIcon className="w-5 h-5" />,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: profile.phoneHref,
    icon: <PhoneIcon className="w-5 h-5" />,
  },
  {
    label: "LinkedIn",
    value: profile.linkedinHandle,
    href: profile.linkedin,
    icon: <LinkedInIcon className="w-5 h-5" />,
  },
  {
    label: "GitHub",
    value: profile.githubHandle,
    href: profile.github,
    icon: <GitHubIcon className="w-5 h-5" />,
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
          <p className="text-stone-400 mb-12 max-w-xl -mt-8">
            I&apos;m always open to discussing new opportunities, collaborations,
            or just having a chat about AI and technology.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 items-stretch">
          {/* Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {contactItems.map((item, idx) => (
              <AnimatedSection key={item.label} delay={idx * 100}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.02] border border-gold-500/10 transition-all duration-300 group hover:border-gold-500/40 hover:bg-gold-500/[0.05] hover:shadow-[0_0_24px_rgba(212,175,55,0.1)] hover:-translate-y-1"
                  id={`contact-${item.label.toLowerCase()}`}
                >
                  <div className="p-3 rounded-lg bg-gold-500/[0.07] border border-gold-500/15 text-gold-300 transition-all duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="eyebrow text-[0.62rem] text-stone-500">
                      {item.label}
                    </div>
                    <div className="text-sm text-stone-200 font-medium truncate mt-1">
                      {item.value}
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA */}
          <AnimatedSection delay={300} direction="right" className="h-full">
            <div className="gradient-border h-full p-8 sm:p-10 card-shine flex flex-col justify-center">
              <p className="eyebrow mb-3">Available for work</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-100 leading-tight">
                Interested in{" "}
                <span className="font-display italic font-medium gradient-text">working together?</span>
              </h3>
              <p className="text-sm text-stone-400 mt-4 mb-7 max-w-md">
                Whether it&apos;s a research collaboration, project idea, or job opportunity
                I&apos;d love to hear from you.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-gold px-6 py-3 text-sm"
                  id="contact-cta"
                >
                  <MailIcon className="w-4 h-4" />
                  Send me an Email
                </a>
                <AskAIButton className="btn-outline px-6 py-3 text-sm" label="Ask my AI first" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
