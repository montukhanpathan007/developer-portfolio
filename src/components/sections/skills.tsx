import {
  Braces,
  Code2,
  Database,
  Layers,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skillGroups } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const groupIcons: Record<string, LucideIcon> = {
  languages: Code2,
  frameworks: Layers,
  databases: Database,
  backend: Braces,
  magento: ShoppingCart,
  tools: Wrench,
};

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          headingId="skills-heading"
          route="GET /skills"
          title="Technical skills"
          blurb="The stack I work with in production — Magento 2 expertise runs deepest, and the highlighted skills are my daily drivers."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = groupIcons[group.key] ?? Code2;
            const isMagento = group.key === "magento";
            return (
              <Reveal
                key={group.key}
                delay={(i % 3) * 0.08}
                className={cn(isMagento && "sm:col-span-2 lg:col-span-1 lg:row-span-2")}
              >
                <div
                  className={cn(
                    "group h-full rounded-xl border p-6 transition-all duration-300",
                    isMagento
                      ? "border-accent/30 bg-accent-soft hover:border-accent/50"
                      : "border-line bg-surface hover:border-line-strong hover:shadow-sm"
                  )}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-9 items-center justify-center rounded-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110",
                        isMagento
                          ? "bg-accent text-accent-foreground"
                          : "bg-surface-raised text-accent"
                      )}
                    >
                      <Icon className="size-4.5" aria-hidden />
                    </span>
                    <h3 className="font-medium text-foreground">{group.label}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Chip accent={isMagento}>{item}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
