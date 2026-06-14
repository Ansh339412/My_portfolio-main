"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("cookie-consent");
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem("cookie-consent", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-2xl border border-border bg-card p-5 shadow-xl md:bottom-6 md:left-auto md:right-6"
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-sm text-card-foreground">
                This website uses cookies to enhance your experience. By continuing to browse, you agree to our use of cookies.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={dismiss}
                  className="rounded-md bg-foreground px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-gold hover:text-charcoal"
                >
                  Accept
                </button>
                <button
                  onClick={dismiss}
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Decline
                </button>
              </div>
            </div>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="mt-0.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
