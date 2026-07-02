import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const slots = [
  "Reserved for a teammate's words.",
  "Reserved for a project manager's words.",
  "Reserved for a client's words.",
];

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          route="GET /testimonials"
          title="What people say"
          blurb="Testimonials from colleagues and clients will land here — no invented quotes in the meantime."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {slots.map((note, i) => (
            <Reveal key={note} delay={i * 0.08}>
              <figure className="flex h-full flex-col items-start rounded-xl border border-dashed border-line-strong p-6">
                <Quote className="size-5 text-faint" aria-hidden />
                <blockquote className="mt-4 flex-1 text-sm italic text-faint">{note}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="size-9 rounded-full border border-dashed border-line-strong" aria-hidden />
                  <span className="font-mono text-[11px] text-faint">
                    name · role
                    <br />
                    coming soon
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
