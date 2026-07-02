import { cn } from "@/lib/utils";
import { coreSkills } from "@/config/site";

type ChipProps = {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
};

export function Chip({ children, className, accent = false }: ChipProps) {
  // Headline skills (PHP, Magento 2, Laravel, GraphQL, MySQL) always get accent styling.
  const isCore = typeof children === "string" && coreSkills.has(children);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs transition-colors",
        accent || isCore
          ? "border-accent/25 bg-accent-chip font-medium text-accent-strong dark:text-accent"
          : "border-line bg-surface text-muted hover:border-line-strong hover:text-foreground",
        className
      )}
    >
      {isCore ? <span className="size-1 rounded-full bg-accent" aria-hidden /> : null}
      {children}
    </span>
  );
}
