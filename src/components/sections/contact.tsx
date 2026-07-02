"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
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

const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

const emailjsReady = Boolean(
  emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey
);

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

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
    <section id="contact" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
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
                <Mail className="size-4 text-accent" /> {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-muted transition-colors hover:text-accent"
              >
                <Phone className="size-4 text-accent" /> {siteConfig.phone}
              </a>
              <p className="flex items-center gap-3 text-muted">
                <MapPin className="size-4 text-accent" /> {siteConfig.location}
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
            <form onSubmit={handleSubmit} className="rounded-xl border border-line bg-surface p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">name</Label>
                  <Input id="name" name="name" required autoComplete="name" placeholder="Your name" />
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
                  />
                </div>
              </div>
              <div className="mt-5">
                <Label htmlFor="subject">subject</Label>
                <Input id="subject" name="subject" required placeholder="Backend role / project inquiry" />
              </div>
              <div className="mt-5">
                <Label htmlFor="message">message</Label>
                <Textarea id="message" name="message" required placeholder="What are you building?" />
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
                <Button type="submit" disabled={status === "sending"} size="lg">
                  {status === "sending" ? (
                    <>
                      <Loader2 className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send /> Send message
                    </>
                  )}
                </Button>
                {status === "sent" && (
                  <p className="flex items-center gap-2 text-sm text-accent" role="status">
                    <CheckCircle2 className="size-4" /> Message sent — I&apos;ll reply soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-center gap-2 text-sm text-red-500" role="status">
                    <TriangleAlert className="size-4" /> Something broke — email me directly instead.
                  </p>
                )}
                {!emailjsReady && (
                  <p className="font-mono text-[11px] text-faint">
                    fallback: opens your mail client
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
