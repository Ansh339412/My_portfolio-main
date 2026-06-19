"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/* ---------- Scroll progress bar ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-transparent via-gold to-gold-light"
      aria-hidden
    />
  );
}

/* ---------- Cursor glow (desktop only) ---------- */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    let raf = 0;
    let x = 0, y = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      raf = 0;
      if (ref.current) ref.current.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);
  if (reduce) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[500px] w-[500px] rounded-full opacity-60 mix-blend-screen will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(234,198,3,0.18) 0%, rgba(234,198,3,0.06) 35%, transparent 70%)",
        filter: "blur(20px)",
      }}
    />
  );
}

/* ---------- Aurora background ---------- */
export function AuroraBackground() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <motion.div
        className="absolute -top-1/4 -left-1/4 h-[80vh] w-[80vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(234,198,3,0.18) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        animate={reduce ? undefined : { x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-1/4 h-[70vh] w-[70vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(240,215,140,0.12) 0%, transparent 60%)",
          filter: "blur(90px)",
        }}
        animate={reduce ? undefined : { x: [0, -60, 0], y: [0, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[60vh] w-[60vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(160,130,42,0.14) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, -50, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ---------- Floating golden particles ---------- */
export function FloatingParticles({ count = 18 }: { count?: number }) {
  const reduce = useReducedMotion();
  const [seeds, setSeeds] = useState<{ x: number; y: number; s: number; d: number; del: number }[]>([]);
  useEffect(() => {
    setSeeds(
      Array.from({ length: count }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 3 + 1.5,
        d: Math.random() * 8 + 8,
        del: Math.random() * 4,
      }))
    );
  }, [count]);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {seeds.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            boxShadow: "0 0 8px rgba(234,198,3,0.8)",
          }}
          animate={reduce ? undefined : { y: [0, -40, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: p.d, delay: p.del, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ---------- Magnetic button wrapper ---------- */
export function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => { el.style.transform = "translate(0,0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce, strength]);
  return (
    <span ref={ref} className="inline-block transition-transform duration-200 ease-out will-change-transform">
      {children}
    </span>
  );
}
