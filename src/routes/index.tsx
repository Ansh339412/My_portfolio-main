import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Layers,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Database,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AnimatedCounter from "@/components/animated-counter";
import { FloatingParticles, Magnetic } from "@/components/premium-effects";
import heroBg from "@/assets/hero-bg.jpg";
import ctaBg from "@/assets/cta-bg.jpg";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anshpreet Singh — Full Stack Developer" },
      { name: "description", content: "Portfolio of Anshpreet Singh, a professional Full Stack Developer building modern, scalable web applications." },
      { property: "og:title", content: "Anshpreet Singh — Full Stack Developer" },
      { property: "og:description", content: "Building modern, scalable web applications with precision and passion." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

/* ---------------- HERO SECTION ---------------- */
const EASE = [0.22, 1, 0.36, 1] as const;
const NAME = "Anshpreet Singh";

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background image dimmed under pure-black aurora */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover opacity-25"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        {/* Animated mesh gradient */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 30%, rgba(234,198,3,0.18), transparent 60%), radial-gradient(50% 50% at 80% 70%, rgba(255,225,74,0.10), transparent 60%)",
          }}
        />
      </motion.div>

      <FloatingParticles count={22} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-8">
        <div className="max-w-3xl">
          {/* Letter-by-letter name reveal */}
          <h2 className="flex flex-wrap text-sm font-semibold uppercase tracking-[0.35em] text-gold" aria-label={NAME}>
            {NAME.split("").map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: EASE }}
                className="inline-block"
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
            className="mt-6 text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground"
          >
            Full Stack Developer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
            className="mt-4 text-5xl leading-[1.05] font-heading text-foreground md:text-7xl lg:text-8xl"
          >
            Crafting Digital{" "}
            <span className="text-gradient-gold">Excellence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: EASE }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            I build performant, scalable, and beautifully designed web applications that help businesses grow and users thrive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4, ease: EASE }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Magnetic>
              <Link
                to="/portfolio"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-gold px-7 py-3.5 text-sm font-semibold text-charcoal transition-all hover:gold-glow"
              >
                <span className="relative z-10">View My Work</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background/40 px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-gold hover:text-gold"
              >
                Get in Touch
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background/40 px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-gold hover:text-gold"
              >
                View Resume / CV
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
}

/* ---------------- STATS SECTION ---------------- */
function StatsSection() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
          <AnimatedCounter target={50} suffix="+" label="Projects Delivered" />
          <AnimatedCounter target={5} suffix="+" label="Years Experience" />
          <AnimatedCounter target={30} suffix="+" label="Happy Clients" />
          <AnimatedCounter target={99} suffix="%" label="Client Satisfaction" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES SECTION ---------------- */
const services = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description: "End-to-end application development with modern frameworks and scalable architecture.",
  },
  {
    icon: Globe,
    title: "Web Applications",
    description: "Responsive, high-performance web apps built with React, Next.js, and TypeScript.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Cross-platform mobile apps using React Native and modern native tooling.",
  },
  {
    icon: Database,
    title: "API & Backend",
    description: "Robust REST and GraphQL APIs with Node.js, PostgreSQL, and cloud infrastructure.",
  },
  {
    icon: Layers,
    title: "Mern stack",
    description: "Learn to create interactive codes with the help of the lastest mern stack\u00a0",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed audits, code splitting, caching strategies, and Core Web Vitals improvements.",
  },
];

function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">What I Do</p>
          <h2 className="mt-4 text-4xl font-heading text-foreground md:text-5xl">Services</h2>
          <p className="mt-4 text-muted-foreground">
            Comprehensive development services tailored to modern business needs.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-border bg-card p-8 transition-colors hover:border-gold/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-charcoal">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl font-heading text-card-foreground">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY CHOOSE ME SECTION ---------------- */
const reasons = [
  { icon: Shield, title: "Reliable & Secure", description: "Security-first approach with best practices, testing, and CI/CD pipelines." },
  { icon: Zap, title: "Lightning Fast", description: "Performance-optimized code that scores top marks on Lighthouse and Core Web Vitals." },
  { icon: Star, title: "Pixel Perfect", description: "Designs implemented with obsessive attention to detail and smooth animations." },
  { icon: Globe, title: "Global Delivery", description: "Remote-first workflow with clear communication and timezone flexibility." },
];

function WhyChooseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-muted/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Why Work With Me</p>
            <h2 className="mt-4 text-4xl font-heading text-foreground md:text-5xl">
              Quality That Speaks for Itself
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              I bring a blend of technical depth, design sensibility, and business understanding to every project. My goal is not just to ship code, but to deliver solutions that move the needle for your business.
            </p>
            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-light"
            >
              Learn More About Me
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <reason.icon className="h-6 w-6 text-gold" />
                <h3 className="mt-4 text-lg font-heading text-card-foreground">{reason.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CLIENT LOGOS CAROUSEL ---------------- */
const clientLogos = [
  "Vercel", "Stripe", "Linear", "Notion", "Figma", "Supabase", "Tailwind", "PlanetScale",
];

function LogoCarousel() {
  return (
    <section className="border-y border-border py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-8 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted Technologies & Platforms
        </p>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="flex animate-scroll gap-16 pr-16">
          {[...clientLogos, ...clientLogos, ...clientLogos].map((name, i) => (
            <div key={`${name}-${i}`} className="flex shrink-0 items-center gap-2 text-lg font-heading font-medium text-muted-foreground/60">
              <div className="h-8 w-8 rounded-md bg-muted" />
              {name}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CTO, TechStart Inc.",
    content: "Anshpreet delivered our platform ahead of schedule with exceptional code quality. His attention to performance and UX detail is remarkable.",
    rating: 5,
  },
  {
    name: "James Chen",
    role: "Product Lead, Finova",
    content: "Working with Anshpreet was seamless. He understood our complex requirements and built a scalable solution that our team loves.",
    rating: 5,
  },
  {
    name: "Priya Kapoor",
    role: "Founder, DesignHub",
    content: "The frontend he built for us is blazing fast and beautiful. Our conversion rate improved by 40% after the redesign.",
    rating: 5,
  },
];

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Testimonials</p>
          <h2 className="mt-4 text-4xl font-heading text-foreground md:text-5xl">What Clients Say</h2>
        </motion.div>

        <div className="mt-16 relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-border bg-card p-10 md:p-14 text-center"
          >
            <div className="flex justify-center gap-1">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-8 text-xl leading-relaxed text-card-foreground md:text-2xl">
              &ldquo;{testimonials[current].content}&rdquo;
            </p>
            <div className="mt-8">
              <p className="font-heading text-lg text-foreground">{testimonials[current].name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{testimonials[current].role}</p>
            </div>
          </motion.div>

          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA SECTION ---------------- */
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 z-0">
        <img src={ctaBg} alt="" className="h-full w-full object-cover opacity-30" loading="lazy" width={1920} height={600} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-8"
      >
        <h2 className="text-4xl font-heading text-foreground md:text-5xl lg:text-6xl">
          Let&apos;s Build Something{" "}
          <span className="text-gold">Extraordinary</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can bring your vision to life.
        </p>
        <div className="mt-10">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-md bg-foreground px-8 py-4 text-sm font-medium text-primary-foreground transition-all hover:bg-gold hover:text-charcoal"
          >
            Start a Conversation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- MAIN PAGE ---------------- */
function Index() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseSection />
      <LogoCarousel />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
