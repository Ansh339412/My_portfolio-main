import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Github, Linkedin, Twitter, Printer, Briefcase, GraduationCap, Code2, Lightbulb, Target } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume / CV — Anshpreet Singh" },
      { name: "description", content: "Resume of Anshpreet Singh — Aspiring Full-Stack Developer, B.Tech Student, and Software Developer." },
      { property: "og:title", content: "Resume / CV — Anshpreet Singh" },
      { property: "og:description", content: "Resume of Anshpreet Singh — Aspiring Full-Stack Developer, B.Tech Student, and Software Developer." },
      { property: "og:url", content: "/resume" },
    ],
    links: [{ rel: "canonical", href: "/resume" }],
  }),
  component: ResumePage,
});

const skills = {
  frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "Bootstrap"],
  backend: ["Node.js", "Express.js", "REST APIs", "Authentication", "Server-Side Development"],
  database: ["MongoDB", "MySQL", "Firebase"],
  tools: ["Git", "GitHub", "VS Code", "Postman", "Figma", "Canva"],
  cloud: ["Vercel", "Render", "Railway"],
  uiux: ["Responsive Design", "Web Animations", "User Interface Design"],
};

const education = [
  { degree: "Bachelor of Technology (B.Tech)", school: "Lovely Professional University (LPU)", detail: "Currently Pursuing" },
  { degree: "Senior Secondary", school: "B.N.D Sen Secondary School, Kandhala Jattan", detail: "Percentage: 91.4%" },
  { degree: "Matriculation", school: "Cambridge International School, Dasuya", detail: "Percentage: 89.6%" },
];

const projects = [
  { title: "Personal Portfolio Website", description: "Designed and developed a modern responsive portfolio with advanced animations and interactive components." },
  { title: "AI Productivity Solutions", description: "Leveraged AI tools for summarization, documentation, and workflow automation." },
  { title: "Professional Presentation Design", description: "Created engaging presentations with advanced transitions and storytelling techniques." },
  { title: "Digital Mapping & Documentation Projects", description: "Worked on structured mapping and documentation tasks requiring high attention to detail." },
];

const strengths = ["Problem Solving", "Fast Learner", "Creativity", "Communication", "Teamwork", "Adaptability", "Attention to Detail"];

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

