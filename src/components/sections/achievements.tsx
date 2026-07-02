import { stats, statsFootnote } from "@/config/site";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";

export function Achievements() {
  return (
    <section
      id="achievements"
      aria-label="Career statistics"
      className="scroll-mt-20 border-t border-line bg-surface/60"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-20">
        <dl className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="text-center">
              <dd className="font-mono text-4xl font-semibold tracking-tight text-accent md:text-5xl">
                <Counter value={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix} />
              </dd>
              <dt className="mt-2 text-sm text-muted">{stat.label}</dt>
            </Reveal>
          ))}
        </dl>
        <Reveal delay={0.3}>
          <p className="mt-10 text-center font-mono text-xs text-faint">{statsFootnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
