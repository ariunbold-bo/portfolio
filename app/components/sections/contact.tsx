import { contact } from "@/app/lib/content";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { Icon } from "../icons";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-32 pb-32">
      <Reveal variant="up">
        <SectionHeading
          label="Contact"
          title="Let's build something."
          description="Whether it's a software project or a hardware idea, I'm always open to discussing new opportunities."
        />
      </Reveal>

      <div className="mt-10 sm:mt-12 lg:mt-16">
        <Reveal
          variant="up"
          delay={100}
          className="flex flex-wrap gap-3 sm:gap-4"
        >
          {contact.map((link) => (
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

      <Reveal
        variant="fade"
        delay={300}
        className="mt-16 border-t border-[var(--border)] pt-8 text-center text-xs text-muted sm:mt-20 sm:text-sm lg:mt-24"
      >
        <p>
          © {new Date().getFullYear()} Ariunbold Bold. Built with React,
          Next.js, and plenty of coffee.
        </p>
      </Reveal>
    </section>
  );
}
