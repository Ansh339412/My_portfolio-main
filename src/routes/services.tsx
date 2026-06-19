import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Code2,
  Globe,
  Smartphone,
  Database,
  Layers,
  Zap,
  X,
  Check,
  Clock,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AnimatedCounter from "@/components/animated-counter";
import { Magnetic } from "@/components/premium-effects";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Anshpreet Singh" },
      { name: "description", content: "Full stack development, web applications, mobile apps, API design, and UI/UX services by Anshpreet Singh." },
      { property: "og:title", content: "Services — Anshpreet Singh" },
      { property: "og:description", content: "Professional development services for modern businesses." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const EASE = [0.22, 1, 0.36, 1] as const;

type Service = {
  icon: typeof Code2;
  title: string;
  description: string;
  details: string[];
  technologies: string[];
  deliverables: string[];
  timeline: string;
  benefits: string[];
};

const services: Service[] = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description: "End-to-end application development from database schemas to fully responsive user interfaces. Production-ready web solutions, built to scale.",
    details: [
      "React, Next.js, and modern frontend frameworks",
      "Node.js, Express, and backend API services",
      "Database design (MongoDB, MySQL, PostgreSQL)",
      "RESTful API design and third-party integrations",
      "Secure authentication and user session management",
      "Deployment and hosting on Vercel, Render, or Railway",
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "TypeScript"],
    deliverables: ["Production-ready codebase", "CI/CD pipeline", "Documentation", "Deployment setup"],
    timeline: "4–8 weeks",
    benefits: ["One developer, one accountability", "Cohesive architecture", "Faster iteration"],
  },
  {
    icon: Globe,
    title: "Web Applications",
    description: "Custom, interactive web applications tailored to your requirements. Built around speed, scalability, and seamless user experiences.",
    details: [
      "Single-page applications (SPA)",
      "Server-side rendered (SSR) web applications",
      "Dynamic dashboards and data visualization",
      "Real-time communication using WebSockets",
      "Custom blog systems and content integration",
      "Responsive layout design for all devices",
    ],
    technologies: ["React", "TanStack", "Tailwind", "WebSockets", "Vite"],
    deliverables: ["Interactive UI", "Real-time features", "Admin dashboard", "Analytics hooks"],
    timeline: "3–6 weeks",
    benefits: ["Lightning-fast UX", "Scalable architecture", "SEO-friendly SSR"],
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly Web Apps",
    description: "Mobile-first responsive design ensuring your application looks and functions beautifully across all phones and tablets.",
    details: [
      "Mobile-responsive layout design",
      "Touch-friendly navigation and gestures",
      "Progressive Web App (PWA) features",
      "Cross-browser performance optimization",
      "Adaptive images and media scaling",
    ],
    technologies: ["PWA", "Responsive CSS", "Service Workers", "Touch APIs"],
    deliverables: ["Mobile-optimized layout", "PWA install support", "Offline mode", "Touch gestures"],
    timeline: "2–4 weeks",
    benefits: ["Reach mobile-first audiences", "Lower bounce rates", "App-like feel without app stores"],
  },
  {
    icon: Database,
    title: "Backend & APIs",
    description: "Robust, secure backend logic and databases to power your applications with optimal performance.",
    details: [
      "Server-side architecture and logic design",
      "Custom API endpoints and routing",
      "Database integration, queries, and optimization",
      "JWT and secure authentication",
      "Third-party service integrations (Stripe, Email, etc.)",
    ],
    technologies: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST", "JWT"],
    deliverables: ["RESTful API", "Schema design", "Auth system", "API docs"],
    timeline: "2–5 weeks",
    benefits: ["Secure by default", "Optimized queries", "Clear API contracts"],
  },
  {
    icon: Layers,
    title: "MERN Stack Development",
    description: "Comprehensive development using MongoDB, Express.js, React, and Node.js to create scalable, modern web experiences.",
    details: [
      "Full stack development using JavaScript/TypeScript",
      "State management and component-based design",
      "Database modeling and operations in MongoDB",
      "Efficient backend API routing with Express.js",
      "Seamless client-server data synchronization",
    ],
    technologies: ["MongoDB", "Express", "React", "Node.js", "TypeScript"],
    deliverables: ["End-to-end MERN app", "State management", "API + DB", "Deployed instance"],
    timeline: "4–7 weeks",
    benefits: ["Single language across stack", "Rapid prototyping", "Modern ecosystem"],
  },
  {
    icon: Zap,
    title: "Performance & SEO",
    description: "Speed audits and optimization techniques so your pages load instantly and rank well on search engines.",
    details: [
      "Core Web Vitals and performance optimization",
      "Semantic HTML and modern SEO best practices",
      "Image compression and lazy loading",
      "Optimized build bundling and asset loading",
      "Meta tags and search-engine-friendly routing",
    ],
    technologies: ["Lighthouse", "Web Vitals", "Schema.org", "Sitemap"],
    deliverables: ["Audit report", "Lighthouse 95+", "SEO meta", "Structured data"],
    timeline: "1–2 weeks",
    benefits: ["Higher search rankings", "Faster load times", "Better conversion"],
  },
];

