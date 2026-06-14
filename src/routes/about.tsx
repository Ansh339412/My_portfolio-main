import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

const timeline = [
  {
    year: "2020",
    title: "Started Coding Journey",
    description: "Began learning web development and fell in love with building things on the internet.",
  },
  {
    year: "2021",
    title: "Full Stack development",
    description: "Completed a basic to advanced Full stack course with whitehat jr.",
  },
  {
    year: "2022",
    title: "Started to explore the tech inovation",
    description: "Gained the curoisty to learn something by implementing the things.",
  },
  {
    year: "2023",
    title: "Improved Productivity",
    description: "Mastered full-stack archeitecture with the help of courses offered by Google and Microsoft",
  },
  {
    year: "2024",
    title: "",
    description: "Targeted some of the backend system knowing about the databases Sql and non Sql model",
  },
];

const values = [
  { icon: Target, title: "Precision", description: "Every line of code is intentional. No shortcuts, no compromises." },
  { icon: Heart, title: "Passion", description: "I genuinely love what I do. That energy translates into better products." },
  { icon: Lightbulb, title: "Innovation", description: "Always exploring new technologies and approaches to solve problems better." },
  { icon: Award, title: "Excellence", description: "Good enough is never enough. I strive for excellence in every detail." },
  { icon: Rocket, title: "Impact", description: "Building software that creates real value for real people." },
];

function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center bg-muted/30 pt-24">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">About Me</p>
            <h1 className="mt-4 text-5xl font-heading text-foreground md:text-7xl">
              Building the Future, One Line at a Time
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src={workspaceImg}
                alt="Modern developer workspace"
                className="rounded-2xl"
                loading="lazy"
                width={1200}
                height={800}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-heading text-foreground md:text-4xl">My Story</h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                I&apos;m Anshpreet Singh, a Full Stack Developer with a deep passion for creating elegant, high-performance web applications. My journey began with curiosity about how things work on the web, and has evolved into a career building products that matter.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Over the years, I&apos;ve worked with startups, agencies, and enterprise teams to deliver everything from MVPs to large-scale platforms. I believe great software is a blend of technical excellence, thoughtful design, and a deep understanding of user needs.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open source, or sharing knowledge with the developer community.
              </p>
              <Link
                to="/contact"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-light"
              >
                Let&apos;s work together
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-border bg-muted/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-10"
            >
              <h3 className="text-2xl font-heading text-card-foreground">Mission</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                To craft digital experiences that are not only visually stunning but also robust, accessible, and performant. Every project is an opportunity to push boundaries and deliver value.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-10"
            >
              <h3 className="text-2xl font-heading text-card-foreground">Vision</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                To be a trusted technology partner for businesses worldwide, known for delivering products that combine technical mastery with exceptional user experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Core Values</p>
            <h2 className="mt-4 text-4xl font-heading text-foreground md:text-5xl">What Drives Me</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-border bg-card p-8 transition-colors hover:border-gold/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-charcoal">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-heading text-card-foreground">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={ref} className="border-y border-border bg-muted/30 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Journey</p>
            <h2 className="mt-4 text-4xl font-heading text-foreground md:text-5xl">My Path</h2>
          </div>
          <div className="mt-16 space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-charcoal">
                    {item.year.slice(2)}
                  </div>
                  {i < timeline.length - 1 && <div className="mt-2 w-px flex-1 bg-border" />}
                </div>
                <div className="pb-8">
                  <span className="text-sm font-semibold text-gold">{item.year}</span>
                  <h3 className="mt-1 text-xl font-heading text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
