import Link from "next/link";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { pageContainer } from "@/lib/layout";

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

const resourceLinks = [
  { href: "/blogs", label: "Blogs" },
  { href: "/resources?type=Roadmaps", label: "Roadmaps" },
  { href: "/resources?type=Cheatsheets", label: "Cheatsheets" },
  { href: "/resources?type=Notes", label: "Notes" },
  { href: "/resources?type=Guides", label: "Guides" },
  { href: "/resources?type=Tools", label: "Tools" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
];

const socialLinks = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-[rgba(5,8,22,0.95)] dark:bg-[rgba(5,8,22,0.95)] bg-card border-t border-border">
      <div className={`${pageContainer} py-12`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & Social */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-0 mb-4">
              <span className="text-xl font-bold text-black dark:text-white">Structro</span>
              <span className="text-xl font-bold text-accent">Tech</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted learning companion
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Learning */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Learning</h3>
            <ul className="space-y-2">
              {learningLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest articles and updates.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-white/5 border border-border rounded-lg text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 StructroTech. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <span>·</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
