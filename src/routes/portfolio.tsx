import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ExternalLink } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Anshpreet Singh" },
      { name: "description", content: "Selected projects and case studies by Anshpreet Singh, Full Stack Developer." },
      { property: "og:title", content: "Portfolio — Anshpreet Singh" },
      { property: "og:description", content: "Explore selected projects and case studies." },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

const categories = ["All", "SaaS", "E-commerce", "Fintech", "Real Estate", "Analytics"];

const projects = [
  {
    id: 1,
    title: "CloudDash SaaS Platform",
    category: "SaaS",
    image: portfolio1,
    description: "A comprehensive SaaS dashboard for cloud infrastructure management with real-time monitoring, cost analytics, and team collaboration features.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    results: "Reduced client infrastructure costs by 35% and improved team productivity by 50%.",
    link: "#",
  },
  {
    id: 2,
    title: "LuxeMarket E-commerce",
    category: "E-commerce",
    image: portfolio2,
    description: "A premium e-commerce platform with advanced filtering, AI-powered recommendations, and seamless checkout experience.",
    tech: ["React", "Node.js", "Stripe", "MongoDB"],
    results: "Increased conversion rate by 42% and average order value by 28%.",
    link: "#",
  },
  {
    id: 3,
    title: "Finova Mobile Banking",
    category: "Fintech",
    image: portfolio3,
    description: "Cross-platform mobile banking app with biometric auth, real-time transactions, and intelligent spending insights.",
    tech: ["React Native", "Node.js", "Plaid API", "AWS"],
    results: "4.8 star rating on App Store with 100K+ downloads in first quarter.",
    link: "#",
  },
  {
    id: 4,
    title: "EstatePro Listings",
    category: "Real Estate",
    image: portfolio4,
    description: "Luxury real estate platform with virtual tours, interactive maps, and automated lead qualification.",
    tech: ["Next.js", "Mapbox", "Supabase", "Tailwind"],
    results: "Generated $2.5M in qualified leads for partner agencies.",
    link: "#",
  },
  {
    id: 5,
    title: "DataViz Analytics Suite",
    category: "Analytics",
    image: portfolio5,
    description: "Enterprise-grade analytics dashboard with custom visualizations, automated reporting, and data pipeline integration.",
    tech: ["React", "D3.js", "Python", "BigQuery"],
    results: "Reduced reporting time from days to minutes for enterprise clients.",
    link: "#",
  },
  {
    id: 6,
    title: "CreatorHub Platform",
    category: "SaaS",
    image: portfolio6,
    description: "Content management and monetization platform for creators with analytics, scheduling, and fan engagement tools.",
    tech: ["Next.js", "Prisma", "Stripe Connect", "Vercel"],
    results: "Enabled 500+ creators to monetize their content with $1M+ in payouts.",
    link: "#",
  },
];

function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Selected Work</p>
            <h1 className="mt-4 text-5xl font-heading text-foreground md:text-6xl">
              Portfolio &{" "}<span className="text-gold">Case Studies</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              A curated selection of projects that showcase my expertise in building modern web applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section ref={ref} className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-foreground text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      width={1200}
                      height={900}
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold">{project.category}</span>
                    <h3 className="mt-2 text-xl font-heading text-card-foreground">{project.title}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="aspect-video overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                  width={1200}
                  height={675}
                />
              </div>

              <div className="p-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold">{selectedProject.category}</span>
                <h2 className="mt-2 text-3xl font-heading text-card-foreground">{selectedProject.title}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{selectedProject.description}</p>

                <div className="mt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">Tech Stack</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 rounded-xl bg-gold/5 border border-gold/20 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">Results</h3>
                  <p className="mt-2 text-lg text-foreground">{selectedProject.results}</p>
                </div>

                <div className="mt-8">
                  <a
                    href={selectedProject.link}
                    className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold hover:text-charcoal"
                  >
                    View Project
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
