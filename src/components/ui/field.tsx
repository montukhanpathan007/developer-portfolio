import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("mb-1.5 block font-mono text-xs tracking-wide text-muted", className)}
      {...props}
    />
  );
}

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(fieldClasses, className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(fieldClasses, "min-h-32 resize-y", className)} {...props} />;
}
