import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { posts } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Anshpreet Singh" },
      {
        name: "description",
        content:
          "Insights, tutorials, and thoughts on web development, design, and technology by Anshpreet Singh.",
      },
      { property: "og:title", content: "Blog — Anshpreet Singh" },
      {
        property: "og:description",
        content: "Insights and tutorials on modern web development.",
      },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const allTags = [
  "React",
  "Next.js",
  "TypeScript",
  "Performance",
  "Architecture",
  "Career",
];

const categoryStyles: Record<
  string,
  { bg: string; text: string; ring: string; glow: string }
> = {
  Architecture: {
    bg: "bg-[#f5c84c]/15",
    text: "text-[#f5c84c]",
    ring: "ring-1 ring-[#f5c84c]/40",
    glow: "shadow-[0_0_24px_-6px_rgba(245,200,76,0.55)]",
  },
  "Next.js": {
    bg: "bg-sky-400/10",
    text: "text-sky-300",
    ring: "ring-1 ring-sky-400/40",
    glow: "shadow-[0_0_24px_-6px_rgba(56,189,248,0.5)]",
  },
  Performance: {
    bg: "bg-emerald-400/10",
    text: "text-emerald-300",
    ring: "ring-1 ring-emerald-400/40",
    glow: "shadow-[0_0_24px_-6px_rgba(52,211,153,0.5)]",
  },
  TypeScript: {
    bg: "bg-blue-400/10",
    text: "text-blue-300",
    ring: "ring-1 ring-blue-400/40",
    glow: "shadow-[0_0_24px_-6px_rgba(96,165,250,0.5)]",
  },
  Career: {
    bg: "bg-fuchsia-400/10",
    text: "text-fuchsia-300",
    ring: "ring-1 ring-fuchsia-400/40",
    glow: "shadow-[0_0_24px_-6px_rgba(232,121,249,0.5)]",
  },
  React: {
    bg: "bg-cyan-400/10",
    text: "text-cyan-300",
    ring: "ring-1 ring-cyan-400/40",
    glow: "shadow-[0_0_24px_-6px_rgba(34,211,238,0.5)]",
  },
};

function getCategoryStyle(category: string) {
  return (
    categoryStyles[category] ?? {
      bg: "bg-[#f5c84c]/15",
      text: "text-[#f5c84c]",
      ring: "ring-1 ring-[#f5c84c]/40",
      glow: "shadow-[0_0_24px_-6px_rgba(245,200,76,0.55)]",
    }
  );
}