function AmbientGlow() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden print:hidden">
      <motion.div
        className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(245,200,76,0.14), transparent 70%)", filter: "blur(100px)" }}
        animate={{ x: [0, 80, 40, -20, 0], y: [0, 40, 90, 30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-24 h-[460px] w-[460px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(245,200,76,0.10), transparent 70%)", filter: "blur(110px)" }}
        animate={{ x: [0, -60, -20, 40, 0], y: [0, 60, -30, -50, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(245,200,76,0.09), transparent 70%)", filter: "blur(90px)" }}
        animate={{ x: [0, 40, -30, 20, 0], y: [0, -40, 30, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EXPO_OUT } },
};

function Section({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.section
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: EXPO_OUT, delay }}
    >
      {children}
    </motion.section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, boxShadow: "0 0 16px rgba(245,200,76,0.35)" }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="inline-block rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-xs text-foreground hover:border-gold/50 hover:text-gold print:border-none print:bg-transparent print:p-0 print:text-neutral-800 print:after:content-[',_'] print:last:after:content-none"
    >
      {children}
    </motion.span>
  );
}

function ResumePage() {
  const handlePrint = () => window.print();

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <AmbientGlow />

      <div className="print:hidden relative z-10">
        <Navbar />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-24 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <motion.div whileHover={{ x: -2 }} transition={{ duration: 0.2, ease: "easeOut" }}>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-gold">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>
          <motion.button
            onClick={handlePrint}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(245,200,76,0.35)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-charcoal shadow-sm focus:outline-none"
          >
            <Printer className="h-4 w-4" />
            Print / Save PDF
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EXPO_OUT }}
          className="relative rounded-2xl border border-white/10 bg-card/60 backdrop-blur-sm p-8 md:p-12 shadow-[0_0_80px_-20px_rgba(245,200,76,0.25)] print:border-none print:bg-transparent print:p-0 print:shadow-none print:backdrop-blur-none"
        >
          {/* Header */}
          <div className="pb-8 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EXPO_OUT }}
              className="text-4xl md:text-5xl font-heading text-foreground print:text-black"
            >
              Anshpreet Singh
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EXPO_OUT, delay: 0.09 }}
              className="mt-2 text-lg font-medium text-gold print:text-neutral-700"
            >
              Aspiring Full-Stack Developer | B.Tech Student | Software Developer
            </motion.p>

            <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-muted-foreground md:grid-cols-2 lg:grid-cols-3 print:text-neutral-600">
              {[
                { Icon: Mail, text: "anshpreetoneplus@gmail.com" },
                { Icon: Phone, text: "+91 7657872974" },
                { Icon: MapPin, text: "Hoshiarpur, Punjab, India" },
              ].map(({ Icon, text }, i) => (
                <motion.span
                  key={text}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EXPO_OUT, delay: 0.18 + i * 0.055 }}
                  className="flex items-center justify-center gap-2 md:justify-start group"
                >
                  <motion.span whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }} className="inline-flex">
                    <Icon className="h-4 w-4 text-gold print:text-neutral-500 shrink-0 transition-[filter] duration-200 group-hover:[filter:drop-shadow(0_0_6px_rgba(245,200,76,0.7))]" />
                  </motion.span>
                  {text}
                </motion.span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground md:justify-start print:hidden">
              {[
                { Icon: Github, href: "https://github.com/Ansh339412", label: "GitHub" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/anshpreet-singh-57974b202/", label: "LinkedIn" },
                { Icon: Twitter, href: "https://x.com/Anshpreetdev_09", label: "Twitter" },
              ].map(({ Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EXPO_OUT, delay: 0.36 + i * 0.055 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-1 hover:text-gold transition-colors duration-200 [&_svg]:hover:[filter:drop-shadow(0_0_6px_rgba(245,200,76,0.7))]"
                >
                  <Icon className="h-4 w-4 transition-[filter] duration-200" /> {label}
                </motion.a>
              ))}
            </div>

            <div className="hidden mt-2 text-xs text-neutral-500 print:flex print:flex-col print:gap-1">
              <span>GitHub: github.com/Ansh339412</span>
              <span>LinkedIn: linkedin.com/in/anshpreet-singh-57974b202/</span>
            </div>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: EXPO_OUT, delay: 0.55 }}
              style={{ transformOrigin: "left" }}
              className="mt-8 h-px w-full bg-gradient-to-r from-gold/60 via-gold/20 to-transparent print:bg-neutral-200 print:from-transparent print:via-transparent"
            />
          </div>

          {/* Professional Summary */}
          <Section className="mt-8">
            <h2 className="text-xl font-heading text-foreground print:text-black">Professional Summary</h2>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: EXPO_OUT, delay: 0.1 }}
              className="mt-3 text-sm leading-relaxed text-muted-foreground print:text-neutral-700"
            >
              Motivated B.Tech student with a passion for web development, UI/UX design, and emerging technologies. Skilled in building responsive websites, creating interactive digital experiences, and exploring AI-powered solutions. Focused on combining creativity and technology to develop impactful products.
            </motion.p>
          </Section>

          {/* Two column layout */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Left */}
            <div className="space-y-6 md:col-span-1">
              <Section>
                <h3 className="text-base font-bold uppercase tracking-wider text-gold print:text-neutral-800 flex items-center gap-2">
                  <Code2 className="h-4 w-4 shrink-0 [filter:drop-shadow(0_0_5px_rgba(245,200,76,0.6))] print:[filter:none]" /> Technical Skills
                </h3>
                <div className="mt-4 space-y-4">
                  {[
                    { label: "Frontend", items: skills.frontend },
                    { label: "Backend", items: skills.backend },
                    { label: "Database", items: skills.database },
                    { label: "Tools", items: skills.tools },
                    { label: "Cloud & Deployment", items: skills.cloud },
                    { label: "UI/UX", items: skills.uiux },
                  ].map((group) => (
                    <div key={group.label}>
                      <h4 className="text-xs font-semibold uppercase text-muted-foreground print:text-neutral-500">{group.label}</h4>
                      <div className="mt-2 flex flex-wrap gap-1.5 print:block">
                        {group.items.map((s) => (
                          <Chip key={s}>{s}</Chip>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section delay={0.08}>
                <h3 className="text-base font-bold uppercase tracking-wider text-gold print:text-neutral-800 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 shrink-0 [filter:drop-shadow(0_0_5px_rgba(245,200,76,0.6))] print:[filter:none]" /> Strengths
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {strengths.map((s) => (
                    <motion.span
                      key={s}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 16px rgba(245,200,76,0.35)" }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="inline-block rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-xs text-foreground hover:border-gold/50 hover:text-gold print:border-none print:bg-transparent print:p-0 print:text-neutral-800 print:after:content-[' •_'] print:last:after:content-none"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </Section>
            </div>

            {/* Right */}
            <div className="space-y-8 md:col-span-2">
              <Section>
                <h3 className="text-base font-bold uppercase tracking-wider text-gold print:text-neutral-800 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 shrink-0 [filter:drop-shadow(0_0_5px_rgba(245,200,76,0.6))] print:[filter:none]" /> Education
                </h3>
                <div className="mt-4 space-y-2">
                  {education.map((e) => (
                    <div
                      key={e.degree}
                      className="rounded-lg p-3 -mx-3 transition-colors duration-200 hover:bg-gold/[0.04] print:p-0 print:m-0 print:hover:bg-transparent"
                    >
                      <h4 className="text-sm font-semibold text-foreground print:text-black">{e.degree}</h4>
                      <p className="text-xs text-muted-foreground print:text-neutral-600">{e.school}</p>
                      <p className="text-xs text-gold print:text-neutral-700 mt-0.5">{e.detail}</p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section delay={0.08}>
                <h3 className="text-base font-bold uppercase tracking-wider text-gold print:text-neutral-800 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 shrink-0 [filter:drop-shadow(0_0_5px_rgba(245,200,76,0.6))] print:[filter:none]" /> Projects
                </h3>
                <div className="mt-4 space-y-4">
                  {projects.map((p) => (
                    <div key={p.title} className="group">
                      <h4 className="text-sm font-semibold text-foreground transition-colors duration-150 group-hover:text-gold print:text-black print:group-hover:text-black">
                        {p.title}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground transition-opacity duration-150 group-hover:opacity-90 print:text-neutral-600">
                        {p.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section delay={0.16}>
                <h3 className="text-base font-bold uppercase tracking-wider text-gold print:text-neutral-800 flex items-center gap-2">
                  <Target className="h-4 w-4 shrink-0 [filter:drop-shadow(0_0_5px_rgba(245,200,76,0.6))] print:[filter:none]" /> Career Objective
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground print:text-neutral-700">
                  To leverage my technical knowledge, creativity, and problem-solving abilities to build impactful digital solutions while continuously expanding my expertise in software development and emerging technologies.
                </p>
              </Section>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: EXPO_OUT }}
        className="print:hidden relative z-10"
      >
        <Footer />
      </motion.div>
    </main>
  );
}
