import Image from "next/image";
import { skillCategories } from "../data/profile";

const logoSkills = skillCategories
  .flatMap((category) => category.skills)
  .filter((skill) => skill.logo);

// Endless strip of technology logos under the hero.
export default function TechMarquee() {
  return (
    <div
      className="marquee relative bg-surface border-y border-gold-500/10 py-5"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-12 pr-12">
            {logoSkills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-2.5 whitespace-nowrap">
                <Image
                  src={`/logos/${skill.logo}.svg`}
                  alt=""
                  width={22}
                  height={22}
                  unoptimized
                  className="w-[22px] h-[22px] object-contain"
                />
                <span className="text-sm font-medium text-stone-400">{skill.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
