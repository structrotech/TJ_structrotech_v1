"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { pageContainer } from "@/lib/layout";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/blogs", label: "Blogs" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About Us" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-[rgba(5,8,22,0.6)] dark:bg-[rgba(5,8,22,0.6)] bg-white/80 backdrop-blur-xl border-b border-border">
      <div className={cn(pageContainer, "flex items-center justify-between h-16 gap-4")}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0 shrink-0">
          <span className="text-xl font-bold text-foreground dark:text-white">Structro</span>
          <span className="text-xl font-bold text-accent">Tech</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6 xl:gap-8 flex-nowrap flex-1 px-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium whitespace-nowrap shrink-0 transition-colors relative py-1",
                pathname === link.href
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 shrink-0">
          <ThemeToggle />
          <Link
            href="/auth"
            className="hidden md:inline-flex px-4 py-2 text-sm font-medium rounded-full border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Sign Up
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-2xl font-medium transition-colors",
                  pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth"
              onClick={() => setIsOpen(false)}
              className="mt-4 px-6 py-3 text-lg font-medium rounded-full border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
