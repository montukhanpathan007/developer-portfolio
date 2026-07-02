import { FileDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-5 py-10 sm:flex-row sm:justify-between sm:px-8">
        <div className="text-center sm:text-left">
          <p className="font-mono text-sm text-foreground">
            <span className="text-accent">~/</span>
            {siteConfig.initials.toLowerCase()}
          </p>
          <p className="mt-1 text-xs text-faint">
            © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js — served fast, like a
            good API.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-md p-2.5 text-muted transition-colors hover:text-accent"
          >
            <GithubIcon className="size-4.5" />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-md p-2.5 text-muted transition-colors hover:text-accent"
          >
            <LinkedinIcon className="size-4.5" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Email"
            className="rounded-md p-2.5 text-muted transition-colors hover:text-accent"
          >
            <Mail className="size-4.5" />
          </a>
          <a
            href={siteConfig.links.resume}
            download
            aria-label="Download resume"
            className="rounded-md p-2.5 text-muted transition-colors hover:text-accent"
          >
            <FileDown className="size-4.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
