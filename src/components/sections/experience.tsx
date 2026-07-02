import { Briefcase, Sparkles } from "lucide-react";
import { experience } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-20 border-t border-line"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          headingId="experience-heading"
          route="GET /experience"
          title="Experience"
          blurb="Where the production miles come from."
        />

        <ol className="relative ml-1 space-y-14 pl-7 before:absolute before:bottom-2 before:left-0 before:top-2 before:w-px before:bg-gradient-to-b before:from-accent/50 before:via-line before:to-transparent sm:pl-9">
          {experience.map((job, i) => (
            <Reveal as="li" key={job.company} delay={i * 0.1} className="relative">
              <span
                className="absolute -left-[40px] top-0.5 flex size-[26px] items-center justify-center rounded-full border border-line bg-background sm:-left-[48px]"
                aria-hidden
              >
                {job.current ? (
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                    <span className="relative inline-flex size-2 rounded-full bg-accent" />
                  </span>
                ) : (
                  <span className="size-2 rounded-full bg-accent/60" />
                )}
              </span>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {job.role}
                </h3>
                <p
                  className={cn(
                    "rounded-full border px-3 py-0.5 font-mono text-[11px]",
                    job.current
                      ? "border-accent/30 bg-accent-chip text-accent-strong dark:text-accent"
                      : "border-line text-muted"
                  )}
                >
                  {job.period}
                </p>
              </div>
              <p className="mt-1.5 flex items-center gap-2 text-sm text-muted">
                <Briefcase className="size-3.5 text-faint" aria-hidden />
                {job.company} · {job.location}
              </p>

              {job.summary ? (
                <p className="mt-3 max-w-3xl text-sm text-muted">{job.summary}</p>
              ) : null}

              {/* Standout achievements get a highlighted card; the rest stay as a quiet list. */}
              <ul className="mt-5 max-w-3xl space-y-2.5">
                {job.highlights.map((h) => (
                  <li
                    key={h.slice(0, 32)}
                    className="flex gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-foreground/90"
                  >
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
              <ul className="mt-4 max-w-3xl space-y-2.5">
                {job.bullets.map((b) => (
                  <li key={b.slice(0, 32)} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-[9px] h-px w-3.5 shrink-0 bg-accent/50" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                {job.tags.map((t) => (
                  <li key={t}>
                    <Chip>{t}</Chip>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