/* ---------------- Word reveal ---------------- */
function WordReveal({ text, className, delay = 0, gold }: { text: string; className?: string; delay?: number; gold?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            initial={reduce ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: delay + i * 0.08 }}
            className={`inline-block ${gold ? "bg-gradient-to-r from-gold via-yellow-200 to-gold bg-[length:200%_100%] bg-clip-text text-transparent" : ""}`}
            style={gold ? { animation: "shimmer 4s ease-in-out infinite" } : undefined}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ---------------- Spotlight Service Card ---------------- */
function ServiceCard({ service, index, onOpen }: { service: Service; index: number; onOpen: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 80, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.12 }}
      whileHover={reduce ? {} : { y: -12 }}
      onMouseMove={handleMove}
      onClick={onOpen}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 backdrop-blur-sm transition-all duration-500 hover:border-gold/40 hover:shadow-[0_30px_80px_-20px_rgba(234,198,3,0.25)]"
    >
      {/* Cursor spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform([mx, my], ([x, y]: number[]) =>
            `radial-gradient(420px circle at ${x}px ${y}px, rgba(234,198,3,0.18), transparent 60%)`
          ),
        }}
      />

      {/* Sweeping gold beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        style={{ maskImage: "linear-gradient(black, black)" }}
      >
        <motion.div
          className="absolute -inset-y-10 -left-1/3 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-gold/[0.07] to-transparent blur-xl"
          animate={reduce ? {} : { x: ["0%", "400%"] }}
          transition={{ duration: 9, ease: "linear", repeat: Infinity, delay: index * 1.2 }}
        />
      </div>

      <div className="relative">
        <motion.div
          whileHover={reduce ? {} : { rotate: [0, -6, 6, 0], scale: 1.08 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex h-14 w-14 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold shadow-[0_0_30px_-6px_rgba(234,198,3,0.5)]"
        >
          <Icon className="h-6 w-6" />
        </motion.div>
        <h3 className="mt-6 text-xl font-heading text-foreground">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-gold">
          <span className="relative">
            View Details
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
          </span>
          <motion.span
            className="inline-flex"
            animate={reduce ? {} : {}}
            whileHover={{ x: 6 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Process Step ---------------- */
function ProcessStep({ step, title, desc, index, total, progress }: { step: string; title: string; desc: string; index: number; total: number; progress: number }) {
  const reduce = useReducedMotion();
  const active = progress > index / total;
  return (
    <motion.div
      initial={reduce ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative text-center"
    >
      <motion.div
        initial={reduce ? {} : { scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: index * 0.15 + 0.2 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        className={`relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border transition-all duration-500 ${
          active ? "border-gold bg-gold/10 shadow-[0_0_40px_-8px_rgba(234,198,3,0.7)]" : "border-white/15 bg-white/[0.02]"
        }`}
      >
        <span className={`text-2xl font-heading transition-colors ${active ? "text-gold" : "text-white/40"}`}>{step}</span>
      </motion.div>
      <h3 className="mt-6 text-xl font-heading text-foreground">{title}</h3>
      <motion.p
        className="mt-2 text-sm text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1"
      >
        {desc}
      </motion.p>
    </motion.div>
  );
}

function ServicesPage() {
  const reduce = useReducedMotion();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Scroll progress for the page
  const { scrollYProgress } = useScroll();
  const pageProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.3 });

  // Process timeline progress
  const processRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: processProgress } = useScroll({
    target: processRef,
    offset: ["start 80%", "end 30%"],
  });
  const lineHeight = useTransform(processProgress, [0, 1], ["0%", "100%"]);
  const [processVal, setProcessVal] = useState(0);
  useEffect(() => processProgress.on("change", setProcessVal), [processProgress]);

  return (
    <main className="relative bg-background">
      {/* Top scroll progress */}
      <motion.div
        style={{ scaleX: pageProgress, transformOrigin: "0% 50%" }}
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0"
      />

      <Navbar />

      {/* Ambient gold aurora */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-32 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-[140px]"
          animate={reduce ? {} : { opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-[500px] w-[700px] rounded-full bg-gold/[0.04] blur-[120px]"
          animate={reduce ? {} : { opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center pt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.p
              initial={reduce ? {} : { opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-xs font-semibold uppercase text-gold"
            >
              What I Offer
            </motion.p>
            <h1 className="mt-6 text-5xl font-heading text-foreground md:text-7xl">
              <WordReveal text="Services Built for" delay={0.2} />
              <br />
              <WordReveal text="Results" delay={0.7} gold />
            </h1>
            <motion.p
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
              className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground"
            >
              From concept to deployment, I deliver end-to-end development services that help businesses ship faster, scale better, and stand out.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} onOpen={() => setSelectedService(service)} />
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">By the Numbers</p>
            <h2 className="mt-4 text-4xl font-heading text-foreground md:text-5xl">Why Clients Choose Me</h2>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { target: 15, suffix: "+", label: "Projects Completed" },
              { target: 20, suffix: "+", label: "Technologies" },
              { target: 100, suffix: "%", label: "Responsive Designs" },
              { target: 24, suffix: "/7", label: "Learning & Building" },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={reduce ? {} : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center transition-all hover:border-gold/40 hover:shadow-[0_20px_60px_-20px_rgba(234,198,3,0.4)]"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gold/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <AnimatedCounter target={m.target} suffix={m.suffix} label={m.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section ref={processRef} className="relative border-y border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">Process</p>
            <h2 className="mt-4 text-4xl font-heading text-foreground md:text-5xl">How I Work</h2>
          </div>

          <div className="relative mt-20">
            {/* Animated connecting line (desktop) */}
            <div className="pointer-events-none absolute left-0 right-0 top-10 hidden md:block">
              <div className="relative mx-auto h-px w-[80%] bg-white/10">
                <motion.div
                  style={{ width: lineHeight }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/40 via-gold to-gold/40 shadow-[0_0_12px_rgba(234,198,3,0.6)]"
                />
              </div>
            </div>

            <div className="grid gap-12 md:grid-cols-4">
              {[
                { step: "01", title: "Discovery", desc: "Understanding your goals, users, and constraints." },
                { step: "02", title: "Strategy", desc: "Planning the architecture, tech stack, and timeline." },
                { step: "03", title: "Development", desc: "Building with regular demos and feedback loops." },
                { step: "04", title: "Launch", desc: "Deployment, monitoring, and ongoing support." },
              ].map((item, i, arr) => (
                <ProcessStep key={item.step} {...item} index={i} total={arr.length} progress={processVal} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-28 lg:py-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.08] blur-[140px]"
            animate={reduce ? {} : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-4xl font-heading text-foreground md:text-6xl">
            <WordReveal text="Ready to Start" />
            <br />
            <WordReveal text="Your Project?" delay={0.3} gold />
          </h2>
          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 text-lg text-muted-foreground"
          >
            Let&apos;s discuss how I can help bring your ideas to life.
          </motion.p>
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <Magnetic strength={0.3}>
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border-2 border-foreground bg-foreground px-10 py-5 text-sm font-semibold text-primary-foreground transition-all duration-500 hover:border-gold hover:bg-transparent hover:text-gold hover:shadow-[0_20px_50px_-10px_rgba(234,198,3,0.5)]"
              >
                <span className="relative z-10">Start a Conversation</span>
                <motion.span className="relative z-10 inline-flex" whileHover={{ x: 4 }}>
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </motion.span>
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gold/20 bg-card p-8 shadow-[0_30px_120px_-20px_rgba(234,198,3,0.3)]"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold shadow-[0_0_30px_-6px_rgba(234,198,3,0.5)]">
                <selectedService.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-2xl font-heading text-card-foreground md:text-3xl">{selectedService.title}</h2>
              <p className="mt-3 text-muted-foreground">{selectedService.description}</p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                    <Sparkles className="h-3.5 w-3.5" /> Key Technologies
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedService.technologies.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                    <Clock className="h-3.5 w-3.5" /> Estimated Timeline
                  </h3>
                  <p className="mt-3 text-lg font-heading text-foreground">{selectedService.timeline}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">What I Deliver</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {selectedService.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">Benefits</h3>
                <ul className="mt-4 space-y-2">
                  {selectedService.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">Capabilities</h3>
                <ul className="mt-4 space-y-2">
                  {selectedService.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  to="/contact"
                  onClick={() => setSelectedService(null)}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-6 py-4 text-sm font-semibold text-charcoal transition-all hover:shadow-[0_15px_40px_-10px_rgba(234,198,3,0.7)]"
                >
                  Get in Touch
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
