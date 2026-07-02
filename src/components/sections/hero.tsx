"use client";

import { m, useReducedMotion, type Variants } from "framer-motion";
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
  const [firstName, ...restName] = siteConfig.name.split(" ");

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60rem_30rem_at_85%_-10%,var(--accent-soft),transparent_60%)]" />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-28 sm:px-8 sm:pt-32 md:pb-28 md:pt-40 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <m.div variants={container} initial={reduce ? "show" : "hidden"} animate="show">
          <m.p variants={item} className="mb-5 font-mono text-xs tracking-widest text-accent">
            {hero.eyebrow}
          </m.p>
          <m.h1
            variants={item}
            className="font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            {firstName}
            <br />
            {restName.join(" ")}
          </m.h1>
          <m.p
            variants={item}
            className="mt-6 max-w-xl text-lg font-medium leading-snug text-foreground sm:text-xl"
          >
            Backend Software Developer specializing in{" "}
            <span className="text-accent">Magento 2</span>,{" "}
            <span className="text-accent">Laravel</span> &{" "}
            <span className="text-accent">PHP</span>
          </m.p>
          <m.p variants={item} className="mt-4 max-w-xl leading-relaxed text-muted">
            {hero.intro}
          </m.p>

          <m.ul variants={item} className="mt-5 flex flex-wrap gap-x-5 gap-y-2" aria-label="Highlights">
            {hero.proof.map((point) => (
              <li key={point} className="flex items-center gap-2 font-mono text-xs text-muted">
                <span className="size-1 rounded-full bg-accent" aria-hidden />
                {point}
              </li>
            ))}
          </m.ul>

          <m.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              href="#projects"
              size="lg"
              className="shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30"
            >
              View projects <ArrowDown aria-hidden />
            </Button>
            <Button href={siteConfig.links.resume} download variant="outline" size="lg">
              <FileDown aria-hidden /> Download resume
            </Button>
            <Button href="#contact" variant="ghost" size="lg">
              Contact me
            </Button>
          </m.div>

          <m.div variants={item} className="mt-9 flex items-center gap-1">
            {socials.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="rounded-md p-2.5 text-muted transition-all hover:-translate-y-0.5 hover:bg-surface-raised hover:text-accent"
              >
                <Icon className="size-5" />
              </a>
            ))}
            <span className="ml-3 hidden font-mono text-xs text-faint sm:inline">
              {siteConfig.email}
            </span>
          </m.div>
        </m.div>

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
    <m.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: reduce ? 0 : 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="min-w-0"
      aria-hidden
    >
      <div className="rounded-xl border border-line bg-code-bg shadow-[0_1px_0_0_var(--line)_inset] transition-colors duration-300 hover:border-accent/40">
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-xs">
          <span className="text-muted">{endpoint}</span>
          <span className="flex items-center gap-1.5 text-accent">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            {status}
          </span>
        </div>
        <m.pre
          className="overflow-x-auto p-4 font-mono text-[13px] leading-6"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07, delayChildren: reduce ? 0 : 0.6 } },
          }}
          initial={reduce ? "show" : "hidden"}
          animate="show"
        >
          {query.map((line, i) => (
            <m.span key={`q-${i}`} variants={lineVariants} className="block text-code-comment">
              {line}
            </m.span>
          ))}
          <m.span variants={lineVariants} className="block">
            &nbsp;
          </m.span>
          <m.span variants={lineVariants} className="block text-muted">
            {"{"}
          </m.span>
          <m.span variants={lineVariants} className="block text-muted">
            {"  "}
            <span className="text-code-key">&quot;data&quot;</span>
            {": {"}
          </m.span>
          {response.map((field, fi) => {
            const comma = fi < response.length - 1 ? "," : "";
            return (
              <m.span key={field.key} variants={lineVariants} className="block text-muted">
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
              </m.span>
            );
          })}
          <m.span variants={lineVariants} className="block text-muted">
            {"  }"}
          </m.span>
          <m.span variants={lineVariants} className="block text-muted">
            {"}"}
            <span className="cursor-blink ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 bg-accent" />
          </m.span>
        </m.pre>
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-faint">
        response_time: fast — powered by query optimization & caching
      </p>
    </m.div>
  );
}
