"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, FileDown, Mail } from "lucide-react";
import { hero, siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};

const socials = [
  { label: "GitHub", href: siteConfig.links.github, icon: GithubIcon, external: true },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedinIcon, external: true },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail, external: false },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60rem_30rem_at_85%_-10%,var(--accent-soft),transparent_60%)]" />
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-40 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          variants={container}
          initial={reduce ? "show" : "hidden"}
          animate="show"
        >
          <motion.p
            variants={item}
            className="mb-5 font-mono text-xs tracking-widest text-accent"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            {siteConfig.name.split(" ")[0]}
            <br />
            {siteConfig.name.split(" ").slice(1).join(" ")}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-lg font-medium text-foreground/90"
          >
            Backend Software Developer specializing in{" "}
            <span className="text-accent">Magento 2</span>,{" "}
            <span className="text-accent">Laravel</span> &{" "}
            <span className="text-accent">PHP</span>
          </motion.p>
          <motion.p variants={item} className="mt-4 max-w-xl leading-relaxed text-muted">
            {hero.intro}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#projects" size="lg">
              View projects <ArrowDown />
            </Button>
            <Button href={siteConfig.links.resume} download variant="outline" size="lg">
              <FileDown /> Download resume
            </Button>
            <Button href="#contact" variant="ghost" size="lg">
              Contact me
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-1">
            {socials.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="rounded-md p-2.5 text-muted transition-colors hover:bg-surface-raised hover:text-accent"
              >
                <Icon className="size-5" />
              </a>
            ))}
            <span className="ml-3 hidden font-mono text-xs text-faint sm:inline">
              {siteConfig.email}
            </span>
          </motion.div>
        </motion.div>

        <GraphqlPanel />
      </div>
    </section>
  );
}

/* Signature element: the developer introduced as a GraphQL response. */
function GraphqlPanel() {
  const reduce = useReducedMotion();
  const { endpoint, status, query, response } = hero.graphql;

  const lineVariants: Variants = {
    hidden: { opacity: 0, x: -6 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: reduce ? 0 : 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="min-w-0"
      aria-hidden
    >
      <div className="rounded-xl border border-line bg-code-bg shadow-[0_1px_0_0_var(--line)_inset]">
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-xs">
          <span className="text-muted">{endpoint}</span>
          <span className="flex items-center gap-1.5 text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            {status}
          </span>
        </div>
        <motion.pre
          className="overflow-x-auto p-4 font-mono text-[13px] leading-6"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: reduce ? 0 : 0.6 } } }}
          initial={reduce ? "show" : "hidden"}
          animate="show"
        >
          {query.map((line, i) => (
            <motion.span key={`q-${i}`} variants={lineVariants} className="block text-code-comment">
              {line}
            </motion.span>
          ))}
          <motion.span variants={lineVariants} className="block">
            &nbsp;
          </motion.span>
          <motion.span variants={lineVariants} className="block text-muted">
            {"{"}
          </motion.span>
          <motion.span variants={lineVariants} className="block text-muted">
            {"  "}
            <span className="text-code-key">&quot;data&quot;</span>
            {": {"}
          </motion.span>
          {response.map((field, fi) => {
            const comma = fi < response.length - 1 ? "," : "";
            return (
              <motion.span key={field.key} variants={lineVariants} className="block text-muted">
                {"    "}
                <span className="text-code-key">&quot;{field.key}&quot;</span>
                {": "}
                {field.type === "array" && Array.isArray(field.value) ? (
                  <>
                    {"["}
                    {field.value.map((v, i) => (
                      <span key={v}>
                        <span className="text-code-string">&quot;{v}&quot;</span>
                        {i < field.value.length - 1 ? ", " : ""}
                      </span>
                    ))}
                    {"]"}
                    {comma}
                  </>
                ) : (
                  <>
                    <span className="text-code-string">&quot;{field.value}&quot;</span>
                    {comma}
                  </>
                )}
              </motion.span>
            );
          })}
          <motion.span variants={lineVariants} className="block text-muted">
            {"  }"}
          </motion.span>
          <motion.span variants={lineVariants} className="block text-muted">
            {"}"}
            <span className="cursor-blink ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 bg-accent" />
          </motion.span>
        </motion.pre>
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-faint">
        response_time: fast — powered by query optimization & caching
      </p>
    </motion.div>
  );
}
