import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getPostBySlug, posts } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return { meta: [{ title: "Article — Anshpreet Singh" }] };
    }
    return {
      meta: [
        { title: `${post.title} — Anshpreet Singh` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: post.image },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
    };
  },
  notFoundComponent: () => (
    <main>
      <Navbar />
      <section className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">404</p>
          <h1 className="mt-4 text-4xl font-heading text-foreground">Article not found</h1>
          <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light">
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  ),
  errorComponent: ({ error, reset }) => (
    <main>
      <Navbar />
      <section className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-3xl font-heading text-foreground">Something went wrong</h1>
          <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
          <button onClick={reset} className="mt-6 text-sm text-gold hover:text-gold-light">Try again</button>
        </div>
      </section>
      <Footer />
    </main>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" /> Back to all articles
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full bg-gold/10 px-3 py-1 font-medium text-gold">{post.category}</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {post.readTime}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-heading leading-tight text-foreground md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-5xl px-6 lg:px-8"
        >
          <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
              width={1280}
              height={720}
            />
          </div>
        </motion.div>
      </section>

      {/* Body */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <article className="space-y-6 text-base leading-relaxed text-foreground/90 md:text-lg md:leading-[1.8]">
            {post.content.map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}

          </article>

          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Tags</span>
            {post.tags.map((t: string) => (
              <span
                key={t}
                className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
              >
                <Tag className="h-3 w-3" /> {t}
              </span>
            ))}

          </div>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-heading text-foreground md:text-3xl">Keep reading</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                to="/blog/$slug"
                params={{ slug: r.slug }}
                className="group overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-gold">{r.category}</span>
                  <h3 className="mt-2 text-base font-heading leading-snug text-card-foreground group-hover:text-gold">
                    {r.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
