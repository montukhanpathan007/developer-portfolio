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
    <section id="skills" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          route="GET /skills"
          title="Technical skills"
          blurb="The stack I work with in production — Magento 2 expertise runs deepest."
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
                    "h-full rounded-xl border p-6 transition-colors",
                    isMagento
                      ? "border-accent/30 bg-accent-soft"
                      : "border-line bg-surface hover:border-line-strong"
                  )}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-9 items-center justify-center rounded-lg",
                        isMagento ? "bg-accent text-accent-foreground" : "bg-surface-raised text-accent"
                      )}
                    >
                      <Icon className="size-4.5" />
                    </span>
                    <h3 className="font-medium text-foreground">{group.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Chip key={item} accent={isMagento}>
                        {item}
                      </Chip>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
