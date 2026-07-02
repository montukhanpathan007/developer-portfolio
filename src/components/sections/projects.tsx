import { ArrowUpRight, FolderGit2, Lock } from "lucide-react";
import { projects, type Project } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {project.links.map((link) =>
        link.href ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs text-accent transition-colors hover:text-accent-strong"
          >
            {link.label} <ArrowUpRight className="size-3.5" />
          </a>
        ) : (
          <span
            key={link.label}
            className="inline-flex cursor-default items-center gap-1 font-mono text-xs text-faint"
            title="Client work — link available on request"
          >
            <Lock className="size-3" /> {link.label} · on request
          </span>
        )
      )}
    </div>
  );
}

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          route="GET /projects"
          title="Selected work"
          blurb="Production B2B commerce work and backend builds. Client codebases are private — happy to walk through the architecture on a call."
        />

        <div className="grid gap-5">
          {/* Featured: Magento B2B platform */}
          <Reveal>
            <article className="group rounded-xl border border-accent/30 bg-surface p-6 transition-all hover:border-accent/60 sm:p-8">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="font-mono text-xs tracking-widest text-accent">FEATURED</p>
                <FolderGit2 className="size-5 text-faint transition-colors group-hover:text-accent" />
              </div>
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                    {featured.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{featured.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featured.tech.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                  <div className="mt-6">
                    <ProjectLinks project={featured} />
                  </div>
                </div>
                {featured.metrics ? (
                  <dl className="grid content-start gap-3 sm:grid-cols-2">
                    {featured.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg border border-line bg-background p-4"
                      >
                        <dt className="order-2 mt-1 block text-xs text-muted">{m.label}</dt>
                        <dd className="font-mono text-xl font-semibold text-accent">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </div>
            </article>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {rest.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.08}>
                <article
                  className={cn(
                    "group flex h-full flex-col rounded-xl border border-line bg-surface p-6",
                    "transition-all hover:-translate-y-0.5 hover:border-line-strong"
                  )}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <FolderGit2 className="size-5 text-faint transition-colors group-hover:text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
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
