import { CheckCircle2, GraduationCap } from "lucide-react";
import { about, education } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          headingId="about-heading"
          route="GET /about"
          title="Backend engineering, done properly"
          blurb="The professional story so far — and what I actually work on day to day."
        />

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="space-y-5 leading-relaxed text-muted">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-line bg-surface p-6">
                <h3 className="mb-4 font-mono text-xs tracking-widest text-accent">
                  B2B_SPECIALTIES
                </h3>
                <ul className="grid gap-2.5">
                  {about.specialties.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm text-foreground/90">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="rounded-xl border border-line bg-surface p-6">
                <h3 className="mb-3 flex items-center gap-2 font-mono text-xs tracking-widest text-accent">
                  <GraduationCap className="size-4" /> EDUCATION
                </h3>
                <p className="text-sm font-medium text-foreground">{education.degree}</p>
                <p className="mt-1 text-sm text-muted">{education.school}</p>
                <p className="mt-1 font-mono text-xs text-faint">
                  {education.period} · {education.detail}
                </p>
                <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                  {education.certifications.map((c) => (
                    <li key={c} className="text-xs text-muted">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
