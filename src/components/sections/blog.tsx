import { NotebookPen } from "lucide-react";
import { blogPosts } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/motion/reveal";

export function Blog() {
  return (
    <section id="blog" aria-labelledby="blog-heading" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          headingId="blog-heading"
          route="GET /blog"
          title="Writing"
          blurb="Technical notes from the trenches — drafts in progress, publishing soon."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.title} delay={(i % 3) * 0.08}>
              <article className="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-line-strong">
                <div className="mb-4 flex items-center justify-between">
                  <Chip accent>{post.tag}</Chip>
                  <NotebookPen className="size-4 text-faint" />
                </div>
                <h3 className="font-display text-base font-semibold leading-snug tracking-tight text-foreground">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {post.description}
                </p>
                <p className="mt-4 border-t border-line pt-3 font-mono text-[11px] tracking-wide text-faint">
                  status: draft · coming soon
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
