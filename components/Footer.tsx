"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { footerContainer } from "@/lib/layout";

const learningLinks = [
  { href: "/categories/ai", label: "AI" },
  { href: "/categories/cybersecurity", label: "Cybersecurity" },
  { href: "/categories/linux", label: "Linux" },
  { href: "/categories/networking", label: "Networking" },
  { href: "/categories/web-development", label: "Web Development" },
  { href: "/categories/cloud", label: "Cloud" },
  { href: "/categories/devops", label: "DevOps" },
  { href: "/categories/tools", label: "Tools" },
];

const productLinks = [
  { href: "/blogs", label: "Blogs" },
  { href: "/resources?type=Roadmaps", label: "Roadmaps" },
  { href: "/resources?type=Cheatsheets", label: "Cheatsheets" },
  { href: "/resources?type=Notes", label: "Notes" },
  { href: "/resources?type=Guides", label: "Guides" },
  { href: "/resources?type=Tools", label: "Tools" },
];

const socialLinks = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer
      className="w-full border-t border-black/[0.06] bg-[#f0ebe4] py-16 dark:border-white/[0.06] dark:bg-[#0a0a0f]"
    >
      <div className={footerContainer}>
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4 lg:gap-12">
          {/* Column 1 — Brand */}
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="mb-4 flex items-center gap-2.5">
              <Image
                src="/icon.svg"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 shrink-0"
              />
              <span className="text-xl font-bold leading-none">
                <span className="text-foreground dark:text-white">Structro</span>
                <span className="text-primary">Tech</span>
              </span>
            </Link>
            <p className="mb-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your trusted learning companion for technology. Learn, build and grow
              with StructroTech.
            </p>
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-[0_0_16px_rgba(139,92,246,0.45)]"
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Learning */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="mb-4 text-sm font-bold text-foreground">Learning</h3>
            <ul className="space-y-2.5">
              {learningLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Our Products */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="mb-4 text-sm font-bold text-foreground">Our Products</h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Newsletter */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="mb-3 text-sm font-bold text-foreground">Newsletter</h3>
            <p className="mb-4 max-w-xs text-sm text-muted-foreground">
              Get the latest articles, resources and updates.
            </p>
            <form
              className="w-full max-w-sm"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <div className="flex w-full items-center gap-2 rounded-full border border-border bg-card/80 p-1.5 pl-4 dark:bg-white/5">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Newsletter integration coming soon
              </p>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/[0.06] pt-8 text-center dark:border-white/[0.06] md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 StructroTech All rights reserved
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground md:justify-end">
            <Link href="/privacy" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="transition-colors hover:text-primary">
              Terms of Service
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/disclaimer" className="transition-colors hover:text-primary">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
