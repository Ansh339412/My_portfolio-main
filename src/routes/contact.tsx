import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle, ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Anshpreet Singh" },
      { name: "description", content: "Get in touch with Anshpreet Singh for project inquiries, collaborations, or just to say hello." },
      { property: "og:title", content: "Contact — Anshpreet Singh" },
      { property: "og:description", content: "Let's discuss your next project." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const contactInfo = [
  { icon: Mail, label: "Email", value: "anshpreetoneplus@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 7657872974" },
  { icon: MapPin, label: "Location", value: "Hoshiarpur Punjab India" },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Ansh339412" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/anshpreet-singh-57974b202/" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/Anshpreetdev_09" },
];

function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formState.name.trim()) errs.name = "Name is required";
    if (!formState.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errs.email = "Invalid email address";
    }
    if (!formState.subject.trim()) errs.subject = "Subject is required";
    if (!formState.message.trim() || formState.message.length < 10) errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

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
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Contact</p>
            <h1 className="mt-4 text-5xl font-heading text-foreground md:text-6xl">
              Let&apos;s Talk
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Have a project in mind? Want to collaborate? I&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={ref} className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-5 lg:gap-24">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl font-heading text-foreground">Get in Touch</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                I&apos;m currently available for freelance projects and full-time opportunities. Whether you have a question or just want to say hi, I&apos;ll do my best to get back to you within 24 hours.
              </p>

              <div className="mt-10 space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{info.label}</p>
                      <p className="mt-1 text-sm text-foreground">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Follow Me</p>
                <div className="mt-4 flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex h-full flex-col items-center justify-center rounded-2xl border border-gold/20 bg-gold/5 p-12 text-center"
                  >
                    <CheckCircle className="h-16 w-16 text-gold" />
                    <h3 className="mt-6 text-2xl font-heading text-foreground">Message Sent!</h3>
                    <p className="mt-3 text-muted-foreground">
                      Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="mt-8 text-sm font-medium text-gold hover:text-gold-light"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-border bg-card p-8 md:p-10"
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formState.name}
                          onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                          className={`mt-2 h-11 w-full rounded-lg border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none ${errors.name ? "border-destructive" : "border-border"}`}
                          placeholder="Your name"
                        />
                        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formState.email}
                          onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                          className={`mt-2 h-11 w-full rounded-lg border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none ${errors.email ? "border-destructive" : "border-border"}`}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={formState.subject}
                        onChange={(e) => setFormState((s) => ({ ...s, subject: e.target.value }))}
                        className={`mt-2 h-11 w-full rounded-lg border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none ${errors.subject ? "border-destructive" : "border-border"}`}
                        placeholder="Project inquiry"
                      />
                      {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
                    </div>

                    <div className="mt-6">
                      <label htmlFor="message" className="block text-sm font-medium text-foreground">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                        className={`mt-2 w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none ${errors.message ? "border-destructive" : "border-border"}`}
                        placeholder="Tell me about your project..."
                      />
                      {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="group mt-8 inline-flex items-center gap-2 rounded-md bg-foreground px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-gold hover:text-charcoal"
                    >
                      Send Message
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
