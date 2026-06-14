import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
  {
    degree: "Bachelor of Technology (B.Tech)",
    school: "Lovely Professional University (LPU)",
    detail: "Currently Pursuing",
  },
  {
    degree: "Senior Secondary",
    school: "B.N.D Sen Secondary School, Kandhala Jattan",
    detail: "Percentage: 91.4%",
  },
  {
    degree: "Matriculation",
    school: "Cambridge International School, Dasuya",
    detail: "Percentage: 89.6%",
  },
];

const projects = [
  {
    title: "Personal Portfolio Website",
    description: "Designed and developed a modern responsive portfolio with advanced animations and interactive components.",
  },
  {
    title: "AI Productivity Solutions",
    description: "Leveraged AI tools for summarization, documentation, and workflow automation.",
  },
  {
    title: "Professional Presentation Design",
    description: "Created engaging presentations with advanced transitions and storytelling techniques.",
  },
  {
    title: "Digital Mapping & Documentation Projects",
    description: "Worked on structured mapping and documentation tasks requiring high attention to detail.",
  },
];

const strengths = ["Problem Solving", "Fast Learner", "Creativity", "Communication", "Teamwork", "Adaptability", "Attention to Detail"];

function ResumePage() {
  const handlePrint = () => window.print();

  return (
    <main className="min-h-screen bg-background">
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="mx-auto max-w-4xl px-6 pt-32 pb-24 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-gold">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </a>
          <button onClick={handlePrint} className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-charcoal shadow-sm transition-all hover:bg-gold-light focus:outline-none">
            <Printer className="h-4 w-4" />
            Print / Save PDF
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border bg-card p-8 md:p-12 shadow-sm print:border-none print:bg-transparent print:p-0 print:shadow-none"
        >
          {/* Header */}
          <div className="border-b border-border pb-8 text-center md:text-left print:border-neutral-200">
            <h1 className="text-4xl font-heading text-foreground print:text-black">Anshpreet Singh</h1>
            <p className="mt-2 text-lg font-medium text-gold print:text-neutral-700">
              Aspiring Full-Stack Developer | B.Tech Student | Software Developer
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-muted-foreground md:grid-cols-2 lg:grid-cols-3 print:text-neutral-600">
              <span className="flex items-center justify-center gap-2 md:justify-start">
                <Mail className="h-4 w-4 text-gold print:text-neutral-500 shrink-0" />
                anshpreetoneplus@gmail.com
              </span>
              <span className="flex items-center justify-center gap-2 md:justify-start">
                <Phone className="h-4 w-4 text-gold print:text-neutral-500 shrink-0" />
                +91 7657872974
              </span>
              <span className="flex items-center justify-center gap-2 md:justify-start">
                <MapPin className="h-4 w-4 text-gold print:text-neutral-500 shrink-0" />
                Hoshiarpur, Punjab, India
              </span>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground md:justify-start print:hidden">
              <a href="https://github.com/Ansh339412" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-gold">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/anshpreet-singh-57974b202/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-gold">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href="https://x.com/Anshpreetdev_09" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-gold">
                <Twitter className="h-4 w-4" /> Twitter
              </a>
            </div>

            <div className="hidden mt-2 text-xs text-neutral-500 print:flex print:flex-col print:gap-1">
              <span>GitHub: github.com/Ansh339412</span>
              <span>LinkedIn: linkedin.com/in/anshpreet-singh-57974b202/</span>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="mt-8">
            <h2 className="text-xl font-heading text-foreground print:text-black">Professional Summary</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground print:text-neutral-700">
              Motivated B.Tech student with a passion for web development, UI/UX design, and emerging technologies. Skilled in building responsive websites, creating interactive digital experiences, and exploring AI-powered solutions. Focused on combining creativity and technology to develop impactful products.
            </p>
          </section>

          {/* Two column layout */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Left: Skills + Strengths */}
            <div className="space-y-6 md:col-span-1">
              <div>
                <h3 className="text-base font-bold uppercase tracking-wider text-gold print:text-neutral-800 flex items-center gap-2">
                  <Code2 className="h-4 w-4 shrink-0" /> Technical Skills
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
                          <span key={s} className="rounded bg-muted px-2 py-0.5 text-xs text-foreground print:bg-transparent print:p-0 print:text-neutral-800 print:after:content-[',_'] print:last:after:content-none">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold uppercase tracking-wider text-gold print:text-neutral-800 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 shrink-0" /> Strengths
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {strengths.map((s) => (
                    <span key={s} className="rounded bg-muted px-2 py-0.5 text-xs text-foreground print:bg-transparent print:p-0 print:text-neutral-800 print:after:content-[' •_'] print:last:after:content-none">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Education + Projects + Objective */}
            <div className="space-y-8 md:col-span-2">
              <div>
                <h3 className="text-base font-bold uppercase tracking-wider text-gold print:text-neutral-800 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 shrink-0" /> Education
                </h3>
                <div className="mt-4 space-y-4">
                  {education.map((e) => (
                    <div key={e.degree}>
                      <h4 className="text-sm font-semibold text-foreground print:text-black">{e.degree}</h4>
                      <p className="text-xs text-muted-foreground print:text-neutral-600">{e.school}</p>
                      <p className="text-xs text-gold print:text-neutral-700 mt-0.5">{e.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold uppercase tracking-wider text-gold print:text-neutral-800 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 shrink-0" /> Projects
                </h3>
                <div className="mt-4 space-y-4">
                  {projects.map((p) => (
                    <div key={p.title}>
                      <h4 className="text-sm font-semibold text-foreground print:text-black">{p.title}</h4>
                      <p className="mt-1 text-xs text-muted-foreground print:text-neutral-600">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold uppercase tracking-wider text-gold print:text-neutral-800 flex items-center gap-2">
                  <Target className="h-4 w-4 shrink-0" /> Career Objective
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground print:text-neutral-700">
                  To leverage my technical knowledge, creativity, and problem-solving abilities to build impactful digital solutions while continuously expanding my expertise in software development and emerging technologies.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  );
}
