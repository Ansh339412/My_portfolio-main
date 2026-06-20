"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

type BackToTopProps = {
  threshold?: number; // pixels scrolled before showing the button
  className?: string;
};

export default function BackToTop({ threshold = 600, className = "" }: BackToTopProps) {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    // run once so the button state is correct on load (e.g., deep links)
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const scrollToTop = () => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });

    // Move focus to the main content so keyboard & screen reader users land in a logical place.
    // Ensure your page has <main id="main" tabIndex={-1}> or role="main".
    const main = document.querySelector<HTMLElement>("main, #main, [role='main']");
    if (main) {
      // preventScroll keeps the browser from jumping while focus is set
      main.focus?.({ preventScroll: true });
    }
  };

  // simple motion variants
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          // use string states to align with variants
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={reduceMotion ? { hidden: { opacity: 1, scale: 1 }, visible: { opacity: 1, scale: 1 } } : variants}
          whileHover={!reduceMotion ? { scale: 1.08 } : undefined}
          whileTap={!reduceMotion ? { scale: 0.96 } : undefined}
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          className={
            "fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-colors hover:bg-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold " +
            className
          }
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
