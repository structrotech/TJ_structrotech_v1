"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, Check, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const MENU_WIDTH = 212;

interface SortSelectProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  label?: string;
}

export function SortSelect({
  value,
  options,
  onChange,
  label = "Sort by",
}: SortSelectProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ bottom: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateMenuPosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const gap = 9;

    let left = rect.right - MENU_WIDTH;
    left = Math.max(12, Math.min(left, window.innerWidth - MENU_WIDTH - 12));

    // Pin menu bottom edge just above the trigger — opens upward
    setMenuPosition({
      bottom: window.innerHeight - rect.top + gap,
      left,
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    updateMenuPosition();
    const raf = requestAnimationFrame(updateMenuPosition);

    const handleReposition = () => updateMenuPosition();
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open, updateMenuPosition]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  const dropdownMenu =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <div
            style={{
              position: "fixed",
              bottom: menuPosition.bottom,
              left: menuPosition.left,
              width: MENU_WIDTH,
              zIndex: 9999,
            }}
          >
            <motion.div
              ref={menuRef}
              role="listbox"
              aria-label={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "bottom center" }}
              className="relative overflow-hidden rounded-xl border border-primary/20 bg-popover/95 shadow-[0_16px_40px_rgba(0,0,0,0.42),0_0_32px_rgba(139,92,246,0.14)] backdrop-blur-2xl"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-accent/5" />

              <div className="relative border-b border-border/60 px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {label}
                </p>
              </div>

              <ul className="relative p-1.5">
                {options.map((option) => {
                  const isActive = option === value;
                  return (
                    <li key={option} role="option" aria-selected={isActive}>
                      <button
                        type="button"
                        onClick={() => handleSelect(option)}
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-all duration-200",
                          isActive
                            ? "bg-primary/25 text-primary shadow-[inset_0_0_0_1px_rgba(139,92,246,0.35)]"
                            : "text-foreground hover:bg-white/8"
                        )}
                      >
                        <span className="truncate">{option}</span>
                        {isActive && <Check className="h-3.5 w-3.5 shrink-0" />}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div
                className="absolute -bottom-1.5 right-7 h-2.5 w-2.5 rotate-45 border-r border-b border-primary/25 bg-popover/95"
                aria-hidden
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${value}`}
        onClick={() => {
          setOpen((prev) => {
            const next = !prev;
            if (next) {
              requestAnimationFrame(updateMenuPosition);
            }
            return next;
          });
        }}
        className={cn(
          "group flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold text-foreground transition-all duration-300",
          "bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl",
          "border-border/80 shadow-[0_4px_24px_rgba(0,0,0,0.12)]",
          "hover:border-primary/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]",
          open && "border-primary/50 shadow-[0_0_24px_rgba(139,92,246,0.35)]"
        )}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
          <ArrowUpDown className="h-3.5 w-3.5" />
        </span>
        <span className="max-w-[120px] truncate sm:max-w-none">{value}</span>
        <ChevronUp
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-300",
            open && "text-primary",
            !open && "rotate-180"
          )}
        />
      </button>
      {dropdownMenu}
    </>
  );
}
