import { Dictionary } from '@/app/lib/types';
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { Icon } from "../icons";

export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" className="scroll-mt-32 pb-32">
      <Reveal variant="up">
        <SectionHeading
          label={dict.ui.contactLabel}
          title={dict.ui.contactTitle}
          description={dict.ui.contactDesc}
        />
      </Reveal>

      <div className="mt-10 sm:mt-12 lg:mt-16">
        <Reveal
          variant="up"
          delay={100}
          className="flex flex-wrap gap-3 sm:gap-4"
        >
          {dict.contact.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group flex w-full items-center gap-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-4 transition-all duration-300 hover:border-accent hover:bg-[var(--surface)] active:scale-[0.98] sm:w-auto sm:rounded-full sm:px-6 sm:py-3 hover:-translate-y-1 hover:shadow-[var(--shadow)] touch-manipulation"
            >
              <Icon
                name={link.icon}
                className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-accent"
              />
              <div className="flex min-w-0 flex-col">
                <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted group-hover:text-accent sm:text-xs">
                  {link.label}
                </span>
                <span className="truncate text-sm font-medium text-ink-strong">
                  {link.value}
                </span>
              </div>
            </a>
          ))}
        </Reveal>
      </div>

      {/* ── Resume ── */}
      <Reveal variant="up" delay={200} className="mt-10 sm:mt-12">
        <div className="flex items-center justify-between gap-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-5 sm:p-6 flex-wrap">
          <div className="flex items-center gap-4 min-w-0">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--accent)]/10 text-accent">
              <Icon name="doc" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-strong">Résumé</p>
              <p className="text-xs text-muted">resume.pdf · {dict.identity.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={dict.identity.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <Icon name="external" className="h-4 w-4" />
              {dict.ui.viewResume}
            </a>
            <a
              href={dict.identity.resumeUrl}
              download
              className="btn btn-download"
            >
              <Icon name="download" className="h-4 w-4" />
              {dict.ui.downloadResume}
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal
        variant="fade"
        delay={300}
        className="mt-16 border-t border-[var(--border)] pt-8 text-center text-xs text-muted sm:mt-20 sm:text-sm lg:mt-24"
      >
        <p>
          {dict.ui.footer.replace("{year}", new Date().getFullYear().toString())}
        </p>
      </Reveal>
    </section>
  );
}
