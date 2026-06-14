import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  content: string[];
};

export const posts: BlogPost[] = [
  {
    id: 1,
    slug: "scalable-react-architecture",
    title: "Building Scalable React Applications with Modern Architecture",
    excerpt:
      "Explore patterns and best practices for structuring large React applications that scale gracefully with your team and product.",
    image: blog1,
    category: "Architecture",
    tags: ["React", "Architecture", "TypeScript"],
    date: "Mar 15, 2024",
    readTime: "8 min read",
    content: [
      "Scaling a React application isn't about adding more files — it's about creating clear boundaries between domains, predictable data flow, and components that stay easy to reason about as your team grows.",
      "Start by organizing code by feature, not by file type. A feature folder owns its UI, hooks, state, and API calls. This keeps related changes co-located and makes it trivial to delete a feature when it's no longer needed.",
      "Lean into TypeScript from day one. Strong types at module boundaries — server functions, store slices, route loaders — prevent the vast majority of regressions you'd otherwise catch only in production.",
      "Finally, treat performance as part of architecture. Use route-level code splitting, memoize expensive subtrees, and adopt a server-first data model with TanStack Query so your UI stays snappy even as the dataset grows.",
    ],
  },
  {
    id: 2,
    slug: "nextjs-14-app-router-guide",
    title: "The Complete Guide to Next.js 14 App Router",
    excerpt:
      "Deep dive into the App Router, Server Components, and how to leverage the latest features for better performance.",
    image: blog2,
    category: "Next.js",
    tags: ["Next.js", "React"],
    date: "Feb 28, 2024",
    readTime: "12 min read",
    content: [
      "The App Router is more than a new file convention — it's a different mental model. Pages compose from server components by default, and you opt into the client only where interactivity demands it.",
      "Server Components let you fetch data right next to the UI that consumes it. No more prop-drilling state down from a getServerSideProps callback at the top of the tree.",
      "Streaming with Suspense changes how slow data feels. Wrap a section in <Suspense>, render a skeleton, and the rest of the page ships immediately while the slow query resolves in the background.",
      "Pair the App Router with Server Actions for mutations and you get a full-stack story without ever writing a REST endpoint by hand.",
    ],
  },
  {
    id: 3,
    slug: "core-web-vitals-checklist",
    title: "Optimizing Core Web Vitals: A Developer's Checklist",
    excerpt:
      "Practical strategies to improve LCP, FID, and CLS scores with real-world examples and before/after metrics.",
    image: blog3,
    category: "Performance",
    tags: ["Performance", "React"],
    date: "Feb 10, 2024",
    readTime: "6 min read",
    content: [
      "Core Web Vitals reward sites that feel fast — not just sites that score well on synthetic tests. Focus on the user's real experience first, and the numbers usually follow.",
      "For LCP, identify the largest above-the-fold element and serve it eagerly. Preload the hero image, inline critical CSS, and avoid blocking the main thread with third-party scripts before paint.",
      "CLS is almost always caused by images and ads without reserved dimensions. Always set width and height (or aspect-ratio) so the browser can lay out the page before assets load.",
      "INP — the new responsiveness metric — punishes long tasks on interaction. Break up heavy handlers with requestIdleCallback, debounce expensive work, and move CPU-bound code into a worker.",
    ],
  },
  {
    id: 4,
    slug: "typescript-tips-every-developer",
    title: "TypeScript Tips Every Developer Should Know",
    excerpt:
      "Level up your TypeScript skills with advanced patterns, utility types, and techniques for cleaner, safer code.",
    image: blog1,
    category: "TypeScript",
    tags: ["TypeScript", "Career"],
    date: "Jan 22, 2024",
    readTime: "10 min read",
    content: [
      "TypeScript shines when you stop fighting it and let inference do the work. Annotate function arguments and return types at module boundaries; let everything inside infer naturally.",
      "Discriminated unions are the single most underrated pattern. Model your state as a union of shapes with a literal `kind` field and the compiler will refuse to let you read a property that doesn't exist in the current branch.",
      "Utility types like `Pick`, `Omit`, `Partial`, and `ReturnType` compose into surprisingly expressive shapes. Master them and most custom generics become unnecessary.",
      "Enable `strict`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes` on new projects. They're noisy at first, but they catch real bugs you'd otherwise discover at runtime.",
    ],
  },
  {
    id: 5,
    slug: "junior-to-senior-lessons",
    title: "From Junior to Senior: Lessons from 5 Years in Tech",
    excerpt:
      "Reflections on the skills, mindset, and habits that accelerated my growth from a junior to a senior developer.",
    image: blog3,
    category: "Career",
    tags: ["Career", "Architecture"],
    date: "Jan 5, 2024",
    readTime: "7 min read",
    content: [
      "The jump from junior to senior is less about knowing more frameworks and more about how you approach ambiguous problems. Seniors get comfortable with not knowing, then methodically reduce that uncertainty.",
      "Write things down. Design docs, decision records, even a paragraph in a PR description force you to clarify your own thinking and give teammates context without a meeting.",
      "Optimize for the team, not your output. The most valuable engineers I've worked with unblocked others, mentored juniors, and improved shared tooling — multiplying impact instead of just adding to it.",
      "Finally, treat your career like a product. Ship in public, build a portfolio of real work, and review your own growth every quarter against goals you set deliberately.",
    ],
  },
  {
    id: 6,
    slug: "micro-frontends-when-and-how",
    title: "Micro-frontends: When and How to Use Them",
    excerpt:
      "A practical guide to implementing micro-frontend architecture without over-engineering your application.",
    image: blog2,
    category: "Architecture",
    tags: ["Architecture", "React"],
    date: "Dec 18, 2023",
    readTime: "9 min read",
    content: [
      "Micro-frontends are an organizational pattern as much as a technical one. Reach for them when independent teams need to ship independently — not because a single app feels large.",
      "Module Federation is the most pragmatic implementation today. It lets each team build, version, and deploy their slice independently while sharing a runtime in the browser.",
      "Standardize the boundaries: a shared design system, a single auth contract, and one routing host that composes the remotes. Without those, you end up with a frankenstein UI.",
      "If you can ship the same product with a well-structured monorepo and clear module boundaries, do that instead. Micro-frontends carry real operational cost and shouldn't be the default.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
