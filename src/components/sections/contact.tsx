"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { m, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  TriangleAlert,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/field";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

const emailjsReady = Boolean(
  emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey
);

type Status = "idle" | "sending" | "sent" | "error";
type FieldName = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(payload: Record<FieldName, string>): FieldErrors {
  const errors: FieldErrors = {};
  if (payload.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(payload.email)) errors.email = "That email address doesn't look right.";
  if (payload.subject.trim().length < 3) errors.subject = "A short subject helps me reply faster.";
  if (payload.message.trim().length < 10)
    errors.message = "Tell me a little more — at least a sentence.";
  return errors;
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
      <TriangleAlert className="size-3" aria-hidden />
      {children}
    </p>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const reduce = useReducedMotion();

  const clearError = (field: FieldName) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill the hidden field, humans never see it.
    if (data.get("company")) return;

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const fieldErrors = validate(payload);
    setErrors(fieldErrors);
    if (Object.values(fieldErrors).some(Boolean)) {
      const first = (["name", "email", "subject", "message"] as const).find(
        (f) => fieldErrors[f]
      );
      if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    if (!emailjsReady) {
      // EmailJS not configured yet — fall back to the visitor's mail client.
      const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`);
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        payload.subject || `Portfolio contact from ${payload.name}`
      )}&body=${body}`;
      return;
    }

    try {
      setStatus("sending");
      await emailjs.send(emailjsConfig.serviceId!, emailjsConfig.templateId!, payload, {
        publicKey: emailjsConfig.publicKey!,
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 border-t border-line"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          headingId="contact-heading"
          route="POST /contact"
          title="Let's talk backend"
          blurb="Hiring for a Magento 2, Laravel, or PHP role — or want a second pair of eyes on a B2B commerce problem? My inbox is open."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-6">
            <div className="space-y-4 text-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-muted transition-colors hover:text-accent"
              >
                <Mail className="size-4 text-accent" aria-hidden /> {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-muted transition-colors hover:text-accent"
              >
                <Phone className="size-4 text-accent" aria-hidden /> {siteConfig.phone}
              </a>
              <p className="flex items-center gap-3 text-muted">
                <MapPin className="size-4 text-accent" aria-hidden /> {siteConfig.location}
              </p>
            </div>

            <div className="flex gap-2">
              <Button href={siteConfig.links.github} external variant="outline" size="sm">
                <GithubIcon /> GitHub
              </Button>
              <Button href={siteConfig.links.linkedin} external variant="outline" size="sm">
                <LinkedinIcon /> LinkedIn
              </Button>
            </div>

            <div className="rounded-xl border border-line bg-code-bg p-4 font-mono text-xs leading-6 text-code-comment">
              <p>
                <span className="text-code-key">status</span>: open to backend roles
              </p>
              <p>
                <span className="text-code-key">timezone</span>: IST (UTC+5:30)
              </p>
              <p>
                <span className="text-code-key">response</span>: usually within 24h
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {status === "sent" ? (
              <m.div
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="flex h-full min-h-72 flex-col items-center justify-center rounded-xl border border-accent/30 bg-accent-soft p-8 text-center"
                role="status"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <CheckCircle2 className="size-7" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                  Message sent — 201 Created
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted">
                  Thanks for reaching out. I usually reply within 24 hours; check{" "}
                  <span className="font-mono text-xs">{siteConfig.email}</span> for my response.
                </p>
                <Button variant="outline" size="sm" className="mt-6" onClick={() => setStatus("idle")}>
                  Send another message
                </Button>
              </m.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-xl border border-line bg-surface p-6 sm:p-8"
              >
                <fieldset disabled={status === "sending"} className="group/form">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">name</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        onChange={() => clearError("name")}
                        className={cn(errors.name && "border-red-500/60")}
                      />
                      <FieldError id="name-error">{errors.name}</FieldError>
                    </div>
                    <div>
                      <Label htmlFor="email">email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@company.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        onChange={() => clearError("email")}
                        className={cn(errors.email && "border-red-500/60")}
                      />
                      <FieldError id="email-error">{errors.email}</FieldError>
                    </div>
                  </div>
                  <div className="mt-5">
                    <Label htmlFor="subject">subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      placeholder="Backend role / project inquiry"
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      onChange={() => clearError("subject")}
                      className={cn(errors.subject && "border-red-500/60")}
                    />
                    <FieldError id="subject-error">{errors.subject}</FieldError>
                  </div>
                  <div className="mt-5">
                    <Label htmlFor="message">message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="What are you building?"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      onChange={() => clearError("message")}
                      className={cn(errors.message && "border-red-500/60")}
                    />
                    <FieldError id="message-error">{errors.message}</FieldError>
                  </div>

                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="min-w-44 group-disabled/form:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="animate-spin" aria-hidden /> Sending…
                        </>
                      ) : (
                        <>
                          <Send aria-hidden /> Send message
                        </>
                      )}
                    </Button>
                    {status === "error" && (
                      <p className="flex items-center gap-2 text-sm text-red-500" role="alert">
                        <TriangleAlert className="size-4" aria-hidden />
                        Sending failed — email me directly at{" "}
                        <a href={`mailto:${siteConfig.email}`} className="underline">
                          {siteConfig.email}
                        </a>
                      </p>
                    )}
                    {!emailjsReady && status === "idle" && (
                      <p className="font-mono text-[11px] text-faint">
                        fallback: opens your mail client
                      </p>
                    )}
                  </div>
                </fieldset>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
