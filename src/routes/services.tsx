import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Globe,
  Smartphone,
  Database,
  Layers,
  Zap,
  Shield,
  X,
  Check,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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

const services = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description: "End-to-end application development from database schemas to fully responsive user interfaces. I build complete, production-ready web solutions.",
    details: [
      "React, Next.js, and modern frontend frameworks",
      "Node.js, Express, and backend API services",
      "Database design (MongoDB, MySQL, PostgreSQL)",
      "RESTful API design and third-party integrations",
      "Secure authentication and user session management",
      "Deployment and hosting on Vercel, Render, or Railway",
    ],
  },
  {
    icon: Globe,
    title: "Web Applications",
    description: "Custom, interactive web applications tailored to your specific requirements. Focus on speed, scalability, and seamless user experiences.",
    details: [
      "Single-page applications (SPA)",
      "Server-side rendered (SSR) web applications",
      "Dynamic dashboards and data visualization",
      "Real-time communication using WebSockets",
      "Custom blog systems and content integration",
      "Responsive layout design for all devices",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly Web Apps",
    description: "Mobile-first responsive design ensuring your application looks and functions beautifully across all smartphone and tablet screens.",
    details: [
      "Mobile-responsive layout design",
      "Touch-friendly navigation and gestures",
      "Progressive Web App (PWA) features",
      "Cross-browser performance optimization",
      "Adaptive images and media scaling",
    ],
  },
  {
    icon: Database,
    title: "Backend & APIs",
    description: "Robust, secure backend logic and databases to power your client applications with optimal performance.",
    details: [
      "Server-side architecture and logic design",
      "Custom API endpoints and routing",
      "Database integration, queries, and optimization",
      "JSON Web Token (JWT) and secure authentication",
      "Third-party service integrations (Stripe, Email, etc.)",
    ],
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
  },
  {
    icon: Zap,
    title: "Performance & SEO",
    description: "Speed audits and optimization techniques to ensure your web pages load instantly and rank well on search engines.",
    details: [
      "Core Web Vitals and performance optimization",
      "Semantic HTML and modern SEO best practices",
      "Image compression and lazy loading implementations",
      "Optimized build bundling and asset loading",
      "Meta tags and search-engine-friendly routing",
    ],
  },
];

function ServicesPage() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center bg-muted/30 pt-24">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-center mx-auto"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">What I Offer</p>
            <h1 className="mt-4 text-5xl font-heading text-foreground md:text-6xl">
              Services Built for{" "}<span className="text-gold">Results</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              From concept to deployment, I provide end-to-end development services that help businesses grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={ref} className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedService(service)}
                className="group cursor-pointer rounded-2xl border border-border bg-card p-8 transition-colors hover:border-gold/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-charcoal">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-heading text-card-foreground">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-gold">
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-border bg-muted/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Process</p>
            <h2 className="mt-4 text-4xl font-heading text-foreground md:text-5xl">How I Work</h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your goals, users, and constraints." },
              { step: "02", title: "Strategy", desc: "Planning the architecture, tech stack, and timeline." },
              { step: "03", title: "Development", desc: "Building with regular demos and feedback loops." },
              { step: "04", title: "Launch", desc: "Deployment, monitoring, and ongoing support." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <span className="text-5xl font-heading text-gold/30">{item.step}</span>
                <h3 className="mt-4 text-xl font-heading text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-4xl font-heading text-foreground md:text-5xl">
            Ready to Start Your Project?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Let&apos;s discuss how I can help bring your ideas to life.
          </p>
          <Link
            to="/contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-md bg-foreground px-8 py-4 text-sm font-medium text-primary-foreground transition-all hover:bg-gold hover:text-charcoal"
          >
            Start a Conversation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <selectedService.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-6 text-2xl font-heading text-card-foreground">{selectedService.title}</h2>
              <p className="mt-3 text-muted-foreground">{selectedService.description}</p>

              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">What I Learnt</h3>
                <ul className="mt-4 space-y-3">
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-gold/80"
                >
                  Get in Touch
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
