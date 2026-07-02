import { ArrowUpRight, FolderGit2, Lock, TrendingDown, TrendingUp } from "lucide-react";
import { projects, type Project, type ProjectMetric } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/motion/reveal";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.links.map((link) =>
        link.href ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex h-8 items-center gap-1.5 rounded-md border border-accent/40 px-3 font-mono text-xs text-accent transition-colors hover:border-accent hover:bg-accent-soft"
          >
            {link.label}
            <ArrowUpRight className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>
        ) : (
          <span
            key={link.label}
            className="inline-flex h-8 cursor-default items-center gap-1.5 rounded-md border border-dashed border-line-strong px-3 font-mono text-xs text-faint"
            title="Client work is private — link available on request"
          >
            <Lock className="size-3" aria-hidden />
            {link.label}
            <span className="text-faint/70">· on request</span>
          </span>
        )
      )}
    </div>
  );
}

function Metric({ metric }: { metric: ProjectMetric }) {
  const TrendIcon = metric.trend === "down" ? TrendingDown : TrendingUp;
  return (
    <div className="rounded-lg border border-line bg-background p-4 transition-colors hover:border-accent/40">
      <p className="flex items-center gap-1.5 font-mono text-xl font-semibold text-accent">
        {metric.trend ? <TrendIcon className="size-4" aria-hidden /> : null}
        {metric.value}
      </p>
      <p className="mt-1 text-xs leading-snug text-muted">{metric.label}</p>
    </div>
  );
}

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          headingId="projects-heading"
          route="GET /projects"
          title="Selected work"
          blurb="Production B2B commerce work and backend builds. Client codebases are private — happy to walk through the architecture on a call."
        />

        <div className="grid gap-5">
          {/* Featured: the Magento 2 B2B platform is the flagship. */}
          <Reveal>
            <article className="group relative overflow-hidden rounded-xl border border-accent/30 bg-surface p-6 transition-all duration-300 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/5 sm:p-8">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="font-mono text-xs tracking-widest text-accent">FEATURED</p>
                <FolderGit2 className="size-5 text-faint transition-colors group-hover:text-accent" aria-hidden />
              </div>
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {featured.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{featured.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
                    {featured.tech.map((t) => (
                      <li key={t}>
                        <Chip>{t}</Chip>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <ProjectLinks project={featured} />
                  </div>
                </div>
                {featured.metrics ? (
                  <div className="grid content-start gap-3 sm:grid-cols-2" role="list" aria-label="Impact metrics">
                    {featured.metrics.map((metric) => (
                      <div key={metric.label} role="listitem">
                        <Metric metric={metric} />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {rest.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.08}>
                <article className="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-md">
                  <div className="mb-4">
                    <FolderGit2 className="size-5 text-faint transition-colors group-hover:text-accent" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                    {project.tech.map((t) => (
                      <li key={t}>
                        <Chip>{t}</Chip>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 border-t border-line pt-4">
                    <ProjectLinks project={project} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
