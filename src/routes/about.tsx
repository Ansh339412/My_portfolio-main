import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type MouseEvent } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, Target, Heart, Lightbulb, Award, Rocket } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import workspaceImg from "@/assets/about-workspace.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Anshpreet Singh" },
      { name: "description", content: "Learn about Anshpreet Singh's journey, mission, and values as a Full Stack Developer." },
      { property: "og:title", content: "About — Anshpreet Singh" },
      { property: "og:description", content: "The story, mission, and values behind Anshpreet Singh's work." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const EASE = [0.22, 1, 0.36, 1] as const;

const timeline = [
  {
    year: "2020",
    title: "Started Coding Journey",
    description: "Began learning web development and fell in love with building things on the internet.",
  },
  {
    year: "2021",
    title: "Full Stack Foundations",
    description: "Completed an end-to-end full stack program with WhiteHat Jr, covering HTML, CSS, JavaScript, and core backend concepts.",
  },
  {
    year: "2022",
    title: "Built First Real-World Projects",
    description: "Developed responsive websites and began applying programming skills to practical, user-facing applications.",
  },
  {
    year: "2023",
    title: "Advanced Full Stack Development",
    description: "Expanded expertise in React, Node.js, databases, and modern web architecture through Google and Microsoft programs.",
  },
  {
    year: "2024",
    title: "Backend & Database Engineering",
    description: "Focused on SQL, NoSQL, REST APIs, authentication systems, and scalable backend solutions.",
  },
  {
    year: "2025",
    title: "B.Tech in Computer Science at LPU",
    description: "Actively building production-ready projects and strengthening software engineering skills at Lovely Professional University.",
  },
];

const values = [
  { icon: Target, title: "Precision", description: "Every line of code is intentional. No shortcuts, no compromises." },
  { icon: Heart, title: "Passion", description: "I genuinely love what I do. That energy translates into better products." },
  { icon: Lightbulb, title: "Innovation", description: "Always exploring new technologies and approaches to solve problems better." },
  { icon: Award, title: "Excellence", description: "Good enough is never enough. I strive for excellence in every detail." },
  { icon: Rocket, title: "Impact", description: "Building software that creates real value for real people." },
];

function TiltImage() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setT({ ry: (x - 0.5) * 10, rx: -(y - 0.5) * 10, mx: x * 100, my: y * 100 });
  };
  const onLeave = () => setT({ rx: 0, ry: 0, mx: 50, my: 50 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: EASE }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1000 }}
      className="group relative"
    >
      <motion.div
        animate={{ rotateX: t.rx, rotateY: t.ry, scale: t.rx || t.ry ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-2xl"
      >
        <img
          src={workspaceImg}
          alt="Modern developer workspace"
          className="block h-auto w-full"
          loading="lazy"
          width={1200}
          height={800}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${t.mx}% ${t.my}%, rgba(234,198,3,0.18), transparent 50%)`,
          }}
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: "radial-gradient(circle, rgba(234,198,3,0.35), transparent 70%)" }}
      />
    </motion.div>
  );
}

function SplitWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE, delay: delay + i * 0.08 }}
          >
            {word}
            {i < text.split(" ").length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function SpotlightCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50, active: false });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, active: true });
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos((p) => ({ ...p, active: false }))}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      whileHover={{ y: -10 }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-10 transition-colors hover:border-gold/50 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${pos.x}% ${pos.y}%, rgba(234,198,3,0.12), transparent 60%)`,
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

function ValueCard({ value, i }: { value: typeof values[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };
  const Icon = value.icon;
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay: i * 0.15 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors hover:border-gold/60"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at ${pos.x}% ${pos.y}%, rgba(234,198,3,0.14), transparent 60%)`,
        }}
      />
      <div className="relative">
        <div className="relative inline-flex">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-lg opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "rgba(234,198,3,0.5)" }}
          />
          <motion.div
            whileHover={{ rotate: 8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-charcoal"
          >
            <Icon className="h-5 w-5" />
          </motion.div>
        </div>
        <h3 className="mt-6 text-xl font-heading text-card-foreground">{value.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
      </div>
    </motion.div>
  );
}

function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 80%", "end 20%"] });
  const fillHeight = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 80,
    damping: 20,
  });

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-border bg-muted/30 py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(234,198,3,0.08), transparent 70%)" }}
      />
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Journey</p>
          <h2 className="mt-4 text-4xl font-heading text-foreground md:text-5xl">
            <SplitWords text="My Path" />
          </h2>
        </motion.div>
        <div ref={lineRef} className="relative mt-16">
          <div className="absolute left-5 top-0 h-full w-px bg-border md:left-5">
            <motion.div
              style={{ height: fillHeight }}
              className="w-px origin-top bg-gradient-to-b from-gold via-gold to-gold/40"
            />
          </div>
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, y: 40 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                className="relative flex gap-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 220, damping: 14, delay: i * 0.1 + 0.15 }}
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-charcoal shadow-[0_0_24px_rgba(234,198,3,0.5)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 animate-ping rounded-full bg-gold/40"
                    style={{ animationDuration: "2.4s", animationIterationCount: 1 }}
                  />
                  {item.year.slice(2)}
                </motion.div>
                <div className="pb-8">
                  <span className="text-sm font-semibold text-gold">{item.year}</span>
                  <h3 className="mt-1 text-xl font-heading text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  useInView(heroRef, { once: true });

  return (
    <main className="relative overflow-hidden">
      {/* Page-wide aurora */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <motion.div
          className="absolute -top-32 left-1/4 h-[40rem] w-[40rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(234,198,3,0.06), transparent 70%)" }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(234,198,3,0.05), transparent 70%)" }}
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center bg-muted/30 pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(234,198,3,0.08), transparent 70%)" }}
        />
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-gold"
          >
            About Me
          </motion.p>
          <h1 className="mt-4 max-w-3xl text-5xl font-heading text-foreground md:text-7xl">
            <SplitWords text="Building the Future, One Line at a Time" delay={0.15} />
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <TiltImage />
            <div>
              <h2 className="text-3xl font-heading text-foreground md:text-4xl">
                <SplitWords text="My Story" />
              </h2>
              {[
                "I'm Anshpreet Singh, a Full Stack Developer with a deep passion for creating elegant, high-performance web applications. My journey began with curiosity about how things work on the web, and has evolved into a career building products that matter.",
                "Over the years, I've worked with startups, agencies, and enterprise teams to deliver everything from MVPs to large-scale platforms. I believe great software is a blend of technical excellence, thoughtful design, and a deep understanding of user needs.",
                "When I'm not coding, you'll find me exploring new technologies, contributing to open source, or sharing knowledge with the developer community.",
              ].map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.6 + i * 0.15 }}
                  className={`${i === 0 ? "mt-6" : "mt-4"} leading-relaxed text-muted-foreground`}
                >
                  {p}
                </motion.p>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
              >
                <Link
                  to="/contact"
                  className="group relative mt-8 inline-flex items-center gap-2 text-sm font-medium text-gold transition-all hover:tracking-wider hover:text-gold-light"
                >
                  <span
                    aria-hidden
                    className="absolute -inset-3 -z-10 rounded-lg opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "rgba(234,198,3,0.25)" }}
                  />
                  Let&apos;s work together
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-border bg-muted/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <SpotlightCard delay={0}>
              <h3 className="text-2xl font-heading text-card-foreground">Mission</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                To craft digital experiences that are not only visually stunning but also robust, accessible, and performant. Every project is an opportunity to push boundaries and deliver value.
              </p>
            </SpotlightCard>
            <SpotlightCard delay={0.2}>
              <h3 className="text-2xl font-heading text-card-foreground">Vision</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                To be a trusted technology partner for businesses worldwide, known for delivering products that combine technical mastery with exceptional user experience.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(234,198,3,0.07), transparent 70%)" }}
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-sm font-semibold uppercase tracking-[0.25em] text-gold"
            >
              Core Values
            </motion.p>
            <h2 className="mt-4 text-4xl font-heading text-foreground md:text-5xl">
              <SplitWords text="What Drives Me" delay={0.2} />
            </h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <ValueCard key={value.title} value={value} i={i} />
            ))}
          </div>
        </div>
      </section>

      <TimelineSection />

      <Footer />
    </main>
  );
}
