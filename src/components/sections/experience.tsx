import { Briefcase } from "lucide-react";
import { experience } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/motion/reveal";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          route="GET /experience"
          title="Experience"
          blurb="Where the production miles come from."
        />

        <ol className="relative ml-1 space-y-12 border-l border-line pl-8">
          {experience.map((job, i) => (
            <Reveal as="li" key={job.company} delay={i * 0.1} className="relative">
              <span
                className="absolute -left-[41px] flex size-[26px] items-center justify-center rounded-full border border-line bg-background"
                aria-hidden
              >
                <span className="size-2 rounded-full bg-accent" />
              </span>

              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                  {job.role}
                </h3>
                <p className="font-mono text-xs text-accent">{job.period}</p>
              </div>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                <Briefcase className="size-3.5 text-faint" />
                {job.company} · {job.location}
              </p>

              {job.summary ? (
                <p className="mt-3 text-sm font-medium text-foreground/85">{job.summary}</p>
              ) : null}

              <ul className="mt-4 space-y-2.5">
                {job.bullets.map((b) => (
                  <li key={b.slice(0, 32)} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-[9px] h-px w-3.5 shrink-0 bg-accent/50" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