function AmbientGlow() {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute top-1/4 left-1/4 h-[420px] w-[420px] rounded-full bg-[#f5c84c] opacity-[0.12] blur-[110px]"
        animate={
          reduce
            ? undefined
            : { x: [0, 80, 0, -80, 0], y: [0, -50, -100, -50, 0] }
        }
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 h-[480px] w-[480px] rounded-full bg-amber-400 opacity-[0.10] blur-[120px]"
        animate={
          reduce
            ? undefined
            : { x: [0, -80, 0, 80, 0], y: [0, 50, 100, 50, 0] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-[380px] w-[380px] rounded-full bg-[#f5c84c] opacity-[0.08] blur-[100px]"
        animate={
          reduce
            ? undefined
            : { x: [0, 60, 0, -60, 0], y: [0, -40, -80, -40, 0] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function CircuitPattern() {
  const reduce = useReducedMotion();
  // Static traces + animated pulsing nodes overlaid
  const nodes = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        x: (i * 137) % 100,
        y: (i * 89) % 100,
        delay: (i % 8) * 0.4,
      })),
    []
  );
  return (
    <div aria-hidden className="absolute inset-0">
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="circuit"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 40 H80 M40 0 V80 M20 20 H40 V40 M60 40 V60 H80 M0 60 H20 V80"
              stroke="#f5c84c"
              strokeWidth="0.4"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
      {/* Pulsing nodes */}
      <div className="absolute inset-0">
        {nodes.map((n, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#f5c84c]"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            animate={reduce ? undefined : { opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: n.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () =>
      posts.filter((post) => {
        const q = search.toLowerCase();
        const matchesSearch =
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q);
        const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
        return matchesSearch && matchesTag;
      }),
    [search, activeTag]
  );

  return (
    <main className="relative bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden pt-24">
        <AmbientGlow />
        <CircuitPattern />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-semibold uppercase tracking-[0.4em] text-[#f5c84c]"
            >
              Blog
            </motion.p>
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 font-heading text-5xl leading-tight md:text-7xl"
            >
              Insights &{" "}
              <span className="bg-gradient-to-r from-[#f5c84c] via-amber-300 to-[#f5c84c] bg-clip-text text-transparent">
                Tutorials
              </span>
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-xl text-base text-gray-400 md:text-lg"
            >
              Field notes from the command center — architecture, performance, and
              the craft of building products that ship.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="relative border-y border-white/5 bg-black/40 py-8 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="h-11 w-full rounded-full border border-white/10 bg-white/[0.03] pl-11 pr-4 text-sm text-white placeholder:text-gray-500 transition-all focus:border-[#f5c84c]/60 focus:bg-white/[0.05] focus:shadow-[0_0_24px_-6px_rgba(245,200,76,0.5)] focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const active = activeTag === tag;
                return (
                  <motion.button
                    key={tag}
                    onClick={() => setActiveTag(active ? null : tag)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                      active
                        ? "border-[#f5c84c] bg-[#f5c84c] text-[#0a0a0a] shadow-[0_0_24px_-4px_rgba(245,200,76,0.75)]"
                        : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-[#f5c84c]/40 hover:text-white hover:shadow-[0_0_18px_-6px_rgba(245,200,76,0.45)]"
                    }`}
                  >
                    {tag}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section ref={gridRef} className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-gray-400">
                No articles found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveTag(null);
                }}
                className="mt-4 text-sm text-[#f5c84c] transition-colors hover:text-amber-300"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((post, i) => {
                  const cat = getCategoryStyle(post.category);
                  return (
                    <motion.article
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeOut" } }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.5,
                        delay: Math.min(i * 0.09, 0.5),
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ y: -6 }}
                      style={{ cursor: "default" }}
                      className="group relative select-none overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-[#f5c84c]/30 hover:shadow-[0_0_30px_rgba(245,200,76,0.25)]"
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          width={800}
                          height={500}
                          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.08]"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                        {/* Category badge */}
                        <div className="absolute left-4 top-4 flex items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-shadow duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${cat.bg} ${cat.text} ${cat.ring} ${cat.glow} group-hover:shadow-[0_0_28px_-2px_rgba(245,200,76,0.7)]`}
                          >
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-gray-300 ring-1 ring-white/10 backdrop-blur-md">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="relative p-6">
                        <h2 className="line-clamp-2 font-heading text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[#f5c84c]">
                          {post.title}
                        </h2>
                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-400 opacity-85 transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100">
                          {post.excerpt}
                        </p>
                        <div className="mt-6 flex items-center justify-between">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {post.tags.slice(0, 2).map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium text-gray-400"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <span className="text-[11px] text-gray-500">
                            {post.date}
                          </span>
                        </div>
                      </div>

                      {/* Hover glow border */}
                      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-500 group-hover:ring-[#f5c84c]/20" />
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative isolate overflow-hidden border-t border-white/5 py-24">
        <AmbientGlow />
        <div className="relative mx-auto max-w-2xl px-6 text-center lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-3xl text-white md:text-5xl"
          >
            Stay in the{" "}
            <span className="bg-gradient-to-r from-[#f5c84c] to-amber-300 bg-clip-text text-transparent">
              Loop
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-gray-400"
          >
            Get the latest articles, tutorials, and field notes — delivered
            straight to your inbox.
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="h-12 flex-1 rounded-full border border-white/10 bg-white/[0.03] px-5 text-sm text-white placeholder:text-gray-500 transition-all focus:border-[#f5c84c]/60 focus:shadow-[0_0_24px_-6px_rgba(245,200,76,0.5)] focus:outline-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f5c84c] to-amber-400 px-8 text-sm font-semibold text-black shadow-[0_0_24px_-4px_rgba(245,200,76,0.6)] transition-shadow hover:shadow-[0_0_36px_-4px_rgba(245,200,76,0.85)]"
            >
              Subscribe
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.form>
          <p className="mt-4 text-xs text-gray-500">
            No spam, unsubscribe anytime.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
