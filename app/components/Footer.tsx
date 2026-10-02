import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";
import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-gold-500/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Name / Brand */}
          <div className="flex items-center gap-3">
            <span className="font-display italic text-xl gradient-text">Muneeb</span>
            <span className="text-sm text-stone-700">|</span>
            <span className="text-sm text-stone-500">{profile.role}</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-gold-300 transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-5 h-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-gold-300 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-stone-500 hover:text-gold-300 transition-colors"
              aria-label="Email"
            >
              <MailIcon className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-stone-600">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
