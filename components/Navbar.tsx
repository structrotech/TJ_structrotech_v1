"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="fixed top-3 left-4 right-4 z-50">
        <nav
          className={cn(
            "rounded-full border backdrop-blur-xl shadow-lg overflow-hidden",
            "bg-[#f5f0eb]/95 border-black/10",
            "dark:bg-[#0f1117]/80 dark:border-white/10"
          )}
          aria-label="Main navigation"
        >
          <div className="flex h-14 md:h-[4.25rem] items-center justify-between gap-3 px-5 md:px-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex shrink-0 items-center gap-0"
              onClick={closeMenu}
            >
              <span className="text-lg font-bold text-foreground md:text-xl dark:text-white">
                Structro
              </span>
              <span className="text-lg font-bold text-accent md:text-xl">Tech</span>
            </Link>

            {/* Desktop links — center */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative whitespace-nowrap py-1 text-sm font-medium transition-colors",
                      isActive
                        ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right — toggle + sign up + hamburger */}
            <div className="flex shrink-0 items-center justify-end gap-2 md:gap-3">
              <ThemeToggle />
              <Link
                href="/auth"
                className="hidden md:inline-flex items-center rounded-full border border-accent px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Sign Up
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="rounded-lg p-2 text-foreground transition-colors hover:bg-white/10 md:hidden dark:hover:bg-white/10"
                aria-label="Open menu"
                aria-expanded={isOpen}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[99] bg-black/60 md:hidden"
              aria-label="Close menu"
              onClick={closeMenu}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "fixed inset-0 z-[100] flex h-full w-full flex-col overflow-hidden md:hidden",
                "bg-[#f5f0eb] dark:bg-[#0f1117]"
              )}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <button
                type="button"
                onClick={closeMenu}
                className="absolute top-6 right-6 rounded-lg p-2 text-foreground transition-colors hover:bg-black/10 dark:hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="h-7 w-7" />
              </button>

              <div className="flex flex-1 flex-col items-center justify-center px-6">
                <nav className="flex w-full max-w-sm flex-col">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className={cn(
                          "w-full py-4 text-center text-xl font-medium transition-colors",
                          isActive
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                <Link
                  href="/auth"
                  onClick={closeMenu}
                  className="mt-6 inline-flex items-center rounded-full border border-accent px-8 py-3 text-lg font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Sign Up
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
