import { cn } from "@/lib/utils";

type ChipProps = {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
};

export function Chip({ children, className, accent = false }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs",
        accent
          ? "border-transparent bg-accent-chip text-accent-strong dark:text-accent"
          : "border-line bg-surface text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
