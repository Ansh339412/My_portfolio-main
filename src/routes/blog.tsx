import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Clock, Tag, ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { posts } from "@/lib/blog-posts";


export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Anshpreet Singh" },
      { name: "description", content: "Insights, tutorials, and thoughts on web development, design, and technology by Anshpreet Singh." },
      { property: "og:title", content: "Blog — Anshpreet Singh" },
      { property: "og:description", content: "Insights and tutorials on modern web development." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const allTags = ["React", "Next.js", "TypeScript", "Performance", "Architecture", "Career"];


function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[45vh] items-center bg-muted/30 pt-24">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-center mx-auto"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Blog</p>
            <h1 className="mt-4 text-5xl font-heading text-foreground md:text-6xl">
              Insights &{" "}<span className="text-gold">Tutorials</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Thoughts on development, design, and building products that matter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="border-b border-border py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="h-10 w-full rounded-full border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    activeTag === tag
                      ? "bg-foreground text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section ref={ref} className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
              <button
                onClick={() => { setSearch(""); setActiveTag(null); }}
                className="mt-4 text-sm text-gold hover:text-gold-light"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="block"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        width={800}
                        height={512}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-medium text-gold">{post.category}</span>
                        <span>&middot;</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="mt-3 text-xl font-heading text-card-foreground leading-snug group-hover:text-gold transition-colors">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {post.tags.slice(0, 2).map((t) => (
                            <span key={t} className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                              <Tag className="h-3 w-3" />
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}

            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-heading text-foreground md:text-4xl">Stay in the Loop</h2>
          <p className="mt-4 text-muted-foreground">
            Get the latest articles, tutorials, and insights delivered straight to your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 flex-1 rounded-full border border-border bg-card px-5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold hover:text-charcoal"
            >
              Subscribe
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">No spam, unsubscribe anytime.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
