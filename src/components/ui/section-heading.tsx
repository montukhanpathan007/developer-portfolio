import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type SectionHeadingProps = {
  /** HTTP-route style eyebrow, e.g. "GET /about" — contact uses POST. */
  route: string;
  title: string;
  blurb?: string;
  className?: string;
};

export function SectionHeading({ route, title, blurb, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-12 max-w-2xl", className)}>
      <p className="mb-3 font-mono text-xs tracking-widest text-accent">
        <span className="mr-2 inline-block h-px w-6 translate-y-[-3px] bg-accent/60" aria-hidden />
        {route}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {blurb ? <p className="mt-4 text-base leading-relaxed text-muted">{blurb}</p> : null}
    </Reveal>
  );
}
